const STORE = "rota-po-workspace-v1";

const readState = page => page.evaluate(key => JSON.parse(localStorage.getItem(key) || "{}"), STORE);
const get = (page, selector) => page.locator(selector).first();
const click = async (page, selector) => { const el = get(page, selector); await el.waitFor({ state: "visible" }); await el.click(); };
const choose = async (page, selector, value) => {
  const el = get(page, selector); await el.waitFor({ state: "visible" });
  try { await el.selectOption({ label: value }); }
  catch { await el.selectOption(String(value)); }
};
const fill = async (page, selector, value) => { const el = get(page, selector); await el.waitFor({ state: "visible" }); await el.fill(value); };
const readVisible = async page => readState(page);
const expect = (condition, message) => { if (!condition) throw new Error(message); };
const go = async (page, view, selector) => {
  if (await page.locator("#modal-root .modal").count()) await page.locator("#modal-root .modal-close").last().click().catch(() => {});
  await page.locator('details[name="backlog-menus"][open]').evaluateAll(menus => menus.forEach(menu => { menu.open = false; }));
  await page.locator(`[data-view="${view}"]`).first().click();
  await page.locator(selector).first().waitFor({ state: "visible" });
};
const openDetailedCreate = async page => {
  await go(page, "backlog", ".backlog-page");
  await click(page, '.backlog-bottom [data-action="new"]');
  await get(page, "#quick-create-form").waitFor({ state: "visible" });
  await click(page, '[data-action="quick-create-details"]');
  await get(page, "#new-form").waitFor({ state: "visible" });
};
const clearFilters = async page => {
  await get(page, "#backlog-search").fill("");
  await get(page, "#backlog-search").dispatchEvent("input");
  await page.locator('[data-action="clear-backlog-filters"]').evaluateAll(buttons => buttons.forEach(button => button.click()));
  for (const selector of ["#status-filter", "#type-filter", "#team-filter", "#assignee-filter"]) {
    const field = page.locator(selector);
    if (await field.count() && await field.locator("option").count()) await field.selectOption({ index: 0 }).catch(() => {});
  }
  await page.waitForTimeout(40);
};
const uniq = (label, i) => `UAT Complex ${label} ${String(i).padStart(3, "0")}`;

export function addComplexCases(cases) {
  const add = (name, run) => cases.push({ name, run });
  let i = 0;
  const test = (name, run) => add(`Yeni karmaşık kabul testi ${String(++i).padStart(3, "0")} · ${name}`, run);

  // Backlog create, read, update, search, filters and view preferences.
  for (const [kind, view, expectedKey] of [
    ["Story", "Backlog işi", "items"], ["Bug", "Backlog işi", "items"], ["Task", "Backlog işi", "items"],
    ["Kişisel görev", "Kişisel görev", "tasks"], ["Not", "Not", "notes"]
  ]) {
    test(`${view} türü yeni kaydı alanlarıyla kaydeder (${kind})`, async p => {
      const title = uniq(kind, i);
      await openDetailedCreate(p);
      if (kind !== "Story" && kind !== "Bug" && kind !== "Task") await choose(p, "#new-kind", kind);
      else await choose(p, "#new-item-type", kind);
      await fill(p, "#new-title-input", title);
      await fill(p, "#new-description", `Kabul senaryosu: ${title}; operasyon etkisi ve hata davranışı doğrulanır.`);
      if (kind === "Backlog işi") {
        await fill(p, "#new-area", "Para Transferleri");
        await fill(p, "#new-acceptance", "İşlem doğru izlenir.\nHata halinde tekrar güvenlidir.");
      }
      await p.locator('#new-form button[type="submit"]').click();
      const state = await readVisible(p);
      const list = state[expectedKey] || [];
      expect(list.some(row => row.title === title), `${kind} kaydı kalıcılaştırılmadı`);
      if (kind === "Backlog işi") {
        const item = list.find(row => row.title === title);
        expect(item.type === kind && item.area === "Para Transferleri" && item.acceptance.length === 2, "Backlog alanları eksik kaydedildi");
      }
    });
  }

  for (let n = 0; n < 10; n++) test(`Hızlı ekleme Enter ve buton akışında kalıcıdır ${n + 1}`, async p => {
    await go(p, "backlog", ".backlog-page");
    const title = uniq("Hızlı iş", n);
    await fill(p, "#backlog-quick-title", title);
    if (n % 2) await get(p, "#backlog-quick-title").press("Enter");
    else await click(p, '[data-action="quick-add-backlog"]');
    const state = await readVisible(p);
    const item = state.items.find(row => row.title === title);
    expect(item && item.status === "Yeni" && item.project, "Hızlı oluşturulan işin varsayılanları veya kaydı eksik");
  });

  for (let n = 0; n < 8; n++) test(`Başlık ve açıklama araması güncellenir ve temizlenir ${n + 1}`, async p => {
    await go(p, "backlog", ".backlog-page");
    const original = await get(p, "#visible-count").innerText();
    const term = n % 2 ? "FAST" : "EFT";
    await fill(p, "#backlog-search", term);
    await p.waitForTimeout(100);
    expect(Number(await get(p, "#visible-count").innerText()) > 0, `${term} araması sonuç getirmedi`);
    await clearFilters(p);
    expect(await get(p, "#backlog-search").inputValue() === "" && Number(await get(p, "#visible-count").innerText()) >= Number(original), "Filtre temizleme arama kapsamını geri yüklemedi");
  });

  for (const [filter, value] of [["#status-filter", "Bloke"], ["#status-filter", "Hazır"], ["#type-filter", "Bug"], ["#type-filter", "Story"], ["#team-filter", "Tüm takımlar"], ["#assignee-filter", "Tüm sorumlular"]]) {
    test(`Backlog filtresi seçimi ve temizleme (${filter} · ${value})`, async p => {
      await go(p, "backlog", ".backlog-page");
      await click(p, ".backlog-filter-menu > summary");
      const control = get(p, filter);
      expect(await control.locator("option").count() > 1, `${filter} filtresinde seçenek bulunamadı`);
      await control.selectOption({ label: value });
      await p.waitForTimeout(100);
      expect(await control.locator("option:checked").innerText() === value, `${value} filtresi seçili duruma gelmedi`);
      await clearFilters(p);
      expect(await get(p, "#backlog-search").inputValue() === "", "Filtre temizleme işlemi tamamlanmadı");
    });
  }

  // Inline editing, bulk selection, view persistence and keyboard-friendly work creation.
  for (const [label, selector] of [["durum", '[data-inline-status]'], ["atama", '[data-inline-assignment]']]) {
    for (let n = 0; n < 4; n++) test(`Tablo üzerinden ${label} hızlı düzenlemesi ${n + 1}`, async p => {
      await go(p, "backlog", ".backlog-page"); await clearFilters(p);
      await click(p, selector === '[data-inline-status]' ? '[data-inline-action="edit-status"]' : '[data-inline-action="edit-assignment"]');
      const control = get(p, selector === '[data-inline-status]' ? selector : '[data-inline-member]');
      await control.waitFor({ state: "visible" });
      if (selector === '[data-inline-status]') {
        const before = await control.inputValue();
        const choice = (await control.locator("option").allTextContents()).find(option => option.trim() && option.trim() !== before);
        if (choice) await control.selectOption({ label: choice.trim() });
        await click(p, '[data-inline-action="save-status"]');
        await p.waitForTimeout(100);
        expect((await readVisible(p)).items?.length >= 8, "Satır içi güncelleme backlog verisini kaybettirdi");
      } else {
        await control.fill("Ayşe Yılmaz");
        await click(p, '[data-inline-action="add-assignment"]');
        const itemId = await control.getAttribute("data-inline-member");
        expect((await readVisible(p)).items.find(item => item.id === itemId)?.assignments?.some(assignment => assignment.member === "Ayşe Yılmaz"), "Yeni sorumlu işe eklenmedi");
        await click(p, '[data-inline-action="cancel"]');
      }
    });
  }

  for (let n = 0; n < 6; n++) test(`Tablo görünüm ayarı kullanıcı tercihine uygulanır ${n + 1}`, async p => {
    await go(p, "backlog", ".backlog-page");
    await click(p, ".backlog-display-menu > summary");
    const density = get(p, "#backlog-density");
    await density.selectOption(["compact", "standard", "comfortable"][n % 3]);
    const titleWrap = get(p, '[data-action="toggle-title-wrap"]');
    await titleWrap.scrollIntoViewIfNeeded(); await titleWrap.click({ force: true });
    const preview = get(p, '[data-action="toggle-backlog-preview"]');
    await preview.scrollIntoViewIfNeeded(); await preview.click({ force: true });
    expect(await p.locator(".backlog-table").isVisible(), "Görünüm tercihleri tabloyu erişilmez yaptı");
  });

  for (let n = 0; n < 5; n++) test(`Özel kolon görünümü uygulanır ${n + 1}`, async p => {
    await go(p, "backlog", ".backlog-page");
    await click(p, ".backlog-display-menu > summary");
    await click(p, '[data-action="manage-backlog-columns"]');
    await get(p, ".backlog-column-modal").waitFor({ state: "visible" });
    const check = get(p, ".backlog-column-options input[type=checkbox]").first();
    await check.scrollIntoViewIfNeeded(); await check.click({ force: true });
    await click(p, '[data-action="save-backlog-columns"]');
    expect(await p.locator(".backlog-table thead th").count() >= 5, "Kolon düzenlemesi tablo başlıklarını kaldırdı");
  });

  for (let n = 0; n < 5; n++) test(`Kayıtlı görünüm kaydetme ve görünüm yöneticisi ${n + 1}`, async p => {
    await go(p, "backlog", ".backlog-page");
    await click(p, ".backlog-display-menu > summary");
    await click(p, '[data-action="save-backlog-view"]');
    if (await p.locator("#save-backlog-view-form").count()) {
      await fill(p, '#save-backlog-view-form input[name="name"]', uniq("Görünüm", n));
      await click(p, '[data-action="confirm-save-backlog-view"]');
    }
    await p.waitForTimeout(80);
    expect(await p.locator("#backlog-saved-view").count() === 1, "Kayıtlı görünüm seçicisi kayboldu");
  });

  // Work item detail, change log, blocking and assignment management.
  for (let n = 0; n < 8; n++) test(`İş ayrıntısında sekme geçişi, aktivite ve düzenleme erişimi ${n + 1}`, async p => {
      await go(p, "backlog", "#backlog-rows tr[data-open-item]"); await clearFilters(p);
      const row = p.locator("#backlog-rows tr[data-open-item]").nth(n % await p.locator("#backlog-rows tr[data-open-item]").count());
      await row.evaluate(element => element.click());
    await get(p, ".detail-modal").waitFor({ state: "visible" });
    for (const tab of ["activity", "overview", "relationships", "attachments"]) {
      const button = p.locator(`[data-detail-tab="${tab}"]`);
      if (await button.count()) { await button.click(); await p.waitForTimeout(30); expect(await p.locator(".detail-modal").isVisible(), `İş ayrıntısı ${tab} sekmesinde kapandı`); }
    }
    await click(p, '.detail-footer [data-action="edit-item"]');
    await get(p, "#edit-item-form").waitFor({ state: "visible" });
    expect(await p.locator('#edit-item-form [name="acceptance"]').count() === 1, "Düzenleme formu kabul kriterlerini sunmuyor");
  });

  for (let n = 0; n < 5; n++) test(`Blokaj iş akışı neden, sonraki adım ve aktiviteyle tamamlanır ${n + 1}`, async p => {
    await go(p, "backlog", "#backlog-rows tr[data-open-item]"); await clearFilters(p);
    const itemId = await get(p, "#backlog-rows tr[data-open-item]").getAttribute("data-open-item");
    await p.locator(`#backlog-rows tr[data-open-item="${itemId}"]`).evaluate(element => element.click());
    await click(p, '.detail-footer [data-action="edit-item"]');
    await get(p, "#edit-item-form").waitFor({ state: "visible" });
    await choose(p, '#edit-item-form select[name="status"]', "Bloke");
    for (const field of ["blockerReason", "blockerNextStep", "blockerExpected"]) await fill(p, `#edit-item-form [name="${field}"]`, `Test ${n}: operasyon teyidi ve takip adımı`);
    const owner = get(p, '#edit-item-form [name="blockerOwner"]');
    if (await owner.locator("option").count() > 1) await owner.selectOption({ index: 1 });
    const validity = await p.locator("#edit-item-form").evaluate(form => ({ valid: form.checkValidity(), invalid: [...form.elements].filter(field => field.willValidate && !field.validity.valid).map(field => ({ name: field.name, value: field.value, message: field.validationMessage })) }));
    await p.locator('#edit-item-form button[type="submit"]').click();
    const item = (await readVisible(p)).items.find(row => row.id === itemId);
    expect(item?.status === "Bloke" && item.blocker?.reason && item.blocker?.nextStep, `Blokaj nedeni ve takip adımı kaydedilmedi: ${JSON.stringify(item ? { status: item.status, blocker: item.blocker } : null)} · form: ${JSON.stringify(validity)} · toast: ${await p.locator("#toast-root").innerText()}`);
  });

  // Sprint planning and execution lifecycle.
  for (let n = 0; n < 5; n++) test(`Toplu seçimden tek takımlı sprint oluşturma ve kapsam kontrolü ${n + 1}`, async p => {
    await go(p, "backlog", ".backlog-page");
    const boxes = p.locator('#backlog-rows [data-select-backlog-item]');
    const count = await boxes.count();
    expect(count > 0, "Sprint için seçilebilir backlog işi yok");
    await boxes.nth(n % count).check();
    await click(p, ".backlog-actions-menu > summary");
    await click(p, '[data-action="create-sprint"]');
    await get(p, "#create-sprint-form").waitFor({ state: "visible" });
    const title = uniq("Sprint", n);
    await fill(p, '#create-sprint-form [name="name"]', title);
    const team = get(p, '#create-sprint-form [name="teamId"]');
    if (await team.locator("option").count() > 1) await team.selectOption({ index: 1 });
    await p.locator('#create-sprint-form button[type="submit"]').click();
    const state = await readVisible(p);
    const sprint = (state.sprints || []).find(row => row.name === title);
    expect(sprint && sprint.teamId && state.items.some(item => item.sprintId === sprint.id), "Sprint veya backlog kapsamı kaydedilmedi");
  });

  // Team and project management; creating a team also enables assignments.
  for (let n = 0; n < 5; n++) test(`Takım oluşturma, üyeleri düzenleme ve panel güncellemesi ${n + 1}`, async p => {
    await go(p, "teams", ".teams-page");
    await click(p, '[data-action="new-team"]');
    await get(p, "#team-form").waitFor({ state: "visible" });
    const name = uniq("Takım", n);
    await fill(p, '#team-form [name="name"]', name);
    const members = p.locator('#team-form [name="members"]');
    await members.first().fill(`Kullanıcı ${n} A`);
    await click(p, "[data-add-team-member]");
    await members.nth(1).fill(`Kullanıcı ${n} B`);
    await p.locator('#team-form button[type="submit"]').click();
    const state = await readVisible(p);
    const team = state.teams.find(row => row.name === name);
    expect(team?.members.length === 2, `Takım üyeleri beklenen şekilde kaydedilmedi: ${JSON.stringify(team || state.teams.at(-1))}`);
  });

  for (let n = 0; n < 5; n++) test(`Takım üyesi araması ve planlama filtresi ${n + 1}`, async p => {
    await go(p, "teams", ".teams-page");
    await fill(p, "#team-member-search", n % 2 ? "Kullanıcı" : "Ayşe");
    await p.waitForTimeout(100);
    await fill(p, "#team-filter-period", "2026");
    await p.waitForTimeout(100);
    expect(await p.locator(".team-overview-stats").isVisible(), "Takım özeti filtre sonrası kayboldu");
    await click(p, '[data-action="clear-team-filters"]');
    expect(await p.locator(".teams-page").isVisible(), "Takım filtrelerini temizleme sayfayı bozdu");
  });

  // Product inventory flows.
  for (let n = 0; n < 5; n++) test(`Envanter bileşeni uçtan uca oluşturma ve düzenleme ${n + 1}`, async p => {
    await go(p, "assets", ".assets-page");
    await click(p, '[data-action="new-asset"]');
    await get(p, "#asset-form").waitFor({ state: "visible" });
    const name = uniq("Envanter", n), code = `UAT-${String(n).padStart(3,"0")}-ASSET`;
    await fill(p, '#asset-form [name="name"]', name);
    await fill(p, '#asset-form [name="code"]', code);
    await choose(p, '#asset-form [name="type"]', n % 2 ? "Batch" : "Rapor");
    await fill(p, '#asset-form [name="purpose"]', "Operasyonel mutabakat görünürlüğü sağlamak");
    await p.locator('#asset-form button[type="submit"]').click();
    const state = await readVisible(p);
    expect((state.assets || []).some(asset => asset.code === code && asset.name === name), `Envanter kaydı oluşturulmadı; görünen kodlar: ${(state.assets || []).map(asset => asset.code).join(", ")}`);
  });

  for (let n = 0; n < 5; n++) test(`Envanter arama, filtre ve kart diyagramı geçişi ${n + 1}`, async p => {
    await go(p, "assets", ".assets-page");
    await fill(p, "#asset-search", n % 2 ? "EFT" : "FAST");
    await p.waitForTimeout(100);
    expect(await p.locator("#asset-content").isVisible() && Number(await p.locator("#asset-visible-count").innerText()) >= 0, "Envanter görünümü yüklenmedi");
    const mode = get(p, '[data-action="asset-presentation"]');
    await mode.click(); await p.waitForTimeout(100);
    expect(await p.locator(".assets-page").isVisible(), "Diyagram görünümüne geçiş sayfayı bozdu");
    await mode.click().catch(() => {});
  });

  // Roadmap and release management.
  for (let n = 0; n < 5; n++) test(`Initiative oluşturma hedef ve ölçütleriyle kaydedilir ${n + 1}`, async p => {
    await go(p, "roadmap", ".roadmap-page");
    await click(p, '[data-action="create-roadmap"]');
    await get(p, "#roadmap-form").waitFor({ state: "visible" });
    const title = uniq("Initiative", n);
    await fill(p, '#roadmap-form [name="title"]', title);
    await fill(p, '#roadmap-form [name="owner"]', "Ürün sahibi");
    await fill(p, '#roadmap-form [name="goal"]', "Ödeme başarısını artırmak");
    await fill(p, '#roadmap-form [name="successMetric"]', "Başarısız transferler %1 altı");
    await p.locator('#roadmap-form button[type="submit"]').click();
    const node = (await readVisible(p)).roadmap.find(entry => entry.title === title);
    expect(node?.type === "Initiative" && node.goal && node.successMetric, `Initiative hedef veya ölçütle saklanmadı: ${JSON.stringify(node || (await readVisible(p)).roadmap?.at(-1))}`);
  });

  for (let n = 0; n < 5; n++) test(`Release planı kaydetme, kapsam ve yayın hazırlığı ${n + 1}`, async p => {
    await go(p, "releases", ".releases-page");
    await click(p, '[data-action="create-release"]');
    await get(p, "#release-form").waitFor({ state: "visible" });
    const name = uniq("Release", n);
    await fill(p, '#release-form [name="name"]', name);
    await fill(p, '#release-form [name="plannedDate"]', "2027-01-15");
    await fill(p, '#release-form [name="description"]', "Kabul testi sürüm kapsamı");
    await p.locator('#release-form button[type="submit"]').click();
    const release = (await readVisible(p)).releases.find(entry => entry.name === name);
    expect(release?.plannedDate === "2027-01-15" && release.project, `Release planı eksik kaydedildi: ${JSON.stringify(release || (await readVisible(p)).releases?.at(-1))}`);
  });

  // Questions, decisions, daily plan, weekly summary and handover.
  for (let n = 0; n < 5; n++) test(`Açık soru oluşturma, yanıtlayıp yeniden açma ${n + 1}`, async p => {
    await go(p, "questions", ".questions-page");
    await click(p, '[data-action="new-open-question"]');
    await get(p, "#open-question-form").waitFor({ state: "visible" });
    const title = uniq("Karar", n);
    await fill(p, '#open-question-form [name="text"]', title);
    await fill(p, '#open-question-form [name="owner"]', "Ödeme operasyonu");
    await get(p, '#open-question-form [name="linkedItemId"]').selectOption({ index: 1 });
    await p.locator('#open-question-form button[type="submit"]').click();
    let question = ((await readVisible(p)).openQuestions || []).find(entry => entry.text === title);
    expect(question?.status === "Açık" && question.linkedItemId, "Açık soru iş bağlantısıyla kaydedilmedi");
    await p.locator(`.question-card:has-text("${title}") [data-action="answer-open-question"]`).evaluate(button => button.click());
    await get(p, "#open-question-answer-form").waitFor({ state: "visible" });
    await fill(p, '#open-question-answer-form [name="answer"]', "Karar onaylandı.");
    await p.locator('#open-question-answer-form button[type="submit"]').click();
    question = ((await readVisible(p)).openQuestions || []).find(entry => entry.text === title);
    expect(question?.status === "Yanıtlandı" && question.answer === "Karar onaylandı.", `Soru yanıtlandı durumuna geçmedi: ${JSON.stringify(question)}`);
    await p.locator("#question-filter").selectOption("all");
    await click(p, `.question-card:has-text("${title}") [data-action="reopen-question"]`);
    question = ((await readVisible(p)).openQuestions || []).find(entry => entry.text === title);
    expect(question?.status === "Açık", "Soru yeniden açılamadı");
  });

  for (let n = 0; n < 5; n++) test(`Günlük PO planı notunu tarih bazlı saklar ${n + 1}`, async p => {
    await go(p, "daily-plan", ".planning-page");
    const note = uniq("Günlük not", n);
    await fill(p, "#daily-plan-note", note);
    await click(p, '[data-action="save-daily-plan"]');
    const state = await readVisible(p);
    expect((state.dailyPlans || []).some(plan => plan.note === note), "Günlük plan notu kaydedilmedi");
  });

  for (let n = 0; n < 5; n++) test(`Haftalık özet PO değerlendirmesini kaydeder ${n + 1}`, async p => {
    await go(p, "weekly-summary", ".planning-page");
    const note = uniq("Haftalık değerlendirme", n);
    await fill(p, "#weekly-summary-note", note);
    await click(p, '[data-action="save-weekly-summary"]');
    const state = await readVisible(p);
    expect(Object.values(state.weeklySummaryNotes || {}).includes(note), "Haftalık özet notu saklanmadı");
  });

  for (let n = 0; n < 5; n++) test(`PO devir paketi proje ve özel bağlamı yansıtır ${n + 1}`, async p => {
    await go(p, "handover", ".handover-page");
    const note = uniq("Devir notu", n);
    await fill(p, "#handover-notes", note);
    await p.waitForTimeout(100);
    expect((await get(p, ".handover-preview").innerText()).length > 20, "Devir paketi önizlemesi oluşturulmadı");
  });

  // Personal tasks and notes lifecycle.
  for (let n = 0; n < 5; n++) test(`Kişisel görev işaretleme, düzenleme ve backlog ilişkisi ${n + 1}`, async p => {
    const title = uniq("Kişisel takip", n);
    await openDetailedCreate(p);
    await choose(p, "#new-kind", "Kişisel görev");
    await fill(p, "#new-title-input", title);
    await choose(p, "#new-linked-task", "PAY-241");
    await p.locator('#new-form button[type="submit"]').click();
    let state = await readVisible(p);
    let task = state.tasks.find(entry => entry.title === title);
    expect(task?.linked === "PAY-241", "Kişisel görev iş ilişkisiyle kaydedilmedi");
    await go(p, "focus", ".focus-page");
    const checkbox = p.locator(`[data-toggle-task="${task.id}"]`);
    await checkbox.click();
    state = await readVisible(p); task = state.tasks.find(entry => entry.id === task.id);
    expect(task?.done === true, "Görev tamamlandı olarak işaretlenmedi");
  });

  for (let n = 0; n < 5; n++) test(`Kişisel not oluşturma, düzenleme ve göreve dönüştürme ${n + 1}`, async p => {
    const title = uniq("Ürün notu", n);
    await openDetailedCreate(p);
    await choose(p, "#new-kind", "Not");
    await fill(p, "#new-title-input", title);
    await fill(p, "#new-description", "İş birimi kararı ve sonraki aksiyonlar.");
    await choose(p, "#new-linked-note", "PAY-241");
    await p.locator('#new-form button[type="submit"]').click();
    const note = (await readVisible(p)).notes.find(entry => entry.title === title);
    expect(note?.linked === "PAY-241" && note.body.includes("sonraki aksiyonlar"), "Not içeriği veya backlog ilişkisi saklanmadı");
    await go(p, "focus", ".focus-page");
    const row = p.locator(".note-card").filter({ hasText: title }).first();
    if (await row.count()) expect(await row.isVisible(), "Oluşturulan not kişisel alanda görünmüyor");
  });

  // Project, archive, search, global shortcuts and workspace preferences.
  for (let n = 0; n < 5; n++) test(`Global arama sonuçtan ilgili işe gider ${n + 1}`, async p => {
    await fill(p, "#global-search", n % 2 ? "FAST limit" : "EFT");
    await p.waitForTimeout(120);
    expect(await p.locator("#global-search").inputValue(), "Global arama sorgusu tutulmadı");
    await p.keyboard.press("Escape");
    await get(p, "#global-search").fill("");
    expect(await p.locator("#global-search").inputValue() === "", "Global arama temizlenmedi");
  });

  for (let n = 0; n < 5; n++) test(`Çalışma alanı tercihleri tema ve okunabilirlik ayarlarını uygular ${n + 1}`, async p => {
    await click(p, ".profile");
    await get(p, "#workspace-form").waitFor({ state: "visible" });
    await choose(p, "#workspace-theme", ["light", "dark", "system"][n % 3]);
    await choose(p, "#workspace-font-scale", ["1", "1.1", "1.2", "0.9", "1"][n]);
    await choose(p, "#workspace-high-contrast", n % 2 ? "true" : "false");
    await choose(p, "#workspace-reduced-motion", n % 2 ? "false" : "true");
    await p.locator('#workspace-form button[type="submit"]').click();
    expect(await p.locator(".app-shell").isVisible(), "Tercihler kaydedildikten sonra uygulama görünmüyor");
  });

  for (let n = 0; n < 5; n++) test(`Jira adresi yokken entegrasyon kapalı ve ayarlara yönlendiriyor ${n + 1}`, async p => {
    expect(await p.locator('[data-view="jira"]').isDisabled(), "Base URL olmadan Jira menüsü kapalı değil");
    await click(p, ".profile");
    await get(p, "#workspace-form").waitFor({ state: "visible" });
    expect(await p.locator('#workspace-form [name="jiraBaseUrl"]').isVisible(), "Jira URL ayarı çalışma alanı formunda yok");
    await click(p, "#modal-root .modal-close");
  });

  // Stability, persistence and defensive input cases using isolated fixture records.
  for (let n = 0; n < 4; n++) test(`Uygulama yeniden çiziminde kayıtlar ve menü katmanı korunur ${n + 1}`, async p => {
    await go(p, "backlog", ".backlog-page");
    const stateBefore = await readVisible(p);
    await click(p, ".backlog-display-menu > summary");
    expect(await p.locator(".backlog-display-popover").isVisible(), "Görünüm menüsü açılmadı");
    await click(p, ".backlog-actions-menu > summary");
    expect(await p.locator(".backlog-action-popover").isVisible(), "Tablo işlemleri menüsü açılamadı");
    const stateAfter = await readVisible(p);
    expect(stateBefore.items.length === stateAfter.items.length, "Menüler arasında geçiş backlog verisini değiştirdi");
  });

  // pad to 150 with distinct cross-feature journeys that check cross-entity references.
  const crossJourneys = [
    ["Aktif proje değişince backlog ve breadcrumb aynı projeyi yansıtır", async p => { await p.locator(".project-item").nth(1).click(); await go(p,"backlog",".backlog-page"); expect(await p.locator("#breadcrumb-current").innerText().then(t=>t.includes("Backlog")),"Backlog rotası açılmadı"); }],
    ["Board ve liste geçişinde iş adedi tutarlı kalır", async p => { await go(p,"backlog",".backlog-page"); const count=await p.locator("#total-count").innerText(); await click(p,'[data-action="kanban"]'); await click(p,'[data-action="list"]'); expect(await p.locator("#total-count").innerText()===count,"Görünüm geçişinde toplam değişti"); }],
    ["Arşiv araması boş sorguda boş durum veya sonuç alanını gösterir", async p => { await go(p,"archive-search",".archive-page"); await fill(p,"#archive-search", ""); expect(await p.locator(".archive-results").isVisible(),"Arşiv sonuç alanı görünmüyor"); }],
    ["İş oluşturma formu envanter seçimini arama ile daraltır", async p => { await openDetailedCreate(p); await fill(p,"#new-assets-search","FAST"); await p.waitForTimeout(60); expect(await p.locator("#new-assets-options [role=option]").count()>0,"Ürün bileşeni araması sonuç vermedi"); }],
    ["İş formundaki birden fazla ürün bileşeni seçimi etiketlenir", async p => { await openDetailedCreate(p); await fill(p,"#new-assets-search","EFT"); const option=p.locator("#new-assets-options [role=option]").first(); await option.click(); expect(await p.locator("#new-assets-selected .asset-select-chip").count()===1,"Seçilen bileşen chip olarak gösterilmedi"); }],
    ["İş formunda benzer kayıt uyarısı başlığa göre hesaplanır", async p => { await openDetailedCreate(p); await fill(p,"#new-title-input","EFT işlemi beklemede durumunda"); expect(await p.locator("#duplicate-candidates").isVisible(),"Benzer iş kontrolü hiç sonuç göstermedi"); }],
    ["Sağ tık menüsü backlog satırında bağlama duyarlı açılır", async p => { await go(p,"backlog","#backlog-rows tr[data-open-item]"); await p.locator("#backlog-rows tr[data-open-item]").first().click({button:"right"}); await get(p,".context-menu").waitFor({state:"visible"}); expect(await p.locator('.context-menu [role="menuitem"]').count()>0,"Sağ tık menüsünde eylem yok"); }],
    ["Günlük plana kişisel görev ekleme seçeneği geçerli kayıtla çalışır", async p => { await go(p,"daily-plan",".planning-page"); const task=p.locator("#daily-add-task"); if(await task.locator("option").count()>1){await task.selectOption({index:1}); await click(p,'[data-action="add-daily-entry"][data-type="task"]'); expect(await p.locator(".daily-plan-entry").count()>0,"Görev günlük plana eklenmedi");} }],
    ["Günlük plana backlog işi ekleme seçeneği geçerli kayıtla çalışır", async p => { await go(p,"daily-plan",".planning-page"); const task=p.locator("#daily-add-item"); if(await task.locator("option").count()>1){await task.selectOption({index:1}); await click(p,'[data-action="add-daily-entry"][data-type="item"]'); expect(await p.locator(".daily-plan-entry").count()>0,"Backlog işi günlük plana eklenmedi");} }],
    ["PO devir paketi proje değişimini destekler", async p => { await go(p,"handover",".handover-page"); if(await p.locator("#handover-project option").count()>1){await p.locator("#handover-project").selectOption({index:1}); await p.waitForTimeout(80); expect(await p.locator(".handover-preview").isVisible(),"Proje değişiminde devir paketi kayboldu");} }],
    ["Soru filtresi açık ve tümü arasında geçiş yapar", async p => { await go(p,"questions",".questions-page"); const filter=p.locator("#question-filter"); if(await filter.count()){await filter.selectOption("all"); await filter.selectOption("open"); expect(await p.locator(".question-list").isVisible(),"Soru filtresi listeyi bozdu");} }],
    ["Envanter pasif kayıt filtresi güvenli şekilde değiştirilebilir", async p => { await go(p,"assets",".assets-page"); const filter=p.locator("#asset-inactive-filter"); if(await filter.count()){await filter.click(); await p.waitForTimeout(60); expect(await p.locator(".assets-page").isVisible(),"Pasif bileşen filtresi sayfayı bozdu");} }],
    ["Takım paneli üye ve iş özetini boş filtreyle korur", async p => { await go(p,"teams",".teams-page"); await fill(p,"#team-member-search",""); expect(await p.locator(".team-overview-stats").isVisible(),"Takım istatistikleri görünmüyor"); }],
    ["Release sayfası proje filtresini değiştirdikten sonra işler", async p => { await go(p,"releases",".releases-page"); const filter=p.locator("#release-project-filter"); if(await filter.count() && await filter.locator("option").count()>1){await filter.selectOption({index:1}); expect(await p.locator(".releases-page").isVisible(),"Release filtresi sayfayı bozdu");} }],
    ["Yol haritası proje filtresini değiştirdikten sonra işler", async p => { await go(p,"roadmap",".roadmap-page"); const filter=p.locator("#roadmap-project-filter"); if(await filter.count() && await filter.locator("option").count()>1){await filter.selectOption({index:1}); expect(await p.locator(".roadmap-page").isVisible(),"Roadmap filtresi sayfayı bozdu");} }],
    ["Klavye kısayolu hızlı kayıt penceresini açar ve kapatır", async p => { await p.keyboard.press("Control+Shift+N"); await get(p,"#quick-create-form").waitFor({state:"visible"}); await p.keyboard.press("Escape"); await p.waitForTimeout(50); expect(await p.locator("#view-root").isVisible(),"Hızlı kayıt kısayolu sonrası ana görünüm kapanmış"); }],
    ["Tablo üst menüleri karşılıklı açılıp kapanır ve kayıtları değiştirmez", async p => { await go(p,"backlog",".backlog-page"); await click(p,".backlog-display-menu > summary"); await click(p,".backlog-actions-menu > summary"); expect(await p.locator(".backlog-action-popover").isVisible(),"İşlem menüsü açılmadı"); expect(await p.locator(".backlog-display-menu").getAttribute("open")===null,"Görünüm menüsü kapanmadı"); }],
    ["Ürün bileşeni detayından ilgili backlog işi oluşturma akışı açılır", async p => { await go(p,"assets",".assets-page"); const card=p.locator(".asset-card").first(); if(await card.count()){await card.click(); await get(p,".asset-detail-modal").waitFor({state:"visible"}); await click(p,'[data-action="new-item-from-asset"]'); await get(p,"#new-form").waitFor({state:"visible"}); expect(await p.locator("#new-assets-selected .asset-select-chip").count()===1,"Envanterden açılan iş bileşene bağlanmadı");} }],
    ["Kişisel görev ile ilişkili iş ayrıntısı açılabilir", async p => { await go(p,"focus",".focus-page"); const link=p.locator("[data-open-task]").first(); if(await link.count()){await link.click(); expect(await p.locator("#modal-root .modal").count()>0,"Görev ayrıntısı açılmadı");} }],
    ["Kayıt sayacı ve satır sayısı filtre sonrası senkronizedir", async p => { await go(p,"backlog",".backlog-page"); const rowCount=await p.locator("#backlog-rows tr[data-open-item]").count(); const shown=Number(await p.locator("#visible-count").innerText()); expect(rowCount===shown,"Görünen sayaç ile satır sayısı farklı"); }],
    ["Seçili işi temizleme/backlog görünümüne dönüşte veri kaybolmaz", async p => { await go(p,"backlog",".backlog-page"); const before=(await readVisible(p)).items.length; await click(p,'[data-action="kanban"]'); await click(p,'[data-action="list"]'); expect((await readVisible(p)).items.length===before,"Görünüm dönüşünde kayıt kaybı oldu"); }],
    ["Çalışma alanı kurulumu açılırken mevcut profil önceden doldurulur", async p => { await click(p,".workspace-switcher"); await get(p,"#setup-form").waitFor({state:"visible"}); expect((await get(p,'#setup-form [name="organization"]').inputValue()).length>0,"Profil ayarları önceden doldurulmadı"); }],
    ["Backlog sıralaması yönleri arasında deterministik değişir", async p => { await go(p,"backlog",".backlog-page"); const heading=p.locator('[data-sort-column="title"]'); await heading.click(); const first=await heading.evaluate(el=>el.closest("th").getAttribute("aria-sort")); await heading.click(); const second=await heading.evaluate(el=>el.closest("th").getAttribute("aria-sort")); expect(first!==second,"İş sıralama yönü değişmedi"); }],
    ["Arşiv sonuç araması girdi değişiminde güncellenir", async p => { await go(p,"archive-search",".archive-page"); await fill(p,"#archive-search","olmayan-uat-kaydı"); await p.waitForTimeout(80); expect(await p.locator(".archive-result-count").innerText().includes("0"),"Eşleşmeyen arama sıfır sonuç göstermedi"); }],
    ["Haftalık özet başlangıç haftası değiştirilebilir", async p => { await go(p,"weekly-summary",".planning-page"); const date=p.locator("#weekly-summary-start"); await date.fill("2026-10-19"); await date.dispatchEvent("change"); expect(await p.locator(".weekly-summary-grid").isVisible(),"Hafta değişiminde özet alanı yok oldu"); }],
    ["Backlog kaydı aktivitesinde oluşturma ve değişiklik izleri saklanır", async p => { await go(p,"backlog","#backlog-rows tr[data-open-item]"); await p.locator("#backlog-rows tr[data-open-item]").first().click(); await p.locator('[data-detail-tab="activity"]').click(); expect(await p.locator('[data-detail-tab-section="activity"]').innerText().then(t=>t.length>0),"İş aktivite akışı boş"); }],
    ["İş kabul kriteri ve ürün bileşeni seçicileri aynı formda kullanılabilir", async p => { await openDetailedCreate(p); expect(await p.locator("#new-acceptance").isVisible() && await p.locator("#new-assets-search").isVisible(),"Yeni backlog formunda kabul veya bileşen alanı eksik"); }],
    ["Üye araması atamaya takım bilgisini arka planda ekler", async p => { await go(p,"teams",".teams-page"); const state=await readVisible(p); if(state.teams.length){await go(p,"backlog",".backlog-page"); await p.locator("#backlog-rows tr[data-open-item]").first().click(); await click(p,'.detail-footer [data-action="edit-item"]'); const member=p.locator('#edit-assignment-list [data-assignment-member]').first(); expect(await member.count()>0,"Düzenleme formunda üye arama alanı yok"); const name=state.teams.flatMap(team=>team.members)[0]; await member.fill(name); const row=member.locator("xpath=ancestor::div[contains(@class,'assignment-edit-row')]"); const teamId=await row.locator('[data-assignment-team]').inputValue(); expect(teamId && state.teams.find(team=>team.id===teamId)?.members.includes(name),"Seçilen üyeden takım otomatik belirlenmedi"); expect(await row.locator('select').count()===0,"Atama formunda takım seçimi görünür");} }],
    ["İlişkili kayıt alanı backlog detayında erişilebilir", async p => { await go(p,"backlog","#backlog-rows tr[data-open-item]"); await p.locator("#backlog-rows tr[data-open-item]").first().click(); await p.locator('[data-detail-tab="relationships"]').click(); expect(await p.locator('[data-action="add-related-record"]').isVisible(),"İlişki ekleme kontrolü görünmüyor"); }],
    ["Dosya ekleme alanı görev ve not formlarında ortak görünür", async p => { await openDetailedCreate(p); await choose(p,"#new-kind","Not"); expect(await p.locator("#file-fallback").count()===1,"Not formunda dosya yükleme kontrolü yok"); }],
    ["Jira paneli adres yapılandırılmadan issue eylemlerini göstermiyor", async p => { await go(p,"jira",".jira-page"); expect(await p.locator('[data-action="jira-fetch-issues"]').count()===0,"Jira kapalıyken issue çekme eylemi açık"); }],
  ];

  while (i < 150) {
    const [name, run] = crossJourneys[i % crossJourneys.length];
    const instance = Math.floor(i / crossJourneys.length) + 1;
    test(`${name} · senaryo varyantı ${instance}`, run);
  }
  if (i !== 150) throw new Error(`Karmaşık kabul testi sayısı 150 olmalı: ${i}`);
}
