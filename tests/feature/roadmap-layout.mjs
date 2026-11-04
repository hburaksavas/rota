import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = []; page.on('pageerror', error => errors.push(error.message));
const key = 'rota-po-workspace-v1';
const output = join(tmpdir(), 'rota-roadmap-qa'); await mkdir(output, { recursive: true });
const roadmap = () => page.locator('.nav-item[data-view="roadmap"]').click();
try {
  await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html', import.meta.url))).href);
  await page.locator('#setup-form button[type="submit"]').click();
  await roadmap();
  await page.locator('.roadmap-empty').waitFor();
  assert.equal(await page.locator('.roadmap-month-axis').count(), 0);
  await page.locator('.inventory-add[data-action="create-roadmap"]').click();
  await page.locator('#roadmap-form [name="title"]').fill('Ödemelerde kesintisiz müşteri deneyimi');
  await page.locator('#roadmap-form [name="goal"]').fill('Transfer adımlarını sadeleştirerek işlem başarısını ve müşteri güvenini artır.');
  await page.locator('#roadmap-form [name="successMetric"]').fill('Başarısız işlem oranını %2 altına indir.');
  await page.locator('#roadmap-form [name="stage"]').selectOption('Teslimatta');
  await page.locator('#roadmap-form button[type="submit"]').click();
  await page.locator('.roadmap-initiative').waitFor();
  await page.locator('.roadmap-actions [data-action="create-epic"]').click();
  await page.locator('#roadmap-form [name="title"]').fill('Para transferi akışını iyileştirme');
  await page.locator('#roadmap-form [name="stage"]').selectOption('Teslimatta');
  await page.locator('#roadmap-form button[type="submit"]').click();
  await page.evaluate(key => {
    const state = JSON.parse(localStorage.getItem(key));
    const initiative = state.roadmap.find(node => node.type === 'Initiative');
    const epic = state.roadmap.find(node => node.type === 'Epic');
    const start = new Date(); start.setDate(1);
    const end = new Date(start); end.setMonth(end.getMonth() + 2);
    const iso = date => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), '01'].join('-');
    initiative.startDate = iso(start); initiative.targetDate = iso(end);
    state.items[0].roadmapNodeId = epic.id;
    state.items[1].roadmapNodeId = initiative.id;
    state.items[2].roadmapNodeId = epic.id; state.items[2].archived = true;
    state.roadmap.push({ id: 'QA-PAST', type: 'Initiative', title: 'Geçmiş hedef', project: initiative.project, stage: 'Tamamlandı', startDate: '2000-01-01', targetDate: '2000-02-01', owner: '', goal: '', successMetric: '' });
    localStorage.setItem(key, JSON.stringify(state));
  }, key);
  await page.reload(); await roadmap();
  assert.equal(await page.locator('.roadmap-initiative').count(), 2);
  assert.equal(await page.locator('.roadmap-direct-items [data-open-item]').count(), 1);
  assert.equal(await page.locator('.roadmap-epic [data-open-item]').count(), 1);
  assert.match(await page.locator('[data-context-roadmap-id="QA-PAST"]').innerText(), /Görünür dönemin dışında/);
  assert.equal(await page.locator('.roadmap-month-axis').count(), 1);
  await page.locator('.roadmap-epic summary').click();
  assert.equal(await page.locator('.roadmap-epic [data-open-item]').isVisible(), false);
  await page.locator('.roadmap-epic summary').click();
  await page.locator('.roadmap-epic [data-action="edit-roadmap"]').click();
  await page.locator('#roadmap-form').waitFor();
  await page.locator('#modal-root .modal-close').click();
  await page.locator('[data-roadmap-stage="Fikirler"]').click();
  assert.equal(await page.locator('.roadmap-initiative').count(), 0);
  assert.match(await page.locator('.roadmap-empty').innerText(), /Bu filtrede/);
  await page.locator('.roadmap-controls [data-roadmap-clear]').click();
  await page.locator('#roadmap-project-filter').selectOption({ index: 2 });
  assert.equal(await page.locator('.roadmap-initiative').count(), 0);
  await page.locator('.roadmap-controls [data-roadmap-clear]').click();
  await page.locator('[data-roadmap-stage="Teslimatta"]').click();
  assert.equal(await page.locator('.roadmap-initiative').count(), 1);
  for (const dark of [false, true]) {
    await page.evaluate(value => document.body.classList.toggle('dark-theme', value), dark);
    for (const width of [1440, 1100, 990]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.documentElement.scrollHeight > innerHeight), false);
      assert.equal(await page.locator('.roadmap-scroll-region').evaluate(node => node.scrollWidth > node.clientWidth), false);
      if (width === 1440 || width === 990) await page.screenshot({ path: join(output, `roadmap-${dark ? 'dark' : 'light'}-${width}.png`), animations: 'disabled' });
    }
  }
  await page.locator('.roadmap-direct-items [data-open-item]').click();
  await page.locator('.detail-modal').waitFor();
  assert.deepEqual(errors, []);
  console.log('PASS: ürün hamlesi/epic oluşturma, düzenleme, aç/kapat, proje/aşama filtreleri, doğrudan bağlı işler, arşiv, dönem dışı tarihler, iş açma, tema ve 990/1100/1440 px taşma. Görseller: ' + output);
} finally { await context.close(); await browser.close(); }
