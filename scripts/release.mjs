import { spawnSync } from "node:child_process";
import { createReadStream } from "node:fs";
import { copyFile, mkdir, mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { serialize } from "node:v8";
import { gzipSync } from "node:zlib";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
if (args.includes("--help")) {
  console.log("Kullanım: npm run release\nKurulum gerektirmeyen tek Windows EXE ve SHA-256 dosyası üretir. Paketleme için Node.js 25.5+ gerekir.");
  process.exit(0);
}
if (args.length) throw new Error(`Bilinmeyen seçenek: ${args.join(" ")}`);
if (process.platform !== "win32") throw new Error("Release paketi Windows üzerinde hazırlanmalıdır (yerel bağımlılıklar nedeniyle).");
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 25 || (major === 25 && minor < 5)) throw new Error("EXE üretmek için Node.js 25.5 veya üzeri gerekir (--build-sea). Hedef bilgisayarda Node.js gerekmez.");

function run(command, argv, cwd = root) {
  const result = spawnSync(command, argv, { cwd, stdio: "inherit", windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} başarısız oldu (çıkış kodu: ${result.status}).`);
}

const npm = process.env.npm_execpath;
if (!npm) throw new Error("Scripti npm run release ile çalıştırın.");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(pkg.version)) throw new Error("package.json sürümü geçersiz.");
const name = `Rota-${pkg.version}-win-${process.arch}`;
const output = join(root, "release");
await mkdir(output, { recursive: true });
for (const extension of [".exe", ".exe.sha256"]) {
  try {
    await stat(join(output, name + extension));
    throw new Error(`${name + extension} zaten var. Önce mevcut çıktıyı taşıyın veya sürümü güncelleyin.`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

// Yalnızca bu çalıştırmada oluşturulan geçici klasör temizlenir.
const temporary = await mkdtemp(join(output, ".release-"));
const stage = join(temporary, name);
try {
  console.log(`Rota ${pkg.version} Windows ${process.arch} paketi hazırlanıyor…`);
  run(process.execPath, [npm, "run", "build"]);
  await mkdir(stage);
  const files = [
    "package.json", "package-lock.json", "index.html",
    "src/styles.css", "src/po-tools.css", "assets/rota.ico",
    "dist/renderer/app.js", "dist/renderer/diagram.js",
    "scripts/start-node-webview.mjs", "scripts/native-file-drop.mjs",
    "scripts/file-shortcuts.mjs", "scripts/pomodoro.mjs",
    "scripts/desktop-lifecycle.mjs", "scripts/workspace-file.mjs"
  ];
  for (const file of files) {
    const destination = join(stage, file);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(join(root, file), destination);
  }
  // Kilit dosyasından temiz üretim kurulumu; geliştiricinin node_modules dizinine dokunmaz.
  run(process.execPath, [npm, "ci", "--omit=dev", "--no-audit", "--no-fund"], stage);
  const runtimePackage = { ...pkg, scripts: { start: "node scripts/start-node-webview.mjs" } };
  delete runtimePackage.devDependencies;
  await writeFile(join(stage, "package.json"), JSON.stringify(runtimePackage, null, 2) + "\n");
  await mkdir(join(stage, "runtime"));
  await copyFile(process.execPath, join(stage, "runtime", "node.exe"));
  const license = await fetch(`https://raw.githubusercontent.com/nodejs/node/v${process.versions.node}/LICENSE`, { signal: AbortSignal.timeout(30_000) });
  if (!license.ok) throw new Error(`Node.js lisansı indirilemedi (${license.status}).`);
  await writeFile(join(stage, "runtime", "NODE-LICENSE.txt"), await license.text());
  // Yerel modüllerin ve dinamik yüklenen host bağımlılıklarının kurulumu doğrulanır.
  run(process.execPath, ["--input-type=module", "-e", 'for (const name of ["@webviewjs/webview", "@napi-rs/keyring", "koffi", "@kenjiuno/msgreader", "mailparser", "exceljs"]) await import(name);'], stage);
  const entries = [];
  async function collect(directory, prefix = "") {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      if (entry.isDirectory()) await collect(join(directory, entry.name), relative + "/");
      else if (entry.isFile()) entries.push([relative, await readFile(join(directory, entry.name))]);
      else if (!entry.isSymbolicLink()) throw new Error(`Desteklenmeyen paket girdisi: ${relative}`);
      // npm'nin .bin kısayolları çalışma zamanında kullanılmaz.
    }
  }
  await collect(stage);
  const payload = gzipSync(serialize(entries));
  const payloadPath = join(temporary, "payload.gz");
  const metadataPath = join(temporary, "metadata.json");
  await writeFile(payloadPath, payload);
  await writeFile(metadataPath, JSON.stringify({ version: pkg.version, hash: createHash("sha256").update(payload).digest("hex") }));
  const archive = join(temporary, name + ".exe");
  const config = join(temporary, "sea.json");
  await writeFile(config, JSON.stringify({
    main: join(root, "scripts/release-bootstrap.cjs"), output: archive,
    disableExperimentalSEAWarning: true, useCodeCache: false,
    execArgvExtension: "none", assets: { payload: payloadPath, metadata: metadataPath }
  }));
  run(process.execPath, ["--build-sea", config]);
  // Windows GUI alt sistemi: çift tıklamada konsol penceresi açılmaz.
  const executable = await readFile(archive);
  const pe = executable.readUInt32LE(0x3c);
  if (executable.toString("ascii", pe, pe + 4) !== "PE\0\0") throw new Error("Geçersiz Windows EXE başlığı.");
  executable.writeUInt16LE(2, pe + 24 + 68);
  await writeFile(archive, executable);
  run(archive, ["--release-smoke-test"], temporary);
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(archive)) hash.update(chunk);
  const checksum = join(temporary, name + ".exe.sha256");
  await writeFile(checksum, `${hash.digest("hex")}  ${name}.exe\n`);
  await rename(archive, join(output, name + ".exe"));
  await rename(checksum, join(output, name + ".exe.sha256"));
  console.log(`Release hazır: ${join(output, name + ".exe")}`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
