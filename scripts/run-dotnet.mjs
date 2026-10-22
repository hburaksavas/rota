import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const localDotnet = resolve(root, ".dotnet", "dotnet.exe");
const system = spawnSync("dotnet", ["--list-sdks"], { encoding: "utf8", windowsHide: true });
const executable = system.status === 0 && system.stdout.trim() ? "dotnet" : existsSync(localDotnet) ? localDotnet : "dotnet";
const result = spawnSync(executable, process.argv.slice(2), { cwd: root, stdio: "inherit", windowsHide: false });
if (result.error) {
  console.error(`.NET çalıştırılamadı: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
