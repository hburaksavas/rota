import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("../../", import.meta.url));
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const exe = join(root, "release", `Rota-${pkg.version}-win-${process.arch}.exe`);
const bytes = await readFile(exe);
assert.equal(createHash("sha256").update(bytes).digest("hex"), (await readFile(exe + ".sha256", "utf8")).split(" ")[0]);
assert.equal(bytes.readUInt16LE(bytes.readUInt32LE(0x3c) + 24 + 68), 2, "EXE konsolsuz Windows uygulaması olmalı.");
const temporary = await mkdtemp(join(tmpdir(), "rota-exe-"));
const freePort = () => new Promise((resolve, reject) => {
  const server = createServer();
  server.once("error", reject);
  server.listen(0, "127.0.0.1", () => { const { port } = server.address(); server.close(() => resolve(port)); });
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let child, browser;
try {
  const port = await freePort();
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (key.toLowerCase() === "path" || key === "NODE_OPTIONS") delete env[key];
  Object.assign(env, {
    PATH: join(process.env.SystemRoot, "System32"), LOCALAPPDATA: join(temporary, "local"),
    ROTA_USER_DATA_DIR: join(temporary, "data"), ROTA_WEBVIEW2_USER_DATA: join(temporary, "webview2"),
    ROTA_WEBVIEW2_DEBUG_PORT: String(port), ROTA_APP_PORT: String(await freePort())
  });
  // İlk açılışta çıkarma ve sonraki açılışta önbellekten yükleme.
  for (const mode of ["ilk açılış", "önbellekten açılış"]) {
    let output = "";
    child = spawn(exe, [], { cwd: temporary, env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    child.stdout.on("data", (chunk) => output += chunk);
    child.stderr.on("data", (chunk) => output += chunk);
    const deadline = Date.now() + 60_000;
    while (!browser && Date.now() < deadline) {
      assert.equal(child.exitCode, null, `${mode}: EXE erken kapandı: ${output}`);
      try { browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`, { timeout: 1000 }); }
      catch { await sleep(250); }
    }
    assert.ok(browser, `${mode}: WebView2 açılmadı. ${output}`);
    let page;
    while (!page && Date.now() < deadline) {
      page = browser.contexts()[0]?.pages().find((entry) => entry.url().includes("/index.html"));
      if (!page) await sleep(100);
    }
    assert.ok(page, "Uygulama sayfası açılmadı.");
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    if (mode === "ilk açılış") {
      await page.locator('#setup-form button[type="submit"]').click({ timeout: 15_000 }).catch(async error => { console.error(output, await page.locator("body").innerText(), await page.evaluate(() => ({ ready: document.readyState, boot: window.__ROTA_WORKSPACE__ }))); throw error; });
      await page.locator(".workspace-command-context").click();
      await page.locator('.personal-tasks textarea[name="message"]').fill("EXE kayıt doğrulaması");
      await page.locator('.personal-tasks textarea[name="message"]').press("Enter");
    } else {
      await page.locator(".workspace-command-context").click({ timeout: 15_000 });
    }
    await page.locator(".personal-tasks .personal-record-open").filter({ hasText: "EXE kayıt doğrulaması" }).waitFor({ timeout: 15_000 });
    assert.match(await page.title(), /Rota/);
    assert.equal(await page.evaluate(() => typeof window.rotaDesktop?.writeWorkspace), "function");
    assert.equal(await page.evaluate(async () => (await fetch("/desktop-api", { method: "POST", body: JSON.stringify({ method: "getDiagnostics", args: [] }) })).status), 403, "Anahtarsız masaüstü çağrıları reddedilmeli.");
    const assets = await page.evaluate(async () => Promise.all(["/src/styles.css", "/dist/renderer/app.js", "/dist/renderer/diagram.js"].map(async (url) => (await fetch(url)).status)));
    assert.deepEqual(assets, [200, 200, 200]);
    const before = page.url();
    await page.evaluate(() => { location.href = "https://example.invalid/"; });
    await sleep(250);
    assert.equal(page.url(), before, "Dış kaynağa gezinme engellenmeli.");
    assert.deepEqual(errors, []);
    const exited = new Promise((resolve) => child.once("exit", resolve));
    await browser.close();
    browser = undefined;
    const hostQuery = spawnSync("powershell.exe", ["-NoProfile", "-Command", `Get-CimInstance Win32_Process -Filter 'ParentProcessId = ${child.pid}' | Where-Object Name -eq 'node.exe' | Select-Object -ExpandProperty ProcessId`], { windowsHide: true, encoding: "utf8", timeout: 5000 });
    const hostPid = Number(hostQuery.stdout?.trim());
    assert.ok(Number.isInteger(hostPid) && hostPid > 0, "Gömülü host süreci bulunmalı.");
    spawnSync("taskkill", ["/PID", String(hostPid)], { windowsHide: true, stdio: "ignore", timeout: 5000 });
    const code = await Promise.race([exited, sleep(15_000).then(() => "timeout")]);
    assert.equal(code, 0, `${mode}: normal kapanış başarısız. ${output}`);
    child = undefined;
    const saved = JSON.parse(await readFile(join(temporary, "data", "workspace.json"), "utf8"));
    assert.ok(saved.tasks.some(task => task.title === "EXE kayıt doğrulaması"), "Kayıt dosyada korunmalı.");
    console.log(`EXE ${mode}: arayüz, dosyalar ve kapanış doğrulandı (Node.js PATH'te yok).`);
  }
} finally {
  await browser?.close().catch(() => {});
  if (child && child.exitCode === null) spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
  await rm(temporary, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
}
