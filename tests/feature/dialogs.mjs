import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
page.setDefaultTimeout(7000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('dialog', async dialog => { errors.push('Native dialog: ' + dialog.type()); await dialog.dismiss(); });
try {
  await page.goto(pathToFileURL(process.cwd() + '/index.html').href);
  await page.locator('#setup-form button[type="submit"]').click();
  await page.evaluate(() => {
    const trigger = document.createElement('button'); trigger.id = 'test-delete'; trigger.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999'; trigger.dataset.action = 'delete-note'; trigger.dataset.id = 'N-01'; trigger.textContent = 'Sil'; document.body.append(trigger);
  });
  const notes = () => page.evaluate(() => JSON.parse(localStorage.getItem('rota-po-workspace-v1')).notes);
  const before = await notes();
  await page.locator('#test-delete').click();
  await page.locator('.app-dialog').waitFor();
  await page.keyboard.press('Escape');
  assert.deepEqual(await notes(), before);
  await page.locator('#test-delete').click();
  await page.locator('.app-dialog button[type="submit"]').click();
  await page.waitForFunction(() => !JSON.parse(localStorage.getItem('rota-po-workspace-v1')).notes.some(n => n.id === 'N-01'));
  const bundle = await build({ entryPoints: ['src/dialogs.ts'], bundle: true, write: false, format: 'iife', globalName: 'RotaDialogs' });
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  await page.evaluate(() => { document.getElementById('modal-root').innerHTML = '<div class="modal-backdrop"><section class="modal" role="dialog"><input id="underlying-draft" value="Taslak korunacak"></section></div>'; document.getElementById('underlying-draft').focus(); window.dialogResult = undefined; void RotaDialogs.appPrompt('Etiketi düzenle', 'Önceki').then(v => window.dialogResult = v); });
  await page.locator('.app-dialog input').fill('Yeni etiket');
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.dialogResult === 'Yeni etiket');
  assert.equal(await page.locator('#underlying-draft').inputValue(), 'Taslak korunacak');
  assert.equal(await page.locator('#underlying-draft').evaluate(el => el === document.activeElement), true);
  await page.evaluate(() => { void RotaDialogs.appPrompt('İptal denemesi').then(v => window.dialogResult = v); });
  await page.locator('.app-dialog input').waitFor(); await page.keyboard.press('Escape');
  await page.waitForFunction(() => window.dialogResult === null);
  assert.equal(await page.locator('#underlying-draft').count(), 1);
  for (const dark of [false, true]) {
    await page.evaluate(dark => { document.body.classList.toggle('dark-theme', dark); void RotaDialogs.appConfirm('Uzun açıklama\nİkinci satır'); }, dark);
    await page.locator('.app-dialog').waitFor();
    await page.setViewportSize({width: 500, height: 650});
    assert.equal(await page.locator('.app-dialog').evaluate(el => el.scrollWidth > el.clientWidth), false);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.app-dialog').evaluate(el => el.contains(document.activeElement)), true);
    await page.keyboard.press('Escape');
  }
  assert.deepEqual(errors, []);
  console.log('Rota dialogs: deletion, cancellation, prompt, draft preservation, focus, keyboard and themes passed.');
} finally { await browser.close(); }
