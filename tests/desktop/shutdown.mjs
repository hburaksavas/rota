import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

if (process.argv[2] === "--child") {
  const { Application } = await import("@webviewjs/webview");
  const { installDesktopShutdown } = await import("../../scripts/desktop-lifecycle.mjs");
  const app = new Application();
  const server = createServer((request, response) => response.end("Rota kapanış testi"));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const context = app.createWebContext({ dataDirectory: process.argv[3] });
  const window = app.createBrowserWindow({ title: "Rota — kapanış testi", width: 400, height: 300 });
  const webview = window.createWebview({ url: `http://127.0.0.1:${port}`, webContext: context });
  installDesktopShutdown(app, server, window);
  process.once("beforeExit", () => {
    assert.equal(server.listening, false);
    assert.equal(window.isDisposed(), true);
    assert.equal(webview.isDisposed(), true);
    assert.equal(context.isDisposed(), true);
    console.log(JSON.stringify({ port, disposed: true }));
  });
  app.run();
  setTimeout(() => window.close(), 1500);
} else {
  for (const mode of ["window", "reopen"]) {
    const profile = await mkdtemp(join(tmpdir(), "rota-shutdown-"));
    try {
      const child = spawn(process.execPath, [fileURLToPath(import.meta.url), "--child", profile, mode], { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
      let output = "", errors = "";
      child.stdout.on("data", (data) => output += data);
      child.stderr.on("data", (data) => errors += data);
      const timer = setTimeout(() => child.kill(), 20000);
      const code = await new Promise((resolve, reject) => { child.once("error", reject); child.once("exit", resolve); });
      clearTimeout(timer);
      assert.equal(code, 0, `${mode}: süreç kendiliğinden kapanmadı. ${errors}`);
      const result = JSON.parse(output.trim().split(/\r?\n/).at(-1));
      assert.equal(result.disposed, true);
      const probe = createServer();
      await new Promise((resolve, reject) => { probe.once("error", reject); probe.listen(result.port, "127.0.0.1", resolve); });
      await new Promise((resolve) => probe.close(resolve));
      console.log(`${mode}: native kaynaklar kapandı, süreç sonlandı ve port serbest.`);
    } finally {
      await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
    }
  }
}
