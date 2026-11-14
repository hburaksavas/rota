import { copyFile, readFile, rename, rm, writeFile } from "node:fs/promises";
import { renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_BYTES = 200 * 1024 * 1024;
const WRITE_DELAY_MS = 200;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Çalışma alanını tek bir JSON dosyasında saklar.
 * Yazmalar birleştirilir, geçici dosya + yeniden adlandırma ile atomik yapılır ve kapanışta senkron boşaltılır.
 */
export function createWorkspaceFile(dataRoot) {
  const path = join(dataRoot, "workspace.json");
  const backupPath = join(dataRoot, "workspace.previous.json");
  let pending = null;
  let latestSequence = -1;
  let timer = null;
  let writing = null;
  let sessionBackupDone = false;
  let inFlight = null;
  let closed = false;
  const waiters = [];

  const validate = (raw) => {
    if (typeof raw !== "string" || !raw.startsWith("{")) throw new Error("Çalışma alanı verisi geçersiz.");
    if (Buffer.byteLength(raw, "utf8") > MAX_BYTES) throw new Error("Çalışma alanı 200 MB sınırını aşıyor.");
  };

  async function backupOnce() {
    if (sessionBackupDone) return;
    sessionBackupDone = true;
    await copyFile(path, backupPath).catch((error) => { if (error?.code !== "ENOENT") throw error; });
  }

  async function replace(temp) {
    // Windows'ta virüs tarayıcısı veya indeksleyici dosyayı kısa süre kilitleyebilir.
    for (let attempt = 0; ; attempt++) {
      if (closed) return;
      try { await rename(temp, path); return; }
      catch (error) { if (attempt >= 4 || !["EPERM", "EBUSY", "EACCES"].includes(error?.code)) throw error; await wait(50 * (attempt + 1)); }
    }
  }

  async function drain() {
    while (pending) {
      const { raw, resolvers } = pending;
      pending = null;
      inFlight = raw;
      const temp = `${path}.${process.pid}.tmp`;
      try {
        await backupOnce();
        await writeFile(temp, raw, "utf8");
        await replace(temp);
        resolvers.forEach(({ resolve }) => resolve(true));
      } catch (error) {
        await rm(temp, { force: true }).catch(() => {});
        resolvers.forEach(({ reject }) => reject(error));
      }
    }
    inFlight = null;
    writing = null;
    waiters.splice(0).forEach((resolve) => resolve());
  }

  function schedule() {
    if (timer || writing) return;
    timer = setTimeout(() => { timer = null; writing = drain(); }, WRITE_DELAY_MS);
  }

  return {
    path,
    /** Dosya yoksa null döner; okunamıyorsa hata fırlatır. */
    async read() {
      await this.flush();
      try { return await readFile(path, "utf8"); }
      catch (error) { if (error?.code === "ENOENT") return null; throw error; }
    },
    /** Sıra numarası eski olan yazmalar yok sayılır; IPC çağrıları sırasız tamamlanabilir. */
    write(raw, sequence) {
      validate(raw);
      if (!Number.isSafeInteger(sequence) || sequence < 0) throw new Error("Kayıt sırası geçersiz.");
      return new Promise((resolve, reject) => {
        if (sequence < latestSequence) { resolve(false); return; }
        latestSequence = sequence;
        const resolvers = [...(pending?.resolvers || []), { resolve, reject }];
        pending = { raw, resolvers };
        if (writing) return; // drain döngüsü yeni bekleyeni alacak
        schedule();
      });
    },
    async flush() {
      if (timer) { clearTimeout(timer); timer = null; writing = drain(); }
      if (writing) await new Promise((resolve) => waiters.push(resolve));
    },
    /** Uygulama kapanırken bekleyen son veriyi senkron yazar. */
    flushSync() {
      if (timer) { clearTimeout(timer); timer = null; }
      closed = true;
      const latest = pending || (inFlight !== null ? { raw: inFlight, resolvers: [] } : null);
      if (!latest) return;
      const { raw, resolvers } = latest;
      pending = null;
      const temp = `${path}.${process.pid}.exit.tmp`;
      try { writeFileSync(temp, raw, "utf8"); renameSync(temp, path); resolvers.forEach(({ resolve }) => resolve(true)); }
      catch (error) { try { rmSync(temp, { force: true }); } catch {} resolvers.forEach(({ reject }) => reject(error)); }
    }
  };
}
