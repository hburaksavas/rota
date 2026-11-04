import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
const key = 'rota-po-workspace-v1'; const output = join(tmpdir(), 'rota-release-qa'); await mkdir(output, { recursive: true });
const stored = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
try {
  await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html', import.meta.url))).href);
  await page.locator('#setup-form button[type="submit"]').click();
  await page.evaluate(key => {
    const state = JSON.parse(localStorage.getItem(key));
    state.items[0].targetDate = '2026-12-31'; state.items[1].targetDate = '2026-12-31'; state.items[2].targetDate = '2027-01-01';
    state.items[3].targetDate = '2026-12-31'; state.items[3].archived = true;
    state.items[4].targetDate = '2026-12-31'; state.items[4].releaseId = 'QA-EXISTING';
    state.releases.push({ id: 'QA-EXISTING', project: state.items[4].project, name: 'Mevcut yayın', plannedDate: '2026-12-31', status: 'Hazırlanıyor', description: '', updated: new Date().toISOString() });
    state.releases.push({ id: 'QA-UNDATED', project: state.items[4].project, name: 'Tarihsiz yayın', plannedDate: '', status: 'Planlanıyor', description: '', updated: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(state));
  }, key);
  await page.reload(); await page.locator('[data-view="releases"]').click();
  await page.locator('#release-jump-date').fill('2026-12-31');
  assert.equal(await page.locator('.release-due-row').count(), 3);
  assert.equal(await page.locator('.release-calendar-day[aria-pressed="true"]').getAttribute('data-release-day'), '2026-12-31');
  assert.equal(await page.locator('[data-release-id="QA-EXISTING"]').count(), 1);
  assert.equal(await page.locator('[data-release-id="QA-UNDATED"]').count(), 0);
  assert.equal(await page.locator('[data-release-select-item="PAY-225"]').isDisabled(), true);
  await page.locator('[data-release-step="1"]').click();
  assert.equal(await page.locator('#release-jump-date').inputValue(), '2027-01-01');
  assert.equal(await page.locator('.release-due-row').count(), 1);
  await page.locator('[data-release-step="-1"]').click();
  await page.locator('[data-release-select-item="PAY-241"]').check();
  await page.locator('.release-create-date').click();
  assert.equal(await page.locator('#release-form [name="plannedDate"]').inputValue(), '2026-12-31');
  assert.equal(await page.locator('#release-form [name="initialScope"]:checked').count(), 1);
  await page.locator('#release-form [name="name"]').fill('Yıl sonu ödeme yayını');
  await page.locator('#release-form button[type="submit"]').click();
  const release = (await stored()).releases.find(r => r.name === 'Yıl sonu ödeme yayını');
  assert.equal(release.plannedDate, '2026-12-31');
  assert.equal((await stored()).items.find(i => i.id === 'PAY-241').releaseId, release.id);
  assert.equal((await stored()).items.find(i => i.id === 'PAY-225').releaseId, 'QA-EXISTING');
  await page.locator(`[data-release-id="${release.id}"]`).waitFor();
  await page.locator('[data-release-show-all]').click();
  assert.equal(await page.locator('[data-release-id="QA-UNDATED"]').count(), 1);
  await page.locator('[data-release-show-all]').click();
  await page.locator('[data-release-month="1"]').click();
  assert.equal(await page.locator('#release-jump-date').inputValue(), '2027-01-31');
  await page.locator('[data-release-month="1"]').click();
  assert.equal(await page.locator('#release-jump-date').inputValue(), '2027-02-28');
  await page.locator('#release-jump-date').fill('2026-12-31');
  await page.locator('#release-project-filter').selectOption({ index: 2 });
  assert.equal(await page.locator('.release-due-row').count(), 0);
  await page.locator('#release-project-filter').selectOption('');
  // Changing the form date/project refreshes candidates; cancel never creates records.
  const countBeforeCancel = (await stored()).releases.length;
  await page.locator('.release-create-date').click();
  await page.locator('#release-form [name="plannedDate"]').fill('2027-01-01');
  assert.equal(await page.locator('#release-form [name="initialScope"]').count(), 1);
  await page.locator('#release-form [name="project"]').selectOption({ index: 1 });
  assert.equal(await page.locator('#release-form [name="initialScope"]').count(), 0);
  await page.locator('#modal-root .modal-close').click();
  assert.equal((await stored()).releases.length, countBeforeCancel);
  await page.locator(`[data-release-id="${release.id}"] [data-action="edit-release"]`).click();
  assert.equal(await page.locator('#release-form [name="plannedDate"]').inputValue(), '2026-12-31');
  await page.locator('#modal-root .modal-close').click();
  assert.equal(await page.locator('.release-create-date svg').count(), 1);
  for (const dark of [false, true]) {
    await page.evaluate(value => document.body.classList.toggle('dark-theme', value), dark);
    for (const width of [1440, 1100, 990]) {
      await page.setViewportSize({ width, height: 950 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.documentElement.scrollHeight > innerHeight), false);
      assert.equal(await page.locator('.release-planner-layout').evaluate(node => node.scrollWidth > node.clientWidth), false);
      if (width === 1440 || width === 990) await page.screenshot({ path: join(output, `release-${dark ? 'dark' : 'light'}-${width}.png`), animations: 'disabled' });
    }
  }
  await page.locator('.release-due-row [data-open-item]').first().click();
  await page.locator('.detail-modal').waitFor();
  assert.deepEqual(errors, []);
  console.log('PASS: gün/ay/yıl geçişi, ay sonu, hedef tarihteki işler, arşiv, mevcut kapsamı koruma, tarihe release oluşturma ve kapsam kaydı, tarihsiz yayınlar, proje filtresi, tema ve taşma. Görseller: ' + output);
} finally { await context.close(); await browser.close(); }
