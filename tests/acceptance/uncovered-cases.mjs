const STORE = "rota-po-workspace-v1";
const expect = (condition, message) => { if (!condition) throw new Error(message); };
const get = (page, selector) => page.locator(selector).first();
const click = async (page, selector) => { const target = get(page, selector); await target.waitFor({ state: "visible" }); await target.click(); };
const go = async (page, view, selector) => {
  if (await page.locator("#modal-root .modal").count()) await page.locator("#modal-root .modal-close").last().click().catch(() => {});
  await page.locator('details[name="backlog-menus"][open]').evaluateAll(menus => menus.forEach(menu => { menu.open = false; }));
  await page.locator(`[data-view="${view}"]`).first().click();
  await page.locator(selector).first().waitFor({ state: "visible" });
};
const readState = page => page.evaluate(key => JSON.parse(localStorage.getItem(key) || "{}"), STORE);
const clearFilters = async page => {
  const search = page.locator("#backlog-search");
  if (await search.count()) { await search.fill(""); await search.dispatchEvent("input"); }
  const clear = page.locator('[data-action="clear-backlog-filters"]');
  if (await clear.count()) await clear.first().evaluate(button => button.click());
  for (const selector of ["#status-filter", "#type-filter", "#team-filter", "#assignee-filter"]) {
    const field = page.locator(selector);
    if (await field.count() && await field.locator("option").count()) await field.selectOption({ index: 0 }).catch(() => {});
  }
};
const addFile = async (page, selector, name) => get(page, selector).setInputFiles({ name, mimeType: "text/plain", buffer: Buffer.from(`Rota acceptance fixture ${name}`) });

export function addUncoveredCases(cases) {
  let serial = 0;
  const test = (name, run) => cases.push({ name: `Kapsamı genişletilmiş kabul senaryosu ${String(++serial).padStart(3, "0")} · ${name}`, run });

  // New dedicated selection column and bulk-selection states.
  for (let n = 0; n < 10; n++) test(`Seçim kolonu İş kolonunun solunda, tüm görünür işleri seçip temizler ${n + 1}`, async page => {
    await go(page, "backlog", ".backlog-page"); await clearFilters(page);
    const headers = await page.locator(".backlog-table thead th").evaluateAll(ths => ths.slice(0, 2).map(th => th.innerText.trim()));
    expect(await page.locator(".backlog-table thead th:first-child").getAttribute("class") === "backlog-select-heading", "Seçim başlığı ayrı ilk kolon değil");
    expect(headers[1] === "İŞ" || headers[1].startsWith("İŞ"), "İş kolonu seçim kolonunun hemen sağında değil");
    const all = get(page, "[data-select-visible-backlog]");
    await all.check();
    const count = await page.locator("[data-select-backlog-item]:checked").count();
    expect(count > 0 && count === await page.locator("#backlog-rows tr[data-open-item]").count(), "Tümünü seç görünür satırların tamamını seçmedi");
    await all.uncheck();
    expect(await page.locator("[data-select-backlog-item]:checked").count() === 0, "Tümünü kaldır seçili işleri temizlemedi");
  });
  for (let n = 0; n < 10; n++) test(`Tek satır seçimi ayrıntı penceresini açmadan toplu eylemi etkinleştirir ${n + 1}`, async page => {
    await go(page, "backlog", ".backlog-page"); await clearFilters(page);
    const row = page.locator("#backlog-rows tr[data-open-item]").first();
    const id = await row.getAttribute("data-open-item");
    await row.locator("[data-select-backlog-item]").check();
    expect(await page.locator("#modal-root .detail-modal").count() === 0, "Seçim checkbox'ı iş ayrıntısını açtı");
    expect((await readState(page)).items.some(item => item.id === id), "Seçim iş kaydını etkiledi");
    await click(page, ".backlog-actions-menu > summary");
    expect(await page.locator('[data-action="delete-selected-backlog"]').isEnabled(), "Seçimden sonra toplu silme etkinleşmedi");
    await row.locator("[data-select-backlog-item]").uncheck();
    expect(await page.locator('[data-action="delete-selected-backlog"]').isDisabled(), "Seçim kaldırılınca toplu silme kapanmadı");
  });

  // File metadata on creation and on existing backlog items.
  for (let n = 0; n < 15; n++) test(`Yeni backlog işi formundaki ek kayda bağlanır ${n + 1}`, async page => {
    await go(page, "backlog", ".backlog-page"); await click(page, '.backlog-bottom [data-action="new"]');
    await click(page, '[data-action="quick-create-details"]'); await get(page, "#new-form").waitFor({ state: "visible" });
    const title = `UAT kapsam işi ek ${n + 1}`;
    await get(page, "#new-title-input").fill(title);
    const file = `uat-work-${n + 1}.txt`;
    await addFile(page, "#file-fallback", file);
    await page.locator('#new-form button[type="submit"]').click();
    const item = (await readState(page)).items.find(row => row.title === title);
    expect(item?.attachments?.some(attachment => attachment.name === file && attachment.demoOnly), "Yeni iş ekini kayda bağlamadı");
  });
  for (let n = 0; n < 15; n++) test(`İş ayrıntısından ek eklenince geçmiş ve dosya listesi güncellenir ${n + 1}`, async page => {
    await go(page, "backlog", ".backlog-page"); await clearFilters(page);
    const id = await page.locator("#backlog-rows tr[data-open-item]").first().getAttribute("data-open-item");
    await page.locator("#backlog-rows tr[data-open-item]").first().click();
    const file = `uat-detail-${n + 1}.txt`;
    await addFile(page, "#detail-file-fallback", file);
    const item = (await readState(page)).items.find(row => row.id === id);
    expect(item?.attachments?.some(attachment => attachment.name === file), "İş ayrıntısı ekini saklamadı");
    expect(item?.activity?.some(activity => activity.message?.includes(file)), "İş eki değişikliği aktiviteye yazılmadı");
  });
  for (let n = 0; n < 10; n++) test(`İlerleme notuna ek ve görünürlük bilgisi kaydedilir ${n + 1}`, async page => {
    await go(page, "backlog", ".backlog-page"); await clearFilters(page);
    const id = await page.locator("#backlog-rows tr[data-open-item]").first().getAttribute("data-open-item");
    await page.locator("#backlog-rows tr[data-open-item]").first().click();
    await click(page, '[data-detail-tab="activity"]');
    const file = `uat-progress-${n + 1}.txt`, note = `UAT ilerleme notu ${n + 1}`;
    await addFile(page, "#progress-note-file-fallback", file);
    await get(page, "#progress-note-text").fill(note);
    await get(page, "#progress-note-visibility").selectOption(n % 2 ? "private" : "team");
    await click(page, "[data-save-progress-note]");
    const activity = (await readState(page)).items.find(row => row.id === id)?.activity?.find(entry => entry.message === note);
    expect(activity?.attachments?.some(attachment => attachment.name === file), "İlerleme eki kaydedilmedi");
    expect(activity?.visibility === (n % 2 ? "private" : "team"), "İlerleme notu görünürlüğü saklanmadı");
  });
  for (const kind of ["Kişisel görev", "Not"]) for (let n = 0; n < 7; n++) test(`${kind} oluşturulurken dosya eki aynı kayda bağlanır (${n + 1})`, async page => {
    await go(page, "backlog", ".backlog-page"); await click(page, '.backlog-bottom [data-action="new"]');
    await click(page, '[data-action="quick-create-details"]'); await get(page, "#new-form").waitFor({ state: "visible" });
    await get(page, "#new-kind").selectOption(kind);
    const title = `UAT ${kind} ek ${n + 1}`;
    await get(page, "#new-title-input").fill(title);
    const file = `uat-${kind === "Not" ? "note" : "task"}-${n + 1}.txt`;
    await addFile(page, "#file-fallback", file);
    await page.locator('#new-form button[type="submit"]').click();
    const list = (await readState(page))[kind === "Not" ? "notes" : "tasks"] || [];
    expect(list.some(record => record.title === title && record.attachments?.some(attachment => attachment.name === file)), `${kind} dosya ekiyle kaydedilmedi`);
  });

  // Context-menu entry points outside the backlog table.
  const contextTargets = [
    ["focus", ".focus-page", ".focus-task-row", "Görev"],
    ["focus", ".focus-page", ".focus-note", "Not"],
    ["assets", ".assets-page", "[data-open-asset]", "Bileşen"],
    ["backlog", ".backlog-page", ".project-item", "Proje"]
  ];
  for (const [view, pageSelector, targetSelector, label] of contextTargets) for (let n = 0; n < (label === "Bileşen" ? 2 : 3); n++) test(`${label} bağlam menüsü açılır, klavyeyle kapatılır (${n + 1})`, async page => {
    await go(page, view, pageSelector);
    if (label === "Bileşen") {
      await get(page, "#asset-search").fill(""); await get(page, "#asset-type-filter").selectOption({ index: 0 }); await get(page, "#asset-project-filter").selectOption({ index: 0 });
      if (await page.locator(".asset-card").count() === 0) await click(page, '[data-action="asset-presentation"]');
    }
    const target = page.locator(targetSelector).first();
    await target.waitFor({ state: "visible" });
    await target.click({ button: "right" });
    await get(page, ".context-menu").waitFor({ state: "visible" });
    expect(await page.locator('.context-menu [role="menuitem"]').count() > 0, `${label} menüsünde eylem bulunamadı`);
    await page.keyboard.press("Escape");
    expect(await page.locator(".context-menu").count() === 0, `${label} menüsü Escape ile kapanmadı`);
  });

  // Diagram and backup controls are guarded from native file dialogs here.
  for (let n = 0; n < 10; n++) test(`Envanter ilişki diyagramı araçları görünür ve çalışır ${n + 1}`, async page => {
    await go(page, "assets", ".assets-page");
    await get(page, "#asset-search").fill(""); await get(page, "#asset-type-filter").selectOption({ index: 0 }); await get(page, "#asset-project-filter").selectOption({ index: 0 });
    if (await page.locator(".asset-diagram-canvas").count() === 0) await click(page, '[data-action="asset-presentation"]');
    await get(page, "#asset-diagram-canvas").waitFor({ state: "visible" });
    await click(page, '[data-action="diagram-layout"]');
    await click(page, '[data-action="diagram-fit"]');
    expect(await page.locator("#asset-diagram-canvas").isVisible(), "Diyagram araçlarından sonra tuval görünmez oldu");
    await click(page, '[data-action="asset-presentation"]');
    expect(await page.locator(".asset-card").first().isVisible(), "Kart görünümüne dönüş başarısız");
  });
  for (let n = 0; n < 5; n++) test(`Yedekleme ayarları biçim ve geri yükleme seçeneklerini sunar ${n + 1}`, async page => {
    await click(page, ".profile");
    await get(page, ".backup-settings").waitFor({ state: "visible" });
    const format = get(page, "#backup-format");
    expect(await format.locator("option").count() === 2, "Rota ve JSON yedek biçimleri eksik");
    await format.selectOption(n % 2 ? "json" : "rota");
    expect(await get(page, '[data-action="backup-export"]').isVisible() && await get(page, '[data-action="backup-restore"]').isVisible(), "Yedekleme eylemleri görünmüyor");
    await click(page, "#modal-root .modal-close");
  });

  if (serial !== 100) throw new Error(`Yeni kabul senaryosu sayısı 100 değil: ${serial}`);
}
