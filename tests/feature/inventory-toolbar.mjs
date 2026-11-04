import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = []; page.on('pageerror', error => errors.push(error.message));
const output = join(tmpdir(), 'rota-inventory-qa'); await mkdir(output, { recursive: true });
try {
  await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html', import.meta.url))).href);
  await page.locator('#setup-form button[type="submit"]').click();
  await page.locator('.nav-item[data-view="assets"]').click();
  await page.locator('.inventory-heading').waitFor();
  const initialCount = await page.locator('.asset-card').count();
  assert.ok(initialCount > 0);
  assert.equal(Number(await page.locator('#asset-visible-count').innerText()), initialCount);
  await page.locator('#asset-search').fill('eşleşmeyen-kayıt-xyz');
  assert.equal(await page.locator('.asset-card').count(), 0);
  assert.equal(await page.locator('[data-action="clear-asset-filters"]').isVisible(), true);
  await page.locator('[data-action="clear-asset-filters"]').click();
  assert.equal(await page.locator('.asset-card').count(), initialCount);
  assert.equal(await page.locator('[data-action="clear-asset-filters"]').isVisible(), false);
  await page.locator('#asset-type-filter').selectOption('Ekran');
  for (const text of await page.locator('.asset-type-pill').allTextContents()) assert.equal(text, 'Ekran');
  await page.locator('#asset-project-filter').selectOption({ index: 1 });
  const project = await page.locator('#asset-project-filter').inputValue();
  for (const text of await page.locator('.asset-card-meta').allTextContents()) assert.ok(text.includes(project));
  await page.locator('#asset-inactive-filter').check();
  assert.equal(await page.locator('#asset-inactive-filter').isChecked(), true);
  await page.locator('[data-action="clear-asset-filters"]').click();
  for (const dark of [false, true]) {
    await page.evaluate(dark => document.body.classList.toggle('dark-theme', dark), dark);
    for (const width of [1440, 1100, 990]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.locator('.inventory-controls').evaluate(node => node.scrollWidth > node.clientWidth), false);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.documentElement.scrollHeight > innerHeight), false);
      if (width === 1440 || width === 990) await page.screenshot({ animations: 'disabled', path: join(output, `inventory-${dark ? 'dark' : 'light'}-${width}.png`) });
    }
  }
  await page.locator('[data-action="asset-presentation"][data-mode="diagram"]').click();
  await page.locator('#asset-diagram-canvas').waitFor();
  assert.equal(await page.locator('[data-mode="diagram"][data-action="asset-presentation"]').getAttribute('aria-pressed'), 'true');
  await page.locator('[data-action="asset-presentation"][data-mode="cards"]').click();
  assert.equal(await page.locator('.asset-card').count(), initialCount);
  assert.equal(await page.locator('.inventory-add svg').count(), 1);
  await page.locator('[data-action="new-asset"]').click();
  await page.locator('#asset-form').waitFor();
  assert.deepEqual(errors, []);
  console.log('PASS: envanter arama, tür/proje/pasif filtreleri, temizleme, görünüm seçimi, bileşen ekleme, açık/koyu tema ve 990/1100/1440 px taşma. Görseller: ' + output);
} finally { await context.close(); await browser.close(); }
