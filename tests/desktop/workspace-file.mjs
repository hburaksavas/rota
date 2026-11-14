import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createWorkspaceFile } from "../../scripts/workspace-file.mjs";

const dir = await mkdtemp(join(tmpdir(), "rota-workspace-file-"));
try {
  const store = createWorkspaceFile(dir);
  assert.equal(await store.read(), null);

  // Yazmalar birleştirilir; son veri kazanır.
  const first = store.write('{"n":1}', 1);
  const second = store.write('{"n":2}', 2);
  assert.deepEqual(await Promise.all([first, second]), [true, true]);
  assert.equal(await store.read(), '{"n":2}');

  // Sırasız gelen eski yazma yok sayılır.
  assert.equal(await store.write('{"n":0}', 1), false);
  assert.equal(await store.read(), '{"n":2}');

  // Geçersiz veri reddedilir ve dosyaya dokunulmaz.
  assert.throws(() => store.write("bozuk", 3), /geçersiz/);
  assert.equal(await store.read(), '{"n":2}');

  // Oturumdaki ilk yazmadan önce önceki dosya yedeklenir.
  const next = createWorkspaceFile(dir);
  await next.write('{"n":3}', 1);
  assert.equal(await readFile(join(dir, "workspace.previous.json"), "utf8"), '{"n":2}');

  // Kapanışta bekleyen yazma senkron boşaltılır.
  const pending = next.write('{"n":4}', 2);
  next.flushSync();
  assert.equal(await pending, true);
  assert.equal(await readFile(join(dir, "workspace.json"), "utf8"), '{"n":4}');
  assert.deepEqual((await readdir(dir)).filter((name) => name.endsWith(".tmp")), []);

  // Okunamayan dosya hata olarak bildirilir.
  await rm(join(dir, "workspace.json"));
  await writeFile(join(dir, "workspace.json"), "");
  assert.equal(await createWorkspaceFile(dir).read(), "");
  console.log("Çalışma alanı dosyası testleri geçti.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
