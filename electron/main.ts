import { app, BrowserWindow, dialog, ipcMain, shell, type IpcMainInvokeEvent } from "electron";
import { autoUpdater } from "electron-updater";
import { constants } from "node:fs";
import { access, appendFile, copyFile, mkdir, mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { gunzipSync, gzipSync } from "node:zlib";
import ExcelJS from "exceljs";
import MsgReader from "@kenjiuno/msgreader";
import PostalMime from "postal-mime";

// Keep per-user workspace storage stable across packaged upgrades and uninstall/reinstall.
app.setName("rota-po");
app.setAppUserModelId("com.rota.po");

const allowedExtensions = new Set([
  "pdf", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "csv", "txt", "md", "json", "msg", "eml"
]);
const maxAttachmentBytes = 25 * 1024 * 1024;
const maxBackupBytes = 1024 * 1024 * 1024;
const restoreStages = new Map<string, { directory: string; files: string[] }>();
const emailAttachmentPreviews = new Map<string, { files: { name: string; content: Buffer }[]; createdAt: number }>();
const maxOperationalLogBytes = 1024 * 1024;
const operationalLogReasons = new Set(["clean-exit", "abnormal-exit", "killed", "crashed", "oom", "launch-failed", "integrity-failure"]);
let operationalLogQueue: Promise<void> = Promise.resolve();

function logOperationalEvent(event: "app-started" | "window-ready" | "renderer-process-gone", reason?: string): void {
  const record = {
    timestamp: new Date().toISOString(),
    event,
    appVersion: app.getVersion(),
    ...(reason && operationalLogReasons.has(reason) ? { reason } : {})
  };
  const line = JSON.stringify(record) + "\n";
  const directory = path.join(app.getPath("userData"), "logs");
  const file = path.join(directory, "rota-operational.jsonl");
  operationalLogQueue = operationalLogQueue.then(async () => {
    await mkdir(directory, { recursive: true });
    const currentSize = await stat(file).then((details) => details.size).catch(() => 0);
    if (currentSize + Buffer.byteLength(line, "utf8") > maxOperationalLogBytes) {
      const previous = file + ".1";
      await rm(previous, { force: true });
      await rename(file, previous).catch(() => undefined);
    }
    await appendFile(file, line, { encoding: "utf8" });
  }).catch(() => undefined);
}

interface ImportedAttachment {
  storedName: string;
  name: string;
  size: number;
}

function attachmentDirectory(): string {
  return path.join(app.getPath("userData"), "attachments");
}

function assertTrustedSender(event: IpcMainInvokeEvent): void {
  const senderUrl = event.senderFrame?.url ?? "";
  if (!senderUrl.startsWith("file://")) {
    throw new Error("Güvenilmeyen uygulama kaynağı.");
  }
}

function safeStoredName(value: unknown): string {
  if (typeof value !== "string" || !/^[a-f0-9-]+\.[a-zA-Z0-9]{1,12}$/.test(value)) {
    throw new Error("Geçersiz ek dosya.");
  }
  return value;
}

async function importFilePaths(paths: unknown): Promise<ImportedAttachment[]> {
  if (!Array.isArray(paths) || paths.length > 20 || !paths.every((value) => typeof value === "string")) {
    throw new Error("Ek dosya listesi geçersiz.");
  }

  const directory = attachmentDirectory();
  await mkdir(directory, { recursive: true });
  const imported: ImportedAttachment[] = [];

  for (const sourcePath of paths as string[]) {
    if (!path.isAbsolute(sourcePath)) continue;
    const originalName = path.basename(sourcePath);
    const extension = path.extname(originalName).slice(1).replace(/[^a-zA-Z0-9]/g, "").slice(0, 12) || "file";
    if (!allowedExtensions.has(extension.toLowerCase())) continue;

    const sourceStat = await stat(sourcePath).catch(() => null);
    if (!sourceStat?.isFile() || sourceStat.size > maxAttachmentBytes) continue;

    const storedName = `${randomUUID()}.${extension}`;
    const destination = path.join(directory, storedName);
    await copyFile(sourcePath, destination, constants.COPYFILE_EXCL);
    imported.push({ storedName, name: originalName, size: sourceStat.size });
  }

  return imported;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function validateWorkspace(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) throw new Error("Yedekte çalışma alanı nesnesi bulunamadı.");
  for (const key of ["items", "tasks", "notes", "projects", "teams", "assets", "roadmap", "releases"]) {
    if (!Array.isArray(value[key])) throw new Error(`Yedek uyumsuz: ${key} listesi eksik veya bozuk.`);
    if ((value[key] as unknown[]).length > 100000) throw new Error("Yedek izin verilen kayıt sınırını aşıyor.");
  }
  if (!isRecord(value.profile)) throw new Error("Yedek uyumsuz: çalışma alanı profili eksik.");
  return value;
}

function collectStoredNames(workspace: unknown): Set<string> {
  const result = new Set<string>();
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) { value.forEach(visit); return; }
    if (!isRecord(value)) return;
    if (typeof value.storedName === "string") result.add(safeStoredName(value.storedName));
    Object.values(value).forEach(visit);
  };
  visit(workspace);
  return result;
}

function rewriteStoredNames(workspace: unknown, mapping: Map<string, string>): void {
  if (Array.isArray(workspace)) { workspace.forEach((value) => rewriteStoredNames(value, mapping)); return; }
  if (!isRecord(workspace)) return;
  if (typeof workspace.storedName === "string") workspace.storedName = mapping.get(workspace.storedName) || workspace.storedName;
  Object.values(workspace).forEach((value) => rewriteStoredNames(value, mapping));
}

async function cleanRestoreStages(): Promise<void> {
  const directory = path.join(app.getPath("userData"), "restore-staging");
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
}

ipcMain.handle("backup:export", async (event, rawWorkspace: unknown, rawFormat: unknown) => {
  assertTrustedSender(event);
  if (rawFormat !== "rota" && rawFormat !== "json") throw new Error("Yedek biçimi seçimi geçersiz.");
  const format = rawFormat;
  const workspace = validateWorkspace(rawWorkspace);
  const destination = await dialog.showSaveDialog({
    title: "Rota çalışma alanını yedekle",
    defaultPath: `Rota-yedek-${new Date().toISOString().slice(0, 10)}.${format}`,
    filters: [{ name: format === "rota" ? "Rota sıkıştırılmış yedek" : "JSON yedek", extensions: [format] }]
  });
  if (destination.canceled || !destination.filePath) return null;
  const files = [];
  let totalBytes = 0;
  for (const storedName of collectStoredNames(workspace)) {
    const filePath = path.join(attachmentDirectory(), storedName);
    const details = await stat(filePath).catch(() => null);
    if (!details?.isFile() || details.size > maxAttachmentBytes) throw new Error(`Yedeklenemeyen ek dosya: ${storedName}`);
    totalBytes += details.size;
    if (totalBytes > maxBackupBytes) throw new Error("Eklerin toplam boyutu 1 GB sınırını aşıyor.");
    const bytes = await readFile(filePath);
    files.push({ storedName, size: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex"), data: bytes.toString("base64") });
  }
  const payload = JSON.stringify({ format: "rota-workspace-backup", version: 1, createdAt: new Date().toISOString(), workspace, attachments: files });
  if (Buffer.byteLength(payload, "utf8") > maxBackupBytes) throw new Error("Yedek dosyası 1 GB sınırını aşıyor.");
  const bytes = format === "rota" ? Buffer.concat([Buffer.from("ROTA1\n"), gzipSync(Buffer.from(payload))]) : Buffer.from(payload, "utf8");
  const temporary = `${destination.filePath}.${randomUUID()}.tmp`;
  try { await writeFile(temporary, bytes, { flag: "wx" }); await rename(temporary, destination.filePath); }
  catch (error) { await rm(temporary, { force: true }); throw error; }
  return { path: destination.filePath, attachmentCount: files.length };
});

ipcMain.handle("backlog:export-excel", async (event, rawSheets: unknown) => {
  assertTrustedSender(event);
  if (!Array.isArray(rawSheets) || rawSheets.length < 1 || rawSheets.length > 12) throw new Error("Excel dışa aktarım sayfaları geçersiz.");
  const sheets = rawSheets.map((rawSheet, index) => {
    if (!isRecord(rawSheet) || typeof rawSheet.name !== "string" || !Array.isArray(rawSheet.columns) || !rawSheet.columns.length || rawSheet.columns.length > 60 || !Array.isArray(rawSheet.rows)) {
      throw new Error(`Excel sayfa ${index + 1} yapısı geçersiz.`);
    }
    if (rawSheet.rows.length > 1000000) throw new Error("Excel dışa aktarımı bir sayfada izin verilen satır sınırını aşıyor.");
    const columns = rawSheet.columns.map((column) => {
      if (typeof column !== "string" || !column.trim() || column.length > 120) throw new Error("Excel kolon başlığı geçersiz.");
      return column;
    });
    const rows = rawSheet.rows.map((rawRow) => {
      if (!Array.isArray(rawRow) || rawRow.length !== columns.length) throw new Error("Excel satırındaki alan sayısı kolonlarla eşleşmiyor.");
      return rawRow.map((value) => {
        if (value === null || value === undefined) return null;
        if (typeof value === "string") {
          if (value.length > 32767) throw new Error("Excel hücre metni 32.767 karakter sınırını aşıyor.");
          return value;
        }
        if (typeof value === "number" && Number.isFinite(value)) return value;
        throw new Error("Excel hücresinde desteklenmeyen veri var.");
      });
    });
    const safeName = rawSheet.name.replace(/[\\/*?:\[\]]/g, " ").trim().slice(0, 31) || `Sayfa ${index + 1}`;
    return { name: safeName, columns, rows };
  });
  const destination = await dialog.showSaveDialog({
    title: "Backlog'u Excel olarak dışa aktar",
    defaultPath: `Rota-backlog-${new Date().toISOString().slice(0, 10)}.xlsx`,
    filters: [{ name: "Excel çalışma kitabı", extensions: ["xlsx"] }]
  });
  if (destination.canceled || !destination.filePath) return null;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Rota · PO çalışma alanı";
  workbook.created = new Date();
  workbook.modified = new Date();
  for (const sheet of sheets) {
    const worksheet = workbook.addWorksheet(sheet.name);
    worksheet.addRow(sheet.columns);
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF28365B" } };
    worksheet.views = [{ state: "frozen", ySplit: 1 }];
    worksheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: sheet.columns.length } };
    worksheet.columns = sheet.columns.map((header) => ({ header, width: Math.min(42, Math.max(14, header.length + 3)) }));
    for (const values of sheet.rows) worksheet.addRow(values);
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) row.alignment = { vertical: "top", wrapText: true };
    });
  }
  const bytes = Buffer.from(await workbook.xlsx.writeBuffer());
  const temporary = `${destination.filePath}.${randomUUID()}.tmp`;
  try { await writeFile(temporary, bytes, { flag: "wx" }); await rename(temporary, destination.filePath); }
  catch (error) { await rm(temporary, { force: true }); throw error; }
  return destination.filePath;
});

ipcMain.handle("backup:stage-restore", async (event) => {
  assertTrustedSender(event);
  const selection = await dialog.showOpenDialog({ title: "Rota yedeğini geri yükle", properties: ["openFile"], filters: [{ name: "Rota yedeği", extensions: ["rota", "json"] }] });
  if (selection.canceled || !selection.filePaths[0]) return null;
  const backupPath = selection.filePaths[0];
  const details = await stat(backupPath).catch(() => null);
  if (!details) throw new Error("Seçilen yedek dosyasına erişilemiyor.");
  if (!details.isFile() || details.size > maxBackupBytes) throw new Error("Yedek dosyası geçersiz veya 1 GB sınırını aşıyor.");
  let payload: unknown;
  try {
    const bytes = await readFile(backupPath);
    const magic = Buffer.from("ROTA1\n");
    const jsonBytes = bytes.subarray(0, magic.length).equals(magic) ? gunzipSync(bytes.subarray(magic.length), { maxOutputLength: maxBackupBytes }) : bytes;
    payload = JSON.parse(jsonBytes.toString("utf8")) as unknown;
  }
  catch { throw new Error("Yedek dosyası okunamadı. Dosya bozuk veya JSON değil."); }
  if (!isRecord(payload) || payload.format !== "rota-workspace-backup" || payload.version !== 1) throw new Error("Bu dosya desteklenen Rota yedeği değil.");
  const workspace = validateWorkspace(payload.workspace);
  if (!Array.isArray(payload.attachments) || payload.attachments.length > 20000) throw new Error("Yedekte ek listesi eksik veya çok büyük.");
  const entries = new Map<string, { bytes: Buffer; extension: string }>();
  let totalBytes = 0;
  for (const raw of payload.attachments) {
    if (!isRecord(raw)) throw new Error("Yedekte bozuk ek kaydı var.");
    const storedName = safeStoredName(raw.storedName);
    const extension = path.extname(storedName).slice(1);
    if (entries.has(storedName) || typeof raw.data !== "string" || !/^[a-f0-9]{64}$/.test(String(raw.sha256))) throw new Error("Yedekte yinelenen veya geçersiz ek kaydı var.");
    const bytes = Buffer.from(raw.data, "base64");
    if (bytes.length !== raw.size || bytes.length > maxAttachmentBytes || createHash("sha256").update(bytes).digest("hex") !== raw.sha256) throw new Error(`Yedek eki doğrulanamadı: ${storedName}`);
    totalBytes += bytes.length;
    if (totalBytes > maxBackupBytes) throw new Error("Eklerin toplam boyutu 1 GB sınırını aşıyor.");
    entries.set(storedName, { bytes, extension });
  }
  const referenced = collectStoredNames(workspace);
  for (const storedName of referenced) if (!entries.has(storedName)) throw new Error(`Yedekte başvurulan ek bulunamadı: ${storedName}`);
  const mapping = new Map<string, string>();
  for (const [storedName, entry] of entries) mapping.set(storedName, `${randomUUID()}.${entry.extension}`);
  const token = randomUUID();
  const stageRoot = path.join(app.getPath("userData"), "restore-staging");
  await mkdir(stageRoot, { recursive: true });
  const directory = await mkdtemp(path.join(stageRoot, `${token}-`));
  try {
    const files: string[] = [];
    for (const [storedName, entry] of entries) {
      const stagedName = mapping.get(storedName)!;
      await writeFile(path.join(directory, stagedName), entry.bytes, { flag: "wx" });
      files.push(stagedName);
    }
    rewriteStoredNames(workspace, mapping);
    restoreStages.set(token, { directory, files });
  } catch (error) { await rm(directory, { recursive: true, force: true }); throw error; }
  return { token, workspace, attachmentCount: entries.size };
});

ipcMain.handle("backup:commit-restore", async (event, rawToken: unknown) => {
  assertTrustedSender(event);
  if (typeof rawToken !== "string") throw new Error("Geri yükleme oturumu geçersiz.");
  const stage = restoreStages.get(rawToken);
  if (!stage) throw new Error("Geri yükleme oturumunun süresi dolmuş. Tekrar deneyin.");
  const destination = attachmentDirectory();
  await mkdir(destination, { recursive: true });
  const copied: string[] = [];
  try {
    for (const file of stage.files) { await copyFile(path.join(stage.directory, file), path.join(destination, file), constants.COPYFILE_EXCL); copied.push(file); }
    await rm(stage.directory, { recursive: true, force: true });
    restoreStages.delete(rawToken);
  } catch (error) {
    await Promise.all(copied.map((file) => rm(path.join(destination, file), { force: true })));
    throw error;
  }
});

ipcMain.handle("backup:cancel-restore", async (event, rawToken: unknown) => {
  assertTrustedSender(event);
  if (typeof rawToken !== "string") return;
  const stage = restoreStages.get(rawToken);
  if (!stage) return;
  await rm(stage.directory, { recursive: true, force: true });
  restoreStages.delete(rawToken);
});

async function createWindow(): Promise<void> {
  const win = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 1060,
    minHeight: 700,
    backgroundColor: "#f5f6f5",
    title: "Rota · PO çalışma alanı",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  await win.loadFile(path.resolve(__dirname, "../../index.html"));
  logOperationalEvent("window-ready");
  win.webContents.on("render-process-gone", (_event, details) => logOperationalEvent("renderer-process-gone", details.reason));
}

function configureAutoUpdates(): void {
  // Update metadata and the trusted Windows publisher are embedded at package time.
  // Dev runs and unsigned evaluation packages intentionally never contact an update feed.
  if (!app.isPackaged) return;

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.allowDowngrade = false;

  autoUpdater.on("error", () => {
    // Keep update transport details out of operational logs and workspace data.
  });
  autoUpdater.on("update-available", (info) => {
    void dialog.showMessageBox({
      type: "info",
      title: "Rota güncellemesi",
      message: `Rota ${info.version} sürümü hazır. Güncellemeyi şimdi indir?`,
      buttons: ["İndir", "Daha sonra"],
      defaultId: 0,
      cancelId: 1
    }).then(({ response }) => {
      if (response === 0) void autoUpdater.downloadUpdate().catch(() => undefined);
    });
  });
  autoUpdater.on("update-downloaded", (info) => {
    void dialog.showMessageBox({
      type: "info",
      title: "Rota güncellemesi hazır",
      message: `Rota ${info.version} güncellemesi indirildi. Yüklemek için uygulamayı yeniden başlat.`,
      buttons: ["Şimdi yeniden başlat", "Daha sonra"],
      defaultId: 0,
      cancelId: 1
    }).then(({ response }) => {
      if (response === 0) autoUpdater.quitAndInstall();
    });
  });

  void autoUpdater.checkForUpdates().catch(() => undefined);
}

ipcMain.handle("attachments:pick", async (event) => {
  assertTrustedSender(event);
  const result = await dialog.showOpenDialog({
    title: "Dosya ekle",
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "Belgeler ve görseller", extensions: [...allowedExtensions] }]
  });
  if (result.canceled || result.filePaths.length === 0) return [];
  return importFilePaths(result.filePaths);
});

ipcMain.handle("attachments:import-dropped", async (event, paths: unknown) => {
  assertTrustedSender(event);
  return importFilePaths(paths);
});

ipcMain.handle("email:parse-dropped", async (event, rawPaths: unknown) => {
  assertTrustedSender(event);
  if (!Array.isArray(rawPaths) || rawPaths.length !== 1 || typeof rawPaths[0] !== "string" || !path.isAbsolute(rawPaths[0])) {
    throw new Error("Bir seferde tek bir .msg veya .eml e-postası bırakabilirsin. Outlook öğesi dosya olarak aktarılmadıysa önce .msg olarak kaydet.");
  }
  const emailPath = rawPaths[0];
  const originalName = path.basename(emailPath);
  const extension = path.extname(originalName).toLowerCase();
  if (extension !== ".msg" && extension !== ".eml") throw new Error("E-postadan kayıt oluşturmak için .msg veya .eml dosyası kullan.");
  const details = await stat(emailPath).catch(() => null);
  if (!details?.isFile()) throw new Error("E-posta dosyasına erişilemiyor.");
  if (details.size > maxAttachmentBytes) throw new Error("E-posta dosyası 25 MB sınırını aşıyor.");
  const bytes = await readFile(emailPath);
  let parsed: { subject?: string; from?: unknown; to?: unknown; date?: string; body?: string };
  let emailAttachmentData: { name: string; content: Buffer }[] = [];
  try {
    if (extension === ".msg") {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const msgReader = new MsgReader(view);
      const data = msgReader.getFileData();
      if (data.error) throw new Error(data.error);
      emailAttachmentData = (data.attachments || []).slice(0, 20).flatMap((attachment) => {
        const value = msgReader.getAttachment(attachment);
        const name = path.basename(value.fileName || attachment.fileName || "").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 180);
        const content = Buffer.from(value.content || []);
        return name && content.length <= maxAttachmentBytes ? [{ name, content }] : [];
      });
      const from = data.senderName && data.senderEmail ? `${data.senderName} <${data.senderEmail}>` : data.senderName || data.senderEmail || "";
      parsed = {
        subject: data.subject,
        from,
        to: (data.recipients || []).filter((entry) => entry.recipType === "to").map((entry) => entry.smtpAddress || entry.email || entry.name || "").filter(Boolean).join(", "),
        date: data.messageDeliveryTime || data.clientSubmitTime,
        body: data.body
      };
    } else {
      const email = await PostalMime.parse(bytes, { attachmentEncoding: "arraybuffer" });
      emailAttachmentData = (email.attachments || []).filter((attachment) => attachment.filename && !attachment.related).slice(0, 20).flatMap((attachment) => {
        const name = path.basename(attachment.filename || "").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").slice(0, 180);
        const rawContent = attachment.content;
        const content = typeof rawContent === "string"
          ? Buffer.from(rawContent, attachment.encoding === "base64" ? "base64" : "utf8")
          : rawContent instanceof ArrayBuffer
            ? Buffer.from(new Uint8Array(rawContent))
            : Buffer.from(rawContent);
        return name && content.length <= maxAttachmentBytes ? [{ name, content }] : [];
      });
      parsed = { subject: email.subject, from: email.from, to: email.to, date: email.date, body: email.text };
    }
  } catch {
    throw new Error("E-posta okunamadı. Dosya bozuk veya desteklenmeyen bir ileti biçiminde.");
  }
  const imported = await importFilePaths([emailPath]);
  if (!imported[0]) throw new Error("Özgün e-posta Rota eklerine kaydedilemedi.");
  for (const [token, preview] of emailAttachmentPreviews) if (Date.now() - preview.createdAt > 10 * 60 * 1000) emailAttachmentPreviews.delete(token);
  const attachmentToken = randomUUID();
  emailAttachmentPreviews.set(attachmentToken, { files: emailAttachmentData, createdAt: Date.now() });
  const addressText = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (!Array.isArray(value)) return "";
    return value.map((entry) => {
      if (!isRecord(entry)) return "";
      const mailbox = typeof entry.name === "string" && entry.name ? entry.name : "";
      const address = typeof entry.address === "string" ? entry.address : "";
      return mailbox && address ? `${mailbox} <${address}>` : mailbox || address;
    }).filter(Boolean).join(", ");
  };
  return {
    subject: (parsed.subject || path.basename(originalName, extension)).slice(0, 120),
    from: addressText(parsed.from).slice(0, 1000),
    to: addressText(parsed.to).slice(0, 1000),
    date: typeof parsed.date === "string" ? parsed.date.slice(0, 100) : "",
    body: typeof parsed.body === "string" ? parsed.body.slice(0, 12000) : "",
    originalEmail: imported[0],
    attachmentToken,
    attachments: emailAttachmentData.map((attachment, index) => ({ id: String(index), name: attachment.name, size: attachment.content.byteLength }))
  };
});

ipcMain.handle("email:import-selected-attachments", async (event, rawToken: unknown, rawIds: unknown) => {
  assertTrustedSender(event);
  if (typeof rawToken !== "string" || !Array.isArray(rawIds) || rawIds.length > 20 || !rawIds.every((id) => typeof id === "string" && /^\d{1,2}$/.test(id))) throw new Error("E-posta eki seçimi geçersiz.");
  const preview = emailAttachmentPreviews.get(rawToken);
  if (!preview || Date.now() - preview.createdAt > 10 * 60 * 1000) { emailAttachmentPreviews.delete(rawToken); throw new Error("E-posta eki önizlemesinin süresi doldu. E-postayı yeniden bırak."); }
  const selected = [...new Set(rawIds as string[])].map((id) => preview.files[Number(id)]).filter((file): file is { name: string; content: Buffer } => Boolean(file));
  if (selected.reduce((sum, file) => sum + file.content.byteLength, 0) > maxAttachmentBytes) throw new Error("Seçilen e-posta eklerinin toplamı 25 MB sınırını aşıyor.");
  const tempDir = await mkdtemp(path.join(app.getPath("temp"), "rota-email-"));
  try {
    const paths: string[] = [];
    for (const [index, file] of selected.entries()) {
      const safeName = path.basename(file.name).replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_");
      const filePath = path.join(tempDir, String(index).padStart(2, "0") + "-" + safeName);
      await writeFile(filePath, file.content, { flag: "wx" }); paths.push(filePath);
    }
    return await importFilePaths(paths);
  } finally { await rm(tempDir, { recursive: true, force: true }); emailAttachmentPreviews.delete(rawToken); }
});

ipcMain.handle("attachments:open", async (event, value: unknown) => {
  assertTrustedSender(event);
  const storedName = safeStoredName(value);
  const fullPath = path.join(attachmentDirectory(), storedName);
  try {
    await access(fullPath);
  } catch {
    return "Dosya bulunamadı.";
  }
  return shell.openPath(fullPath);
});

ipcMain.handle("attachments:preview", async (event, value: unknown) => {
  assertTrustedSender(event);
  const storedName = safeStoredName(value);
  const extension = path.extname(storedName).toLowerCase();
  const mimeTypes: Record<string, string> = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".pdf": "application/pdf" };
  const mimeType = mimeTypes[extension];
  if (!mimeType) return null;
  const fullPath = path.join(attachmentDirectory(), storedName);
  const details = await stat(fullPath).catch(() => null);
  if (!details?.isFile() || details.size > 12 * 1024 * 1024) return null;
  const bytes = await readFile(fullPath);
  return { mimeType, dataUrl: "data:" + mimeType + ";base64," + bytes.toString("base64") };
});

ipcMain.handle("attachments:remove", async (event, value: unknown) => {
  assertTrustedSender(event);
  const storedName = safeStoredName(value);
  await rm(path.join(attachmentDirectory(), storedName), { force: true });
  return true;
});

void app.whenReady().then(async () => {
  logOperationalEvent("app-started");
  await cleanRestoreStages();
  await createWindow();
  configureAutoUpdates();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) void createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
