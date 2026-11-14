// Gerçek WebView2 penceresiyle çalışma alanının workspace.json dosyasında saklandığını doğrular.
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const freePort = () => new Promise((resolve, reject) => {
  const server = createServer();
  server.once("error", reject);
  server.listen(0, "127.0.0.1", () => { const { port } = server.address(); server.close(() => resolve(port)); });
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const root = await mkdtemp(join(tmpdir(), "rota-storage-"));
const userData = join(root, "user-data");
const workspacePath = join(userData, "workspace.json");
const appPort = await freePort();
const readWorkspace = async () => JSON.parse(await readFile(workspacePath, "utf8"));
async function waitFor(check, message, timeout = 10_000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) { try { if (await check()) return; } catch {} await sleep(150); }
  throw new Error(message);
}

async function launch() {
  const debugPort = await freePort();
  const child = spawn(process.execPath, ["scripts/start-node-webview.mjs"], {
    env: { ...process.env, ROTA_USER_DATA_DIR: userData, ROTA_WEBVIEW2_USER_DATA: join(root, "webview2"), ROTA_WEBVIEW2_DEBUG_PORT: String(debugPort), ROTA_APP_PORT: String(appPort) },
    stdio: ["ignore", "inherit", "inherit"], windowsHide: true
  });
  let browser;
  const deadline = Date.now() + 60_000;
  while (!browser && Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Rota başlatılamadı (exit ${child.exitCode}).`);
    try { browser = await chromium.connectOverCDP(`http://127.0.0.1:${debugPort}`, { timeout: 1500 }); } catch { await sleep(400); }
  }
  if (!browser) { child.kill(); throw new Error("WebView2 test penceresine bağlanılamadı."); }
  let page;
  while (!page && Date.now() < deadline) { page = browser.contexts()[0]?.pages().find((entry) => entry.url().includes("/index.html")); if (!page) await sleep(200); }
  await page.waitForLoadState("domcontentloaded");
  page.setDefaultTimeout(8000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  return { child, browser, page, errors };
}

async function closeGracefully({ child, browser }) {
  const exited = new Promise((resolve) => child.once("exit", resolve));
  await browser.close().catch(() => {});
  // /F olmadan taskkill pencereye WM_CLOSE gönderir; uygulama normal kapanış akışından geçer.
  spawnSync("taskkill", ["/PID", String(child.pid)], { stdio: "ignore", windowsHide: true });
  const result = await Promise.race([exited.then(() => "exit"), sleep(15_000).then(() => "timeout")]);
  if (result === "timeout") { spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" }); throw new Error("Rota kapanmadı."); }
}

async function addTask(page, title) {
  await page.locator('.personal-tasks textarea[name="message"]').fill(title);
  await page.locator('.personal-tasks textarea[name="message"]').press("Enter");
  await page.locator(".personal-tasks .personal-record-open").filter({ hasText: title }).waitFor();
}

let session;
try {
  // 1. İlk açılış: kurulumdan sonra workspace.json oluşur ve değişiklikleri içerir.
  session = await launch();
  await session.page.locator('#setup-form button[type="submit"]').click();
  await session.page.locator(".workspace-command-context").click();
  await addTask(session.page, "Dosyaya yazılan görev");
  await waitFor(async () => (await readWorkspace()).tasks.some((task) => task.title === "Dosyaya yazılan görev"), "Görev workspace.json dosyasına yazılmadı.");

  // 2. Kapatmadan hemen önce yapılan değişiklik kaybolmaz.
  await addTask(session.page, "Kapanıştan hemen önce");
  assert.deepEqual(session.errors, []);
  await closeGracefully(session);
  assert.ok((await readWorkspace()).tasks.some((task) => task.title === "Kapanıştan hemen önce"), "Kapanışta bekleyen yazma boşaltılmadı.");
  assert.equal(existsSync(join(userData, "workspace.json.tmp")), false);

  // 3. Yeniden açılış: kayıtlar dosyadan okunur, kurulum istenmez.
  session = await launch();
  await session.page.locator(".workspace-command-context").click();
  await session.page.locator(".personal-tasks .personal-record-open").filter({ hasText: "Kapanıştan hemen önce" }).waitFor();
  assert.equal(await session.page.locator("#setup-form").count(), 0);
  await addTask(session.page, "İkinci oturum");
  await waitFor(async () => (await readWorkspace()).tasks.some((task) => task.title === "İkinci oturum"), "İkinci oturum kaydı yazılmadı.");
  const previous = JSON.parse(await readFile(join(userData, "workspace.previous.json"), "utf8"));
  assert.ok(previous.tasks.some((task) => task.title === "Kapanıştan hemen önce"), "Oturum başı yedeği alınmadı.");
  await closeGracefully(session);

  // 4. Dosya silinirse localStorage yedek kopyası dosyaya geri taşınır.
  await rm(workspacePath);
  session = await launch();
  await session.page.locator(".workspace-command-context").click();
  await session.page.locator(".personal-tasks .personal-record-open").filter({ hasText: "İkinci oturum" }).waitFor();
  await waitFor(async () => (await readWorkspace()).tasks.some((task) => task.title === "İkinci oturum"), "localStorage kaydı dosyaya taşınmadı.");
  assert.deepEqual(session.errors, []);
  await closeGracefully(session);
  session = undefined;
  console.log("Çalışma alanı dosya depolama testleri geçti.");
} finally {
  if (session) { await session.browser.close().catch(() => {}); spawnSync("taskkill", ["/PID", String(session.child.pid), "/T", "/F"], { stdio: "ignore" }); }
  await sleep(500);
  await rm(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }).catch(() => {});
}
