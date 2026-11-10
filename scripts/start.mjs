import { spawnSync } from "node:child_process";
import { readdir, stat } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const modified = async (path) => (await stat(new URL(path, root))).mtimeMs;
const outputs = await Promise.all(["app.js", "diagram.js", ".build-complete"].map((name) =>
  modified("dist/renderer/" + name).catch((error) => {
    if (error.code === "ENOENT") return 0;
    throw error;
  })
));
const sources = await readdir(new URL("src/", root), { recursive: true });
const inputs = ["package.json", "package-lock.json", "tsconfig.renderer.json", "scripts/build-renderer.mjs",
  ...sources.filter((name) => name.endsWith(".ts")).map((name) => "src/" + name.replaceAll("\\", "/"))];
const newestInput = Math.max(...await Promise.all(inputs.map(modified)));
if (Math.min(...outputs) < newestInput) {
  const build = spawnSync(process.execPath, [process.env.npm_execpath, "run", "build:renderer"], { stdio: "inherit" });
  if (build.error) throw build.error;
  if (build.status !== 0) process.exit(build.status ?? 1);
}
await import("./start-node-webview.mjs");
