import assert from 'node:assert/strict';
import { mkdtemp, writeFile, open, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileShortcuts } from '../../scripts/file-shortcuts.mjs';
const directory = await mkdtemp(join(tmpdir(), 'rota-shortcut-test-'));
try {
 const archive = join(directory, 'Arşiv.zip'), large = join(directory, 'Büyük veri.custom');
 await writeFile(archive, 'test');
 const handle = await open(large, 'w');await handle.truncate(30 * 1024 * 1024);await handle.close();
 const entries = await fileShortcuts([archive, large, archive]);
 assert.equal(entries.length, 2);assert.equal(entries[0].path, archive);assert.equal(entries[1].name, 'Büyük veri.custom');
 await assert.rejects(fileShortcuts([directory]), /Yalnızca dosyalar/);
 await assert.rejects(fileShortcuts(['relative.txt']), /Geçersiz/);
 await assert.rejects(fileShortcuts([join(directory,'missing.txt')]));
 console.log('Dosya kısayolu: konum, uzantı bağımsızlığı, büyük dosya, tekrar ve geçersiz hedef kontrolleri geçti.');
} finally { await rm(directory, {recursive:true, force:true}); }
