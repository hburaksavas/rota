import { Application } from "@webviewjs/webview";
import MsgReader from "@kenjiuno/msgreader";
import ExcelJS from "exceljs";
import { Entry } from "@napi-rs/keyring";
import koffi from "koffi";
import { simpleParser } from "mailparser";
import { randomUUID, createHash, timingSafeEqual } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createServer } from "node:http";
import { mkdir, readFile, writeFile, rm, stat, rename } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import { homedir } from "node:os";
import { gzipSync, gunzipSync, inflateSync } from "node:zlib";

const execFileAsync = promisify(execFile);
if (process.platform === "win32") {
  const shell32 = koffi.load("shell32.dll");
  const setAppUserModelId = shell32.func("__stdcall", "SetCurrentProcessExplicitAppUserModelID", "int", ["str16"]);
  const appIdResult = setAppUserModelId("HburakSavas.Rota");
  if (appIdResult !== 0) throw new Error(`Rota Windows uygulama kimliği atanamadı (HRESULT 0x${(appIdResult >>> 0).toString(16)}).`);
}
const app = new Application();
const dataRoot = resolve(process.env.ROTA_USER_DATA_DIR || join(process.env.APPDATA || homedir(), "rota-po"));
const profilePath = process.env.ROTA_WEBVIEW2_USER_DATA || join(dataRoot, "webview2");
const attachmentRoot = join(dataRoot, "attachments");
const root = resolve(process.cwd());
const allowedExtensions = new Set("pdf png jpg jpeg gif webp doc docx xls xlsx ppt pptx csv txt md json msg eml".split(" "));
const mailAttachmentSessions = new Map();
const restoreSessions = new Map();
const keyring = new Entry("Rota Jira", "Personal Access Token");
await mkdir(attachmentRoot, { recursive: true });
await mkdir(profilePath, { recursive: true });

const safeName = (name) => basename(String(name || "dosya")).replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").slice(0, 180) || "dosya";
const checkedStoredPath = (name) => {
  if (!/^[a-f0-9-]+\.[a-zA-Z0-9]{1,12}$/.test(String(name))) throw new Error("Geçersiz ek dosyası.");
  return join(attachmentRoot, name);
};
const mimeTypes = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2" };
const decodePngRgba = (png) => {
  let width = 0; let height = 0; let bitDepth = 0; let colorType = 0; const chunks = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset); const type = png.toString("ascii", offset + 4, offset + 8); const data = png.subarray(offset + 8, offset + 8 + length); offset += length + 12;
    if (type === "IHDR") { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; }
    else if (type === "IDAT") chunks.push(data);
    else if (type === "IEND") break;
  }
  if (!width || !height || bitDepth !== 8 || colorType !== 6) throw new Error("Rota ikonu desteklenen PNG biçiminde değil.");
  const stride = width * 4; const raw = inflateSync(Buffer.concat(chunks)); const pixels = Buffer.alloc(stride * height); let input = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[input++]; const row = y * stride;
    for (let x = 0; x < stride; x++) {
      const value = raw[input++]; const left = x >= 4 ? pixels[row + x - 4] : 0; const above = y > 0 ? pixels[row + x - stride] : 0; const upperLeft = y > 0 && x >= 4 ? pixels[row + x - stride - 4] : 0;
      if (filter === 0) pixels[row + x] = value;
      else if (filter === 1) pixels[row + x] = (value + left) & 255;
      else if (filter === 2) pixels[row + x] = (value + above) & 255;
      else if (filter === 3) pixels[row + x] = (value + Math.floor((left + above) / 2)) & 255;
      else if (filter === 4) { const p = left + above - upperLeft; const pa = Math.abs(p - left); const pb = Math.abs(p - above); const pc = Math.abs(p - upperLeft); pixels[row + x] = (value + (pa <= pb && pa <= pc ? left : pb <= pc ? above : upperLeft)) & 255; }
      else throw new Error("Rota ikonu bozuk bir PNG filtresi içeriyor.");
    }
  }
  return { pixels, width, height };
};
const loadWindowIcon = async () => {
  const ico = await readFile(join(root, "assets/rota.ico")); const count = ico.readUInt16LE(4); let selected = null;
  for (let index = 0; index < count; index++) {
    const entry = 6 + index * 16; const width = ico[entry] || 256; const height = ico[entry + 1] || 256; const size = ico.readUInt32LE(entry + 8); const offset = ico.readUInt32LE(entry + 12);
    if (width === 64 && height === 64) { selected = ico.subarray(offset, offset + size); break; }
  }
  if (!selected) throw new Error("Rota uygulama ikonu bulunamadı.");
  return decodePngRgba(selected);
};
const saveAttachment = async (name, bytes) => {
  const clean = safeName(name);
  const ext = extname(clean).slice(1).toLowerCase();
  if (!allowedExtensions.has(ext)) throw new Error("Bu dosya türü ek olarak desteklenmiyor.");
  if (bytes.byteLength > 25 * 1024 * 1024) throw new Error("Dosya 25 MB sınırını aşıyor.");
  const storedName = `${randomUUID()}.${ext}`;
  await writeFile(checkedStoredPath(storedName), bytes, { flag: "wx" });
  return { storedName, name: clean, size: bytes.byteLength };
};
const importPaths = async (paths) => {
  const result = [];
  for (const source of paths.slice(0, 20)) {
    const info = await stat(source).catch(() => null);
    if (!info?.isFile() || info.size > 25 * 1024 * 1024) continue;
    const name = safeName(source);
    if (!allowedExtensions.has(extname(name).slice(1).toLowerCase())) continue;
    result.push(await saveAttachment(name, await readFile(source)));
  }
  return result;
};
const decodeIncoming = (files) => {
  if (!Array.isArray(files) || files.length < 1 || files.length > 20) throw new Error("Ek dosya listesi geçersiz.");
  const result = files.map(({ name, data }) => ({ name: safeName(name), bytes: Buffer.from(data, "base64") }));
  if (result.some((entry) => entry.bytes.length > 25 * 1024 * 1024) || result.reduce((n, entry) => n + entry.bytes.length, 0) > 25 * 1024 * 1024) throw new Error("E-posta veya ekleri 25 MB sınırını aşıyor.");
  return result;
};
const withBytes = async (paths, callback) => {
  if (!Array.isArray(paths) || paths.length !== 1) throw new Error("Bir seferde tek bir .msg veya .eml e-postası bırak.");
  const path = paths[0];
  const name = safeName(path);
  if (!/\.(msg|eml)$/i.test(name)) throw new Error("E-postadan kayıt oluşturmak için .msg veya .eml dosyası kullan.");
  const info = await stat(path);
  if (info.size > 25 * 1024 * 1024) throw new Error("E-posta 25 MB sınırını aşıyor.");
  return callback(name, await readFile(path));
};
const savePathDialog = async ({ title, defaultPath, filters }) => {
  const psQuote = (value) => `'${String(value).replace(/'/g, "''")}'`;
  const filter = filters.map((item) => `${item.name}|${item.extensions.map((extension) => `*.${extension}`).join(";")}`).join("|");
  const command = `Add-Type -AssemblyName System.Windows.Forms; $d=New-Object System.Windows.Forms.SaveFileDialog; $d.Title=${psQuote(title)}; $d.FileName=${psQuote(defaultPath)}; $d.Filter=${psQuote(filter)}; if($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK){[Console]::Write($d.FileName)}`;
  const { stdout } = await execFileAsync("powershell.exe", ["-NoProfile", "-STA", "-Command", command], { windowsHide: true, maxBuffer: 1024 * 1024 });
  return stdout.trim() || null;
};
const parseEmail = async (name, bytes) => {
  let subject = "", from = "", to = "", date = "", body = "", attachments = [];
  try {
    if (/\.msg$/i.test(name)) {
      const msg = new MsgReader(bytes);
      const info = msg.getFileData();
      subject = info.subject || name.replace(/\.msg$/i, ""); from = info.senderName || "";
      to = (info.recipients || []).map((item) => item.name).filter(Boolean).join(", ");
      date = info.messageDeliveryTime || info.clientSubmitTime || ""; body = info.body || info.bodyHtml || "";
      attachments = (info.attachments || []).filter((entry) => !entry.isInline).slice(0, 20).map((entry) => {
        const value = msg.getAttachment(entry); return { name: safeName(value.fileName || entry.fileName || "ek"), bytes: Buffer.from(value.content || []) };
      }).filter((entry) => entry.bytes.length > 0 && entry.bytes.length <= 25 * 1024 * 1024);
    } else {
      const parsed = await simpleParser(bytes);
      subject = parsed.subject || name.replace(/\.eml$/i, ""); from = parsed.from?.text || ""; to = parsed.to?.text || "";
      date = parsed.date?.toISOString() || ""; body = parsed.text || "";
      attachments = parsed.attachments.slice(0, 20).filter((entry) => entry.filename).map((entry) => ({ name: safeName(entry.filename), bytes: entry.content })).filter((entry) => entry.bytes.length <= 25 * 1024 * 1024);
    }
  } catch { throw new Error("E-posta okunamadı. Dosya bozuk veya desteklenmeyen bir ileti biçiminde."); }
  const originalEmail = await saveAttachment(name, bytes);
  const attachmentToken = randomUUID();
  mailAttachmentSessions.set(attachmentToken, attachments);
  while (mailAttachmentSessions.size > 20) mailAttachmentSessions.delete(mailAttachmentSessions.keys().next().value);
  return { subject: subject.slice(0, 120), from: from.slice(0, 1000), to: to.slice(0, 1000), date: String(date).slice(0, 100), body: body.slice(0, 12000), originalEmail, attachmentToken, attachments: attachments.map((item, id) => ({ id: String(id), name: item.name, size: item.bytes.length })) };
};
const validateJira = (base) => {
  let url; try { url = new URL(base); } catch { throw new Error("Jira Base URL geçersiz."); }
  if (!/^https?:$/.test(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error("Jira Base URL http(s) adresi olmalı.");
  return url;
};
const jiraRequest = async (base, route, method = "GET", body) => {
  const url = validateJira(base); const token = keyring.getPassword();
  const target = new URL(`${url.pathname.replace(/\/$/, "")}${route}`, url.origin);
  if (target.origin !== url.origin || !target.pathname.startsWith(`${url.pathname.replace(/\/$/, "")}/rest/`)) throw new Error("Jira isteği adres doğrulamasından geçemedi.");
  let response; try { response = await fetch(target, { method, headers: { Accept: "application/json", Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000), redirect: "error" }); }
  catch { throw new Error("Jira’ya ulaşılamadı. Base URL, VPN/ağ erişimi ve TLS sertifikasını kontrol edin."); }
  if (response.status === 401 || response.status === 403) throw new Error("Jira PAT geçersiz olabilir veya bu hesapta gerekli izin yok.");
  if (!response.ok) throw new Error(`Jira isteği başarısız: HTTP ${response.status}`);
  return response.json();
};
const jiraFields = "summary,issuetype,status,priority,assignee,updated";
const mapIssues = (result, base) => (result.issues || []).filter((entry) => entry.key && entry.fields).map((entry) => ({ id: entry.id || entry.key, key: entry.key, summary: entry.fields.summary || "", issueType: entry.fields.issuetype?.name || "", status: entry.fields.status?.name || "", priority: entry.fields.priority?.name || "", assignee: entry.fields.assignee?.displayName || entry.fields.assignee?.name || "Atanmadı", updated: entry.fields.updated || "", browseUrl: new URL(`/browse/${encodeURIComponent(entry.key)}`, validateJira(base)).href }));
const jiraBoards = async (base) => (await jiraRequest(base, "/rest/agile/1.0/board?startAt=0&maxResults=100")).values || [];
const jiraProjects = async (base, id) => { const r = await jiraRequest(base, `/rest/agile/1.0/board/${numeric(id)}/project?startAt=0&maxResults=100`); return Array.isArray(r) ? r : r.values || []; };
const numeric = (value) => { if (!/^\d{1,20}$/.test(String(value))) throw new Error("Jira kayıt numarası geçersiz."); return value; };
const sheetsExcel = async (sheets) => {
  if (!Array.isArray(sheets) || sheets.length < 1 || sheets.length > 12) throw new Error("Excel dışa aktarım sayfaları geçersiz.");
  const workbook = new ExcelJS.Workbook(); workbook.creator = "Rota · PO çalışma alanı";
  const used = new Set();
  for (const [index, sheet] of sheets.entries()) {
    let name = String(sheet.name || `Sayfa ${index + 1}`).replace(/[\\/*?:\[\]]/g, " ").trim().slice(0, 31) || `Sayfa ${index + 1}`;
    const original = name; let suffix = 2; while (used.has(name.toLowerCase())) name = `${original.slice(0, 31 - String(suffix).length - 3)} (${suffix++})`; used.add(name.toLowerCase());
    if (!Array.isArray(sheet.columns) || sheet.columns.length < 1 || sheet.columns.length > 60 || !Array.isArray(sheet.rows) || sheet.rows.length > 1_000_000) throw new Error("Excel sayfası geçersiz veya izin verilen satır sınırını aşıyor.");
    const ws = workbook.addWorksheet(name); ws.addRow(sheet.columns);
    for (const row of sheet.rows) ws.addRow(row);
    ws.views = [{ state: "frozen", ySplit: 1 }]; ws.autoFilter = { from: "A1", to: `${String.fromCharCode(64 + Math.min(sheet.columns.length, 26))}1` };
    ws.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } }; ws.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF28365B" } };
    ws.columns.forEach((column, colIndex) => { const label = String(sheet.columns[colIndex]); column.width = Math.max(14, Math.min(42, label.length + 3)); });
  }
  const selected = await savePathDialog({ title: "Backlog'u Excel olarak dışa aktar", defaultPath: `Rota-backlog-${new Date().toISOString().slice(0, 10)}.xlsx`, filters: [{ name: "Excel çalışma kitabı", extensions: ["xlsx"] }] });
  if (!selected) return null;
  await workbook.xlsx.writeFile(selected); return selected;
};
const backupExport = async (workspace, format) => {
  if (!["rota", "json"].includes(format)) throw new Error("Yedek biçimi seçimi geçersiz.");
  const selected = await savePathDialog({ title: "Rota çalışma alanını yedekle", defaultPath: `Rota-yedek-${new Date().toISOString().slice(0, 10)}.${format}`, filters: [{ name: format === "rota" ? "Rota sıkıştırılmış yedek" : "JSON yedek", extensions: [format] }] });
  if (!selected) return null;
  const names = new Set(); const visit = (value) => { if (!value || typeof value !== "object") return; if (typeof value.storedName === "string") names.add(value.storedName); for (const child of Object.values(value)) Array.isArray(child) ? child.forEach(visit) : visit(child); }; visit(workspace);
  let total = 0; const attachments = [];
  for (const storedName of names) { const bytes = await readFile(checkedStoredPath(storedName)); total += bytes.length; if (bytes.length > 25 * 1024 * 1024 || total > 1024 ** 3) throw new Error("Yedek ekleri izin verilen 1 GB sınırını aşıyor."); attachments.push({ storedName, size: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex"), data: bytes.toString("base64") }); }
  const json = Buffer.from(JSON.stringify({ format: "rota-workspace-backup", version: 1, createdAt: new Date().toISOString(), workspace, attachments }));
  if (json.length > 1024 ** 3) throw new Error("Yedek dosyası 1 GB sınırını aşıyor.");
  const output = format === "rota" ? Buffer.concat([Buffer.from("ROTA1\n"), gzipSync(json)]) : json;
  const temp = `${selected}.${randomUUID()}.tmp`; await writeFile(temp, output, { flag: "wx" }); await rename(temp, selected); return { path: selected, attachmentCount: attachments.length };
};
const allowedAssets = new Set(["/", "/index.html", "/src/styles.css", "/Rota.Desktop/webview2-bridge.js", "/dist/renderer/app.js"]);
const assetServer = createServer(async (request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname); }
  catch { response.writeHead(400).end("Bad request"); return; }
  if (!allowedAssets.has(pathname)) { response.writeHead(404).end("Not found"); return; }
  const relative = pathname === "/" ? "index.html" : pathname.slice(1);
  try {
    const body = await readFile(join(root, relative));
    response.writeHead(200, { "Content-Type": mimeTypes[extname(relative).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    response.end(body);
  } catch { response.writeHead(404).end("Not found"); }
});
// Keep the origin stable so WebView localStorage survives app restarts.
const appPort = 41739;
await new Promise((resolveListen, rejectListen) => { assetServer.once("error", rejectListen); assetServer.listen(appPort, "127.0.0.1", resolveListen); });
const appOrigin = `http://127.0.0.1:${appPort}`;
const appIcon = await loadWindowIcon();
const appWindow = app.createBrowserWindow({ title: "Rota", width: 1440, height: 920, minWidth: 1080, minHeight: 720, windowsClassName: "HburakSavasRota", windowsTaskbarIcon: { data: appIcon.pixels, width: appIcon.width, height: appIcon.height } });
appWindow.setWindowIcon(appIcon.pixels, appIcon.width, appIcon.height);
appWindow.setTaskbarIcon(appIcon.pixels, appIcon.width, appIcon.height);
const webview = appWindow.createWebview({ url: `${appOrigin}/index.html`, enableDevtools: process.env.ROTA_WEBVIEW_DEVTOOLS === "1", webContext: app.createWebContext({ dataDirectory: profilePath }), navigationHandler: (url) => url.startsWith(`${appOrigin}/`) });
webview.expose("rotaDesktop", {
  pickAttachments: async () => { const files = await appWindow.openFileDialog({ multiple: true, title: "Dosya ekle", filters: [{ name: "Belgeler ve görseller", extensions: [...allowedExtensions] }, { name: "Tüm dosyalar", extensions: ["*"] }] }); return importPaths(files); },
  importDroppedFiles: async (files) => Promise.all(decodeIncoming(files).map(({ name, bytes }) => saveAttachment(name, bytes))),
  nativeDrop: async (paths) => {
    if (!Array.isArray(paths) || paths.length < 1 || paths.length > 20) throw new Error("Ek dosya listesi geçersiz.");
    let total = 0; const dropped = [];
    for (const path of paths) {
      const info = await stat(path); if (!info.isFile() || info.size > 25 * 1024 * 1024) continue;
      const name = safeName(path); const ext = extname(name).slice(1).toLowerCase();
      if (!allowedExtensions.has(ext)) continue;
      const bytes = await readFile(path); total += bytes.length;
      if (total > 25 * 1024 * 1024) throw new Error("E-posta veya ekleri 25 MB sınırını aşıyor.");
      dropped.push({ name, data: bytes.toString("base64") });
    }
    return dropped;
  },
  parseDroppedEmail: async (files) => { const input = decodeIncoming(files); if (input.length !== 1) throw new Error("Bir seferde tek e-posta bırak."); return parseEmail(input[0].name, input[0].bytes); },
  importSelectedEmailAttachments: async (token, selectedIds) => { const entries = mailAttachmentSessions.get(token); if (!entries) throw new Error("E-posta eki önizlemesinin süresi doldu. E-postayı yeniden bırak."); const indices = [...new Set(selectedIds.map(Number))]; if (indices.length > 20 || indices.some((id) => !Number.isInteger(id) || id < 0 || id >= entries.length)) throw new Error("E-posta eki seçimi geçersiz."); mailAttachmentSessions.delete(token); return Promise.all(indices.filter((id) => allowedExtensions.has(extname(entries[id].name).slice(1).toLowerCase())).map((id) => saveAttachment(entries[id].name, entries[id].bytes))); },
  importDroppedPaths: importPaths,
  parseDroppedEmailPath: (paths) => withBytes(paths, parseEmail),
  openAttachment: async (storedName) => { const path = checkedStoredPath(storedName); try { await execFileAsync("explorer.exe", [path]); return ""; } catch { return "Dosya açılamadı."; } },
  previewAttachment: async (storedName) => { const path = checkedStoredPath(storedName); const bytes = await readFile(path); if (bytes.length > 12 * 1024 * 1024) return null; const mimeType = ({ ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".pdf": "application/pdf" })[extname(path).toLowerCase()]; return mimeType ? { mimeType, dataUrl: `data:${mimeType};base64,${bytes.toString("base64")}` } : null; },
  removeAttachment: async (storedName) => { await rm(checkedStoredPath(storedName), { force: true }); return true; },
  exportWorkspaceBackup: backupExport,
  exportBacklogExcel: sheetsExcel,
  stageWorkspaceRestore: async () => { const paths = await appWindow.openFileDialog({ title: "Rota yedeğini geri yükle", filters: [{ name: "Rota yedeği", extensions: ["rota", "json"] }] }); if (!paths.length) return null; const bytes = await readFile(paths[0]); if (bytes.length > 1024 ** 3) throw new Error("Yedek dosyası 1 GB sınırını aşıyor."); let data; try { data = JSON.parse((bytes.subarray(0, 6).toString() === "ROTA1\n" ? gunzipSync(bytes.subarray(6)) : bytes).toString("utf8")); } catch { throw new Error("Yedek dosyası okunamadı. Dosya bozuk veya JSON değil."); } if (data.format !== "rota-workspace-backup" || data.version !== 1 || !Array.isArray(data.attachments)) throw new Error("Bu dosya desteklenen Rota yedeği değil."); const token = randomUUID(); restoreSessions.set(token, data); return { token, workspace: data.workspace, attachmentCount: data.attachments.length }; },
  commitWorkspaceRestore: async (token) => { const data = restoreSessions.get(token); if (!data) throw new Error("Geri yükleme oturumunun süresi doldu."); for (const file of data.attachments) { const dest = checkedStoredPath(file.storedName); const bytes = Buffer.from(file.data, "base64"); const hash = createHash("sha256").update(bytes).digest("hex"); if (bytes.length !== file.size || !timingSafeEqual(Buffer.from(hash), Buffer.from(file.sha256))) throw new Error(`Yedek eki doğrulanamadı: ${file.storedName}`); await writeFile(dest, bytes); } restoreSessions.delete(token); return null; },
  cancelWorkspaceRestore: async (token) => { restoreSessions.delete(token); return null; },
  jiraHasToken: () => { try { return Boolean(keyring.getPassword()); } catch { return false; } },
  jiraSaveToken: (token) => { if (String(token).trim().length < 8 || String(token).length > 2048) throw new Error("Jira PAT geçerli değil."); keyring.setPassword(String(token).trim()); return null; },
  jiraRemoveToken: () => { try { keyring.deletePassword(); } catch {} return null; },
  jiraOpenTokenPage: async (base) => { const url = validateJira(base); await execFileAsync("explorer.exe", [new URL("/secure/ViewProfile.jspa?selectedTab=com.atlassian.pats.pats-plugin%3Ajira-user-personal-access-tokens", url).href]); return null; },
  jiraOpenIssue: async (base, issueKey) => { if (!/^[A-Z][A-Z0-9_]{0,29}-\d{1,12}$/.test(issueKey)) throw new Error("Jira issue key geçersiz."); await execFileAsync("explorer.exe", [new URL(`/browse/${encodeURIComponent(issueKey)}`, validateJira(base)).href]); return null; },
  jiraListDashboards: async (base) => { const result = await jiraRequest(base, "/rest/api/2/dashboard"); return (Array.isArray(result) ? result : result.dashboards || []).map((x) => ({ id: String(x.id), name: x.name, viewUrl: x.view })); },
  jiraListFilters: async (base) => { const all = []; for (const route of ["/rest/api/2/filter/favourite", "/rest/api/2/filter/my"]) try { const r = await jiraRequest(base, route); all.push(...(Array.isArray(r) ? r : r.values || [])); } catch {} return [...new Map(all.filter((x) => x.id && x.name).map((x) => [String(x.id), { id: String(x.id), name: x.name, jql: x.jql }])).values()]; },
  jiraFetchFilterIssues: async (base, filterId) => { if (!/^\d{1,20}$/.test(String(filterId))) throw new Error("Jira filtresi geçersiz."); return mapIssues(await jiraRequest(base, "/rest/api/2/search", "POST", { jql: `filter = ${filterId} ORDER BY updated DESC`, fields: jiraFields.split(","), startAt: 0, maxResults: 100 }), base); },
  jiraListBoards: async (base) => (await jiraBoards(base)).map((x) => ({ id: String(x.id), name: x.name, type: x.type || "" })),
  jiraListBoardProjects: async (base, id) => (await jiraProjects(base, id)).map((x) => ({ id: String(x.id), key: x.key, name: x.name })),
  jiraListSprints: async (base, id) => { const r = await jiraRequest(base, `/rest/agile/1.0/board/${numeric(id)}/sprint?state=active,future,closed&startAt=0&maxResults=100`); return (r.values || []).map((x) => ({ id: String(x.id), name: x.name, state: x.state, startDate: x.startDate || "", endDate: x.endDate || "", goal: x.goal || "" })); },
  jiraFetchBoardIssues: async (base, id, scope, sprintId) => { const board = numeric(id); const route = scope === "backlog" ? `/rest/agile/1.0/board/${board}/backlog` : scope === "board" ? `/rest/agile/1.0/board/${board}/issue` : scope === "sprint" ? `/rest/agile/1.0/board/${board}/sprint/${numeric(sprintId)}/issue` : null; if (!route) throw new Error("Jira kayıt kapsamı geçersiz."); return mapIssues(await jiraRequest(base, `${route}?startAt=0&maxResults=100&fields=${jiraFields}`), base); },
  jiraListIssueTypes: async (base, projectKey) => { if (!/^[A-Z][A-Z0-9_]{0,29}$/.test(projectKey)) throw new Error("Jira proje anahtarı geçersiz."); const r = await jiraRequest(base, `/rest/api/2/issue/createmeta?projectKeys=${encodeURIComponent(projectKey)}&expand=projects.issuetypes`); const p = (r.projects || []).find((x) => x.key === projectKey); return (p?.issuetypes || []).map((x) => ({ id: String(x.id), name: x.name, subtask: Boolean(x.subtask) })); },
  jiraCreateIssue: async (base, boardId, projectKey, issueTypeId, summary, description) => { if (!/^[A-Z][A-Z0-9_]{0,29}$/.test(projectKey) || !String(summary).trim() || summary.length > 255 || description.length > 30000) throw new Error("Jira issue alanları geçersiz."); const [projects, types] = await Promise.all([jiraProjects(base, boardId), jiraRequest(base, `/rest/api/2/issue/createmeta?projectKeys=${encodeURIComponent(projectKey)}&expand=projects.issuetypes`)]); if (!projects.some((x) => x.key === projectKey)) throw new Error("Seçilen Jira projesi bu board kapsamı içinde değil."); const project = (types.projects || []).find((x) => x.key === projectKey); if (!(project?.issuetypes || []).some((x) => String(x.id) === String(issueTypeId) && !x.subtask)) throw new Error("Issue türü bu Jira projesinde oluşturulabilir değil."); return jiraRequest(base, "/rest/api/2/issue", "POST", { fields: { project: { key: projectKey }, issuetype: { id: String(issueTypeId) }, summary: summary.trim(), description: description.trim() } }); },
});

// Native file drops are converted into regular DOM File objects so the existing
// Outlook and attachment workflows remain shared with browser-based UI code.
appWindow.on("file-drop", ({ files }) => {
  const quoted = JSON.stringify(files);
  webview.evaluateScript(`window.rotaDesktop.nativeDrop(${quoted}).then(items=>{const dt=new DataTransfer();for(const item of items){const bytes=Uint8Array.from(atob(item.data),c=>c.charCodeAt(0));dt.items.add(new File([bytes],item.name));}window.dispatchEvent(new DragEvent('drop',{bubbles:true,cancelable:true,dataTransfer:dt}));}).catch(error=>window.dispatchEvent(new CustomEvent('rota-native-error',{detail:String(error)})));`);
});
app.run();
