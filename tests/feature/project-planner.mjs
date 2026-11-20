import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { calculatePlanningSchedule } from '../../src/planning-schedule.ts';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1420, height: 900 } });
const key = 'rota-po-workspace-v1';
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const stored = () => page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)), key);
const plannerAction = (action) => page.locator(`[data-planner-action="${action}"]`);
const form = (kind) => page.locator(`[data-planner-form="${kind}"]`);
const submit = (kind) => form(kind).locator('button[type="submit"]').click();
const itemRow = (id) => page.locator(`[data-planner-item="${id}"]`);

async function addPlan(productId, title, members) {
  await page.locator(`[data-project="${productId}"]`).click();
  await page.locator('[data-product-tab="product-plans"]').click();
  await plannerAction('edit-plan').click();
  await form('plan').locator('[name="name"]').fill(title);
  await form('plan').locator('[name="start"]').fill('2030-04-01');
  await form('plan').locator('[name="target"]').fill('2030-04-04');
  for (const member of members) await form('plan').locator(`[name="member"][value="${member}"]`).check();
  await submit('plan');
  await page.getByRole('heading', { name: title, exact: true }).waitFor();
  return (await stored()).projectPlans.find((plan) => plan.name === title).id;
}

async function addScope(ids) {
  await plannerAction('scope').click();
  await form('scope').locator('[name="group"]').fill('Başvuru akışı');
  for (const id of ids) await form('scope').locator(`[name="item"][value="${id}"]`).check();
  await submit('scope');
  await plannerAction('apply').click();
}

async function enterPhases(phases) {
  for (const [phase, member, hours] of phases) {
    await form('work').locator(`[name="${phase}-hours"]`).fill(String(hours));
    await form('work').locator(`[name="${phase}-member"]`).selectOption(member);
  }
  await submit('work');
  await plannerAction('apply').click();
}

async function addException(name, date, person = '') {
  await plannerAction('calendar').click();
  await form('calendar').locator('[name="exception-name"]').fill(name);
  await form('calendar').locator('[name="exception-start"]').fill(date);
  await form('calendar').locator('[name="exception-member"]').selectOption(person);
  await submit('calendar');
  await page.locator('.planner-preview').waitFor();
  assert.equal((await stored()).planningCalendar?.exceptions?.some((entry) => entry.name === name) ?? false, false);
  assert.match(await page.locator('.planner-preview').innerText(), /PAY-241/);
  await plannerAction('apply').click();
}

const openProduct = (id) => page.locator(`[data-project="${id}"]`).click();

try {
  await page.clock.setFixedTime(new Date(2030, 3, 1, 12));
  await page.goto(new URL('../../index.html', import.meta.url).href);
  await page.locator('#setup-form button[type="submit"]').click();
  const before = await stored();
  const product = before.projects[0];
  const otherProduct = before.projects[1];
  await page.evaluate(({ key, otherProduct }) => {
    const state = JSON.parse(localStorage.getItem(key));
    delete state.projectPlans;
    state.teams = [{ id: 'QA', name: 'Planlama ekibi', members: ['Ada', 'Derin', 'Deniz'], memberIds: { Ada: 'ANA', Derin: 'DEV', Deniz: 'TEST' } }];
    const item = state.items.find((entry) => entry.id === 'PAY-241');
    item.priority = 'Orta';
    state.items.find((entry) => entry.id === 'PAY-235').dependsOnIds = ['PAY-241'];
    const standalone = state.items.find((entry) => entry.id === 'PAY-238');
    Object.assign(standalone, { estimate: 2, startDate: '2030-04-01', assignments: [{ teamId: 'QA', member: 'Derin', memberId: 'DEV' }] });
    state.items.push({ ...item, id: 'OTHER-1', title: 'Diğer ürün işi', priority: 'Yüksek', project: otherProduct.name, projectId: otherProduct.id });
    localStorage.setItem(key, JSON.stringify(state));
  }, { key, otherProduct });
  await page.reload();
  assert.match(await page.locator('.project-label').innerText(), /ÜRÜNLER/);

  const secondPlan = await addPlan(otherProduct.id, 'Diğer proje', ['DEV']);
  await addScope(['OTHER-1']);
  await itemRow('OTHER-1').locator('[data-planner-action="edit-work"]').click();
  await enterPhases([['development', 'DEV', 6]]);

  const firstPlan = await addPlan(product.id, 'Başvuru yenileme', ['ANA', 'DEV', 'TEST']);
  await addScope(['PAY-241', 'PAY-235']);
  await itemRow('PAY-235').locator('[data-planner-action="edit-work"]').click();
  await enterPhases([['development', 'DEV', 1]]);
  await itemRow('PAY-241').locator('[data-open-item]').click();
  await page.locator('.detail-modal [data-planner-action="edit-work"]').click();
  await enterPhases([['analysis', 'ANA', 2], ['development', 'DEV', 8], ['test', 'TEST', 4]]);
  await page.locator('.detail-modal').waitFor();
  await page.keyboard.press('Escape');
  await page.locator('.detail-modal').waitFor({ state: 'hidden' });
  assert.match(await itemRow('PAY-241').innerText(), /Kapasiteye göre kaydırıldı.*OTHER-1/);

  const readSchedule = async () => calculatePlanningSchedule(await stored(), '2030-04-01');
  let schedule = await readSchedule();
  assert.deepEqual(schedule.items.get('PAY-241').phases.map((phase) => phase.start), ['2030-04-01', '2030-04-02', '2030-04-03']);
  assert.deepEqual(schedule.items.get('PAY-235').start, '2030-04-03');
  assert.deepEqual(schedule.bookings.get(`DEV:${Date.parse('2030-04-01') / 86400000}`).map((block) => [block.itemId, block.from, block.to]), [['PAY-238', 0, 120], ['OTHER-1', 120, 480]]);

  await addException('Kurum tatili', '2030-04-02');
  await addException('Derin izinli', '2030-04-03', 'DEV');
  schedule = await readSchedule();
  assert.deepEqual(schedule.items.get('PAY-241').phases.map((phase) => phase.start), ['2030-04-01', '2030-04-04', '2030-04-05']);
  assert.equal(schedule.items.get('PAY-235').start, '2030-04-05');
  assert.match(await page.locator('.planner-stats').innerText(), /Hedef aşılıyor/);

  const saved = await stored();
  assert.equal(saved.items.length, before.items.length + 1);
  assert.equal(saved.items.find((item) => item.id === 'PAY-241').planning.planId, firstPlan);
  assert.equal(saved.items.find((item) => item.id === 'OTHER-1').planning.planId, secondPlan);
  assert.equal(saved.projects[0].id, product.id);

  await page.reload();
  await openProduct(product.id);
  await page.locator('[data-product-tab="product-plans"]').click();
  await page.getByRole('button', { name: /Başvuru yenileme/ }).click();
  assert.match(await itemRow('PAY-241').locator('.phase-development').innerText(), /Yazılım\s+Derin · 8 sa/);
  await page.getByRole('button', { name: 'Takvim', exact: true }).click();
  assert.equal(await page.locator('.planner-table [title="Kurum tatili"]').count(), 1);
  assert.equal(await page.locator('.planner-table .phase-development').count(), 2);
  await page.getByRole('button', { name: 'Kapasite', exact: true }).click();
  assert.equal(await page.locator('.planner-table [title="Derin izinli"]').count(), 1);
  assert.equal(await page.locator('.planner-table [title="PAY-238, OTHER-1"]').count(), 1);
  await page.setViewportSize({ width: 900, height: 720 });
  await page.evaluate(() => document.body.classList.add('dark-theme'));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.documentElement.scrollHeight > innerHeight), false);
  await page.getByRole('button', { name: 'İş envanteri', exact: true }).click();
  await itemRow('PAY-235').locator('[data-open-item]').click();
  await page.locator('[data-detail-group="properties"] summary').click();
  await page.locator('#detail-status').selectOption('Tamamlandı');
  assert.equal((await stored()).items.find((item) => item.id === 'PAY-235').status, 'Tamamlandı');
  assert.match(await page.locator('.planner-stats').innerText(), /1 \/ 2 iş/);
  assert.match(await page.locator('[data-planner-work-summary]').innerText(), /Gerçekleşen/);
  const weekendTest = await stored();
  weekendTest.items.find((item) => item.id === 'OTHER-1').planning.phases[0].minutes = 9 * 60;
  weekendTest.projectPlans.find((plan) => plan.id === secondPlan).startDate = '2030-04-05';
  assert.equal(calculatePlanningSchedule(weekendTest, '2030-04-01').items.get('OTHER-1').finish, '2030-04-08');
  assert.deepEqual(errors, []);
  console.log('PASS: eski ürünler, ortak Backlog kaydı, fazlar, ürünler arası kapasite, bağımsız işler, tatil ve izin, bağımlılıklar, etki önizlemesi ve kalıcılık.');
} finally {
  await browser.close();
}
