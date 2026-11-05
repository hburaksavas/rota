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
  await page.locator('[data-view="backlog"]').click();
  const stageStart = page.locator('[data-action="start-meeting-stage"]');
  assert.equal(await stageStart.isVisible(), false);
  const stageChoices = page.locator('[data-select-backlog-item]');
  await stageChoices.nth(0).check();
  await stageChoices.nth(1).check();
  await stageStart.click();
  const agenda = page.locator('.meeting-stage-agenda button');
  assert.equal(await agenda.count(), 2);
  const firstTopic = await agenda.nth(0).getAttribute('data-id');
  const secondTopic = await agenda.nth(1).getAttribute('data-id');
  const closingButton = page.getByRole('button', { name: 'Kapanış kartı', exact: true });
  const copySummary = page.getByRole('button', { name: 'Özeti kopyala', exact: true });
  const closingTopics = page.locator('.meeting-closing-topic');
  await closingButton.click();
  assert.equal(await copySummary.isDisabled(), true);
  await page.getByRole('button', { name: 'Gündeme dön' }).click();
  assert.equal(await page.locator('.meeting-stage-agenda [aria-current="step"]').getAttribute('data-id'), firstTopic);
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('.meeting-stage-agenda [aria-current="step"]').getAttribute('data-id'), secondTopic);
  const previous = page.getByRole('button', { name: 'Önceki iş', exact: true });
  const next = page.getByRole('button', { name: 'Sonraki iş', exact: true });
  assert.equal(await next.innerText(), '');
  assert.equal(await next.isDisabled(), true);
  assert.equal(await page.locator('.meeting-stage-nav span').innerText(), secondTopic);
  await previous.click();
  assert.equal(await previous.isDisabled(), true);
  assert.equal(await page.getByRole('button', { name: 'Karar kaydet', exact: true }).count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Soru aç', exact: true }).count(), 0);
  const composer = page.locator('#meeting-stage-record-form');
  const message = composer.locator('[name="text"]');
  const send = composer.getByRole('button', { name: 'Gönder' });
  assert.equal(await send.innerText(), '');
  assert.equal(await send.isDisabled(), true);
  await message.fill('İlk işin kaydedilmemiş notu');
  await message.press('ArrowRight');
  assert.equal(await composer.getAttribute('data-item-id'), firstTopic);
  await agenda.nth(1).click();
  assert.equal(await message.inputValue(), '');
  for (const [kind, collection, content, link] of [
    ['decision', 'decisions', 'rationale', 'workItemIds'],
    ['question', 'openQuestions', 'text', 'linkedItemId'],
    ['task', 'tasks', 'description', 'linked'],
    ['note', 'notes', 'body', 'linked']
  ]) {
    const text = 'Hızlı toplantı kaydı ' + kind;
    await composer.locator('input[name="kind"][value="' + kind + '"]').check();
    await message.fill(text);
    if (kind === 'note') await send.click(); else await message.press('Enter');
    const record = (await stored())[collection][0];
    assert.equal(record[content], text);
    assert.equal(kind === 'decision' ? record[link][0] : record[link], secondTopic);
    if (kind === 'decision') assert.equal(record.status, 'Taslak');
    assert.equal(await message.inputValue(), '');
    assert.equal(await message.evaluate(input => input === document.activeElement), true);
    assert.match(await page.locator('.meeting-stage-records').innerText(), new RegExp(text));
  }
  await agenda.nth(0).click();
  assert.equal(await message.inputValue(), 'İlk işin kaydedilmemiş notu');
  await capture('meeting-stage');
  await composer.locator('input[name="kind"][value="task"]').check();
  await message.fill('İlk gündem maddesinin görevi\nİkinci satır');
  await message.press('Enter');
  await message.fill('Panoya girmemesi gereken taslak');
  await closingButton.click();
  assert.equal(await closingTopics.count(), 2);
  assert.ok((await closingTopics.nth(0).locator('h2').innerText()).startsWith(firstTopic + ' · '));
  assert.ok((await closingTopics.nth(1).locator('h2').innerText()).startsWith(secondTopic + ' · '));
  assert.deepEqual(await closingTopics.nth(1).locator('h3').allTextContents(), ['Kararlar', 'Açık sorular', 'Görevler']);
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', { value: async text => { window.meetingSummary = text; } });
  });
  await copySummary.click();
  const summary = await page.evaluate(() => window.meetingSummary);
  assert.ok(summary.indexOf(firstTopic + ' · ') < summary.indexOf(secondTopic + ' · '));
  assert.match(summary, /Görevler\n• İlk gündem maddesinin görevi\n  İkinci satır/);
  assert.match(summary, /Kararlar\n• Hızlı toplantı kaydı decision/);
  assert.match(summary, /Açık sorular\n• Hızlı toplantı kaydı question/);
  assert.doesNotMatch(summary, /kaydı note|İstisnai müşteri limiti|panoya girmemesi/i);
  await capture('meeting-closing');
  await page.getByRole('button', { name: 'Gündeme dön' }).click();
  assert.equal(await message.inputValue(), 'Panoya girmemesi gereken taslak');
  await closingButton.click();
  await page.locator('[data-action="end-meeting-stage"]').click();
  assert.equal(await page.locator('[data-select-backlog-item]:checked').count(), 2);
  await stageStart.click();
  await closingButton.click();
  assert.equal(await copySummary.isDisabled(), true);
  await page.locator('[data-action="end-meeting-stage"]').click();
  await page.locator('[data-po="meetings"]').click();
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

  const week = await page.evaluate(key => {
    const workspace = JSON.parse(localStorage.getItem(key));
    const date = new Date();
    date.setDate(8);
    const monday = new Date(date);
    monday.setDate(date.getDate() - (date.getDay() + 6) % 7);
    const local = date => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
    const item = workspace.items.find(item => item.id === 'PAY-241');
    delete item.roadmapNodeId;
    item.startDate = item.targetDate = local(date);
    item.attachments = [
      { name: 'ileti.eml', storedName: 'mail.eml', size: 12 },
      { name: 'ileti-eki.pdf', storedName: 'child.pdf', size: 5, addedAt: '2026-02-01T12:00:00Z' },
      { name: 'bağımsız.pdf', storedName: 'standalone.pdf', size: 6, addedAt: '2026-03-01T12:00:00Z' },
      { name: 'eski-ileti.eml', storedName: 'legacy.eml', size: 12 },
      { name: 'eski-ek.pdf', storedName: 'legacy-child.pdf', size: 7 }
    ];
    item.sourceEmail = { name: 'ileti.eml', from: 'Analiz', date: '2026-02-01T12:00:00Z', fingerprint: 'fixture', originalStoredName: 'mail.eml', attachmentStoredNames: ['child.pdf'] };
    item.sourceEmails = [{ name: 'eski-ileti.eml', from: 'Analiz', date: '2026-01-01T12:00:00Z', fingerprint: 'legacy' }];
    item.activity.unshift({ id: 'ACT-STACK', kind: 'comment', message: 'E-posta: Eski ileti', actor: 'Analiz', occurredAt: '2026-01-02T12:00:00Z', attachments: item.attachments.slice(-2) });
    workspace.notes.unshift({ id: 'N-STACK', title: 'Yığın notu', body: 'Bağlı not içeriği', linked: item.id, updated: 'Az önce', createdAt: '2026-04-01T12:00:00Z' });
    localStorage.setItem(key, JSON.stringify(workspace));
    return local(monday);
  }, key);
  await page.reload();
  await page.locator('[data-view="roadmap"]').click();
  const weekButton = page.locator('[data-roadmap-week="' + week + '"]');
  const roadmapCard = page.locator('.roadmap-work-item[data-open-item="PAY-241"]');
  const weekResults = page.locator('.roadmap-week-results');
  await weekButton.hover();
  assert.match(await roadmapCard.getAttribute('class'), /roadmap-week-match/);
  assert.equal(await weekResults.isVisible(), false);
  await weekButton.click();
  await page.locator('.roadmap-weeks > .roadmap-week-strip > strong').hover();
  assert.match(await roadmapCard.getAttribute('class'), /roadmap-week-match/);
  assert.match(await weekResults.locator('[data-open-item="PAY-241"]').innerText(), /Başlangıç ve hedef/);
  await capture('roadmap-week');
  await weekResults.locator('[data-open-item="PAY-241"]').click();
  const detail = page.locator('.detail-modal');
  await detail.locator('[data-detail-tab="attachments"]').click();
  const stack = detail.locator('.record-stack');
  await stack.locator('summary').click();
  const stackRows = stack.locator('.record-stack-list > li').filter({ hasText: /Yığın notu|bağımsız\.pdf|ileti\.eml/ });
  assert.match(await stackRows.nth(0).innerText(), /Yığın notu/);
  assert.match(await stackRows.nth(1).innerText(), /bağımsız.pdf/);
  assert.deepEqual(await stack.locator('.record-stack-children strong').allTextContents(), ['ileti-eki.pdf', 'eski-ek.pdf']);
  assert.match(await stackRows.nth(2).innerText(), /01\.02\.2026/);
  await detail.getByRole('button', { name: 'Masanın kenarına iğnele' }).click();
  await detail.locator('.modal-close').click();
  await weekButton.click();
  assert.equal(await weekResults.isVisible(), false);
  await page.locator('[data-view="backlog"]').click();
  const other = page.locator('.backlog-work-row:not([data-open-item="PAY-241"]) .backlog-title-open').first();
  await other.click();
  const otherId = await detail.getAttribute('data-open-item');
  await detail.locator('[data-detail-tab="activity"]').click();
  await detail.getByRole('button', { name: 'Masanın kenarına iğnele' }).click();
  await detail.locator('[data-desk-open="PAY-241"]').click();
  assert.equal(await detail.locator('[data-detail-tab].selected').getAttribute('data-detail-tab'), 'attachments');
  assert.equal(await stack.getAttribute('open'), '');
  await stack.locator('[data-open-note="N-STACK"]').click();
  await page.locator('.note-modal .modal-close').click();
  await page.locator('#desk-edge [data-desk-open="' + otherId + '"]').click();
  assert.equal(await detail.locator('[data-detail-tab].selected').getAttribute('data-detail-tab'), 'activity');
  await detail.getByRole('button', { name: 'İğneyi kaldır' }).click();
  await detail.locator('.modal-close').click();
  assert.equal(await page.locator('#desk-edge button').count(), 1);
  await capture('desk-edge');
  assert.deepEqual(errors, []);
  console.log('PASS: toplantı kayıt dağıtımı/tekrarsızlık/kalıcılık, dört PO beklentisi/yanıt, kronolojik konuşmalar, aynı iş detayında not ve ürün kuralı düzenleme, sol alanı düzenleme, arama, tema ve 990/1100/1440 px. Görseller: '+output);
} finally { await context.close(); await browser.close(); }
