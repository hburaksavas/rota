import { rm, writeFile } from "node:fs/promises";
import { build } from "esbuild";

const options = { bundle: true, format: "iife", platform: "browser", target: "es2022", logLevel: "info" };
const stamp = "dist/renderer/.build-complete";
await rm(stamp, { force: true });
await Promise.all([
  build({ ...options, entryPoints: ["src/app.ts"], outfile: "dist/renderer/app.js" }),
  build({
    ...options,
    stdin: { contents: 'export { Graph } from "@antv/x6";', resolveDir: process.cwd() },
    globalName: "RotaDiagram",
    outfile: "dist/renderer/diagram.js"
  })
]);
await writeFile(stamp, "");
