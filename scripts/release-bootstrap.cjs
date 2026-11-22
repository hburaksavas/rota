// Node SEA giriş noktası. Yerel modüller gerçek dosya yollarından yüklenir.
const { getAsset } = require("node:sea");
const { createHash } = require("node:crypto");
const { gunzipSync } = require("node:zlib");
const { deserialize } = require("node:v8");
const fs = require("node:fs/promises");
const { join, dirname, resolve, sep } = require("node:path");
const { homedir } = require("node:os");
const { spawn, spawnSync } = require("node:child_process");

async function main() {
  const metadata = JSON.parse(getAsset("metadata", "utf8"));
  const payload = Buffer.from(getAsset("payload"));
  if (createHash("sha256").update(payload).digest("hex") !== metadata.hash) throw new Error("Uygulama paketi doğrulanamadı.");
  const cache = join(process.env.LOCALAPPDATA || join(homedir(), "AppData", "Local"), "Rota", "runtime");
  const destination = join(cache, metadata.hash);
  const marker = join(destination, ".ready");
  const ready = () => fs.readFile(marker, "utf8").then((value) => value === metadata.hash, () => false);
  if (!await ready()) {
    await fs.mkdir(cache, { recursive: true });
    const temporary = await fs.mkdtemp(join(cache, ".extract-"));
    try {
      for (const [relative, content] of deserialize(gunzipSync(payload))) {
        const target = resolve(temporary, relative);
        if (!target.startsWith(temporary + sep)) throw new Error("Geçersiz paket dosya yolu.");
        await fs.mkdir(dirname(target), { recursive: true });
        await fs.writeFile(target, content);
      }
      await fs.writeFile(join(temporary, ".ready"), metadata.hash);
      try { await fs.rename(temporary, destination); }
      catch (error) { if (!await ready()) throw error; }
    } finally { await fs.rm(temporary, { recursive: true, force: true }); }
  }
  process.chdir(destination);
  const runtime = join(destination, "runtime", "node.exe");
  if (process.argv.includes("--release-smoke-test")) {
    const result = spawnSync(runtime, ["--input-type=module", "-e", 'for (const name of ["@webviewjs/webview", "@napi-rs/keyring", "koffi", "@kenjiuno/msgreader", "mailparser", "exceljs"]) await import(name);'], { cwd: destination, stdio: "inherit", windowsHide: true });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error("Gömülü çalışma zamanı doğrulanamadı.");
    for (const file of ["index.html", "src/styles.css", "src/po-tools.css", "dist/renderer/app.js", "dist/renderer/diagram.js", "assets/rota.ico"]) await fs.access(join(destination, file));
    console.log("EXE içindeki çalışma zamanı, yerel modüller ve arayüz dosyaları doğrulandı.");
    return;
  }
  // Native WebView2 host'u standart Node ana giriş noktasında çalışır.
  // SEA süreci yalnızca paketi açar; hedefte kurulu Node.js kullanılmaz.
  const child = spawn(runtime, ["scripts/start-node-webview.mjs"], { cwd: destination, windowsHide: true, stdio: ["ignore", "inherit", "pipe"] });
  let errors = "";
  child.stderr.on("data", chunk => { errors = (errors + chunk).slice(-64 * 1024); });
  const code = await new Promise((resolve, reject) => { child.once("error", reject); child.once("exit", resolve); });
  if (code !== 0) throw new Error(`Rota host kapandı (${code}). ${errors}`);
}

main().catch(async (error) => {
  const log = join(process.env.LOCALAPPDATA || homedir(), "Rota", "release-error.log");
  await fs.mkdir(dirname(log), { recursive: true }).catch(() => {});
  await fs.appendFile(log, `${new Date().toISOString()} ${error.stack || error}\n`).catch(() => {});
  console.error(error);
  if (!process.argv.includes("--release-smoke-test")) {
    const message = `Rota açılamadı. Microsoft Edge WebView2 Runtime kurulumunu kontrol edin.\nHata kaydı: ${log}`;
    const encoded = Buffer.from(`Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('${message.replaceAll("'", "''")}', 'Rota') | Out-Null`, "utf16le").toString("base64");
    spawnSync("powershell.exe", ["-NoProfile", "-EncodedCommand", encoded], { windowsHide: true });
  }
  process.exit(1);
});
