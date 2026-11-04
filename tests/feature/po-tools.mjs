import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await context.newPage(); page.setDefaultTimeout(6500);
const errors = []; page.on('pageerror', error => errors.push(error.message));
const key = 'rota-po-workspace-v1'; const stored = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
const output = join(tmpdir(), 'rota-po-tools-qa'); await mkdir(output, { recursive: true });
const openItem = async () => { await page.locator('[data-view="backlog"]').click(); await page.locator('[data-open-item="PAY-241"] .backlog-title-open').click(); };
const conversation = async () => { await page.locator('[data-detail-tab="conversation"]').click(); await page.locator('.po-conversation').waitFor(); };
const capture = async name => {
  for (const dark of [false, true]) {
    await page.evaluate(dark => document.body.classList.toggle('dark-theme', dark), dark);
    for (const width of [1440, 1100, 990]) {
      await page.setViewportSize({ width, height: 950 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.documentElement.scrollHeight > innerHeight), false, name + ': page overflow');
      assert.equal(await page.locator('#view-root').evaluate(node => node.scrollWidth > node.clientWidth), false, name + ': view overflow');
      if (name === 'split') {
        assert.equal(await page.locator('.po-detail-columns').evaluate(node => node.scrollWidth > node.clientWidth), false);
        assert.equal(await page.locator('.po-reference').evaluate(node => node.scrollWidth > node.clientWidth), false);
      }
      if (width === 1440 || width === 990) await page.screenshot({ path: join(output, `${name}-${dark ? 'dark' : 'light'}-${width}.png`), animations: 'disabled' });
    }
  }
  await page.setViewportSize({width:1440,height:950}); await page.evaluate(() => document.body.classList.remove('dark-theme'));
};
try {
  await page.goto(pathToFileURL(process.cwd() + '/index.html').href);
  await page.locator('#setup-form button[type="submit"]').click();
  await page.locator('[data-po="meetings"]').click();
  await page.locator('.inventory-heading [data-po="new-meeting"]').click();
  await page.locator('[data-po-meeting-title]').fill('Ödeme ekibi refinement');
  const before = await stored();
  const meetingId = before.meetings[0].id;
  await page.locator('[data-po-meeting-project]').selectOption(before.projects[0].id);
  for (const [kind, text] of [['task','Limit örneklerini hazırla'],['question','İstisnai müşteri limiti ne olacak?'],['decision','İlk sürüm yalnızca bireysel müşterilere açılacak']]) {
    await page.locator('[data-po-form="meeting-entry"] [name="kind"]').selectOption(kind);
    await page.locator('[data-po-form="meeting-entry"] [name="linkedItemId"]').selectOption('PAY-241');
    await page.locator('[data-po-form="meeting-entry"] textarea').fill(text);
    await page.locator('[data-po-form="meeting-entry"] textarea').press('Enter');
  }
  assert.equal((await stored()).meetings[0].entries.length, 3);
  assert.equal((await stored()).tasks.length, before.tasks.length);
  await capture('meeting');
  await page.locator('[data-po="distribute"]').click();
  const distributed = await stored();
  assert.equal(distributed.tasks.length, before.tasks.length + 1);
  assert.equal(distributed.openQuestions.length, (before.openQuestions || []).length + 1);
  assert.equal(distributed.decisions.length, (before.decisions || []).length + 1);
  assert.equal(distributed.tasks[0].linked, 'PAY-241');
  assert.equal(distributed.decisions[0].status, 'Taslak');
  assert.deepEqual(distributed.decisions[0].workItemIds, ['PAY-241']);
  assert.ok(distributed.meetings[0].entries.every(entry => entry.recordId));
  assert.equal(await page.locator('[data-po="distribute"]').isDisabled(), true);
  await page.reload(); await page.locator('[data-po="meetings"]').click();
  assert.equal((await stored()).meetings[0].id, meetingId);
  assert.equal(await page.locator('.po-record-created').count(), 3);
  await openItem(); await conversation();
  assert.match(await page.locator('.po-thread-list').innerText(), /İstisnai müşteri limiti/);
  assert.match(await page.locator('.po-thread-list').innerText(), /İlk sürüm yalnızca/);
  await page.locator('[data-po-form="conversation"] textarea').fill('Analiz örnekleri ekip ile görüşüldü.');
  await page.locator('[data-po-form="conversation"] textarea').press('Enter');
  assert.equal((await stored()).workConversations.length, 1);
  await page.locator('[data-po-form="conversation"] [name="mode"]').selectOption('request');
  for (const kind of ['clarification','example','confirmation','decision']) {
    await page.locator('[data-po-form="conversation"] [name="kind"]').selectOption(kind);
    await page.locator('[data-po-form="conversation"] [name="requestedBy"]').fill('Analiz ekibi');
    await page.locator('[data-po-form="conversation"] textarea').fill('PO beklentisi: ' + kind);
    await page.locator('[data-po-form="conversation"] textarea').press('Enter');
  }
  assert.equal((await stored()).poRequests.length, 4);
  await page.locator('[data-po-thread-search]').fill('PO beklentisi');
  assert.equal(await page.locator('.po-thread-row').count(), 4);
  await page.locator('[data-po-thread-search]').fill('');
  await capture('conversation');
  await page.locator('.detail-header [data-po="toggle-split"]').click();
  await page.locator('.po-detail-primary .detail-body').evaluate(node => { window.originalDetailBody = node; });
  await page.locator('[data-po="new-reference"]').click();
  await page.locator('[data-po-reference-title]').fill('Refinement notu');
  await page.locator('[data-po-reference-body]').fill('Hata senaryolarını iş birimiyle netleştir.');
  const note = (await stored()).notes[0];
  assert.equal(note.linked, 'PAY-241');
  assert.equal(note.body, 'Hata senaryolarını iş birimiyle netleştir.');
  await page.locator('[data-po-reference-kind]').selectOption('rule');
  await page.locator('[data-po="new-reference"]').click();
  await page.locator('[data-po-reference-title]').fill('Transfer limit kuralı');
  await page.locator('[data-po-reference-body]').fill('Ürün limiti müşteri türüne göre belirlenir.');
  assert.equal((await stored()).productRules[0].projectId, before.projects[0].id);
  await page.locator('[data-detail-tab="overview"]').click();
  await page.locator('[data-detail-slot="title"] [data-detail-edit]').click();
  await page.locator('[data-detail-input]').fill('Karttan karta transfer ücret kuralı');
  await page.locator('[data-po-reference-body]').click();
  assert.equal((await stored()).items.find(item => item.id === 'PAY-241').title, 'Karttan karta transfer ücret kuralı');
  assert.equal(await page.locator('.po-detail-primary .detail-body').evaluate(node => node === window.originalDetailBody), true);
  await capture('split');
  await page.locator('.po-reference [data-po="toggle-split"]').click();
  assert.equal(await page.locator('.po-split-view').count(), 0);
  await page.locator('.detail-modal .modal-close').click();
  await page.locator('[data-po="mine"]').click();
  assert.equal(await page.locator('.po-request-card').count(), 4);
  await page.locator('#po-mine-kind').selectOption('example');
  assert.equal(await page.locator('.po-request-card').count(), 1);
  await page.locator('[data-po-form="answer"] textarea').fill('Örnek müşteri için 1000 birim limiti kullan.');
  await page.locator('[data-po-form="answer"] button').click();
  assert.equal(await page.locator('.po-request-card').count(), 0);
  await page.locator('#po-mine-kind').selectOption('');
  assert.equal(await page.locator('.po-request-card').count(), 3);
  assert.equal(await page.locator('[data-po-mine-count]').innerText(), '3');
  await capture('mine');
  await page.locator('[data-po="mine-resolved"]').click();
  assert.equal(await page.locator('.po-request-card').count(), 1);
  await page.locator('[data-po="reopen-request"]').click();
  await page.locator('[data-po="mine-open"]').click();
  await page.locator('#po-mine-kind').selectOption('example');
  await page.locator('[data-po-form="answer"] textarea').fill('Güncel örnek: 2000 birim limit.');
  await page.locator('[data-po-form="answer"] button').click();
  await page.locator('[data-po="mine-resolved"]').click();
  await page.locator('#po-mine-kind').selectOption('');
  await page.locator('[data-po="open-item"]').click(); await conversation();
  assert.match(await page.locator('.po-thread-list').innerText(), /1000 birim/);
  assert.match(await page.locator('.po-thread-list').innerText(), /2000 birim/);
  assert.equal((await stored()).poRequests.find(entry => entry.kind === 'example').replies.length, 2);
  await page.locator('.detail-modal .modal-close').click();
  await page.reload(); await page.locator('[data-po="mine"]').click();
  assert.equal(await page.locator('.po-request-card').count(), 3);
  assert.equal((await stored()).notes.find(entry => entry.id === note.id).body, note.body);
  assert.equal((await stored()).meetings[0].entries.length, 3);
  // Legacy questions only appear when explicitly addressed to this PO; saved data is preserved.
  await page.evaluate(key => {
    const s = JSON.parse(localStorage.getItem(key));
    const at = new Date().toISOString();
    s.openQuestions.push({ id: 'QA-MINE', text: 'PO teyidi', owner: s.profile.userName, expectedAt: '', status: 'Açık', linkedItemId: 'PAY-241', createdAt: at });
    s.openQuestions.push({ id: 'QA-OTHER', text: 'Başka kişinin sorusu', owner: 'Başka kişi', expectedAt: '', status: 'Açık', createdAt: at });
    s.openQuestions.push({ id: 'QA-MISSING', text: 'Silinen işe bağlı', owner: s.profile.userName, expectedAt: '', status: 'Açık', linkedItemId: 'MISSING', createdAt: at });
    localStorage.setItem(key, JSON.stringify(s));
  }, key);
  await page.reload(); await page.locator('[data-po="mine"]').click();
  assert.equal(await page.locator('.po-request-card').count(), 4);
  assert.equal(await page.locator('[data-po-mine-count]').innerText(), '4');
  await page.locator('[data-po-form="answer"][data-id="QA-MINE"] textarea').fill('Teyit edildi.');
  await page.locator('[data-po-form="answer"][data-id="QA-MINE"] button').click();
  assert.equal((await stored()).openQuestions.find(entry => entry.id === 'QA-MINE').status, 'Yanıtlandı');
  await page.locator('[data-po="meetings"]').click();
  await page.locator('[data-po-form="meeting-entry"] textarea').fill('Kayıt sayısını artırmaması gereken boş satır');
  await page.locator('[data-po-form="meeting-entry"] textarea').press('Enter');
  await page.locator('.po-meeting-line:last-child [data-po-entry-text]').fill('   ');
  const taskCount = (await stored()).tasks.length;
  await page.locator('[data-po="distribute"]').click();
  assert.equal((await stored()).tasks.length, taskCount);
  assert.match(await page.locator('#toast-root').innerText(), /Boş satırları/);
  assert.deepEqual(errors, []);
  console.log('PASS: toplantı kayıt dağıtımı/tekrarsızlık/kalıcılık, dört PO beklentisi/yanıt, kronolojik konuşmalar, aynı iş detayında not ve ürün kuralı düzenleme, sol alanı düzenleme, arama, tema ve 990/1100/1440 px. Görseller: '+output);
} finally { await context.close(); await browser.close(); }
