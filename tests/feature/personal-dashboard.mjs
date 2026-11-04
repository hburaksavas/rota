import assert from "node:assert/strict";
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";

const browser = await chromium.launch({ headless: true, ...(process.platform === "win32" ? { channel: "msedge" } : {}) });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.setDefaultTimeout(6000);
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const key = "rota-po-workspace-v1";
const dashboard = () => page.locator(".workspace-command-context").click();
const stored = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
const close = async () => {
  await page.locator("#modal-root .modal-close").first().click();
  if (await page.locator("#workspace-shelf:visible").count()) await page.keyboard.press("Escape");
};

try {
  await page.goto(pathToFileURL(fileURLToPath(new URL("../../index.html", import.meta.url))).href);
  await page.locator('#setup-form button[type="submit"]').click();
  await dashboard();
  await page.locator(".personal-grid").waitFor();
  assert.equal(await page.locator(".personal-grid > section").count(), 4);
  assert.equal(await page.locator(".personal-focus-entry").count(), 0);
  assert.equal(await page.locator('.primary-nav [data-view="overview"]').count(), 0);
  assert.equal(await page.locator(".workspace-tools").count(), 1);
  for (const [section, title] of [["tasks", "Kişisel test görevi"], ["notes", "Kişisel test notu"]]) {
    await page.locator(`.personal-${section} textarea[name="message"]`).fill(title);
    await page.locator(`.personal-${section} textarea[name="message"]`).press("Enter");
    assert.equal(await page.locator("#modal-root .modal").count(), 0);
    await page.locator(`.personal-${section} .personal-record-open`).filter({ hasText: title }).waitFor();
    assert.equal(await page.locator(`.personal-${section} .personal-panel-heading [data-message-focus] svg`).count(), 1);
  }

  // One message creates a question without owner, date or popup.
  await page.locator('.personal-questions textarea[name="message"]').fill("EFT son iptal saati nedir?");
  await page.locator('.personal-questions textarea[name="message"]').press("Shift+Enter");
  await page.locator('.personal-questions textarea[name="message"]').pressSequentially("Operasyonla netleştir");
  await page.locator('.personal-questions button[type="submit"]').click();
  assert.equal(await page.locator("#modal-root .modal").count(), 0);
  assert.equal((await stored()).openQuestions[0].owner, "");
  assert.match((await stored()).openQuestions[0].text, /\nOperasyonla netleştir/);
  const countBeforeBlank = (await stored()).tasks.length;
  await page.locator('.personal-tasks textarea').fill("   ");
  await page.locator('.personal-tasks textarea').press("Enter");
  assert.equal((await stored()).tasks.length, countBeforeBlank);
  await page.locator('.personal-tasks textarea').fill("");

  // Toolbar panels use the same inline composer and preserve per-kind drafts.
  await page.locator('.workspace-tools [data-workspace-panel="notes"]').click();
  await page.locator('#workspace-shelf textarea').fill("Panel notu\nİkinci satır");
  await page.locator('.workspace-tools [data-workspace-panel="tasks"]').click();
  await page.locator('#workspace-shelf textarea').fill("Panel görevi");
  await page.locator('.workspace-tools [data-workspace-panel="notes"]').click();
  assert.equal(await page.locator('#workspace-shelf textarea').inputValue(), "Panel notu\nİkinci satır");
  await page.locator('#workspace-shelf button[type="submit"]').click();
  assert.equal((await stored()).notes[0].body, "Panel notu\nİkinci satır");
  assert.equal(await page.locator('#workspace-shelf textarea').inputValue(), "");
  assert.equal(await page.locator("#modal-root .modal").count(), 0);
  await page.keyboard.press("Escape");

  // Empty composers hide send; backlog filters and creates actual work items inline.
  const backlogPanel = page.locator('.personal-critical');
  assert.match(await backlogPanel.locator('h2').innerText(), /Backlog işleri/);
  assert.equal(await backlogPanel.locator('button[type="submit"]').isVisible(), false);
  await backlogPanel.locator('textarea').fill("   ");
  assert.equal(await backlogPanel.locator('button[type="submit"]').isVisible(), false);
  await backlogPanel.locator('textarea').fill("Yeni ödeme kontrolü");
  assert.equal(await backlogPanel.locator('button[type="submit"]').isVisible(), true);
  for (const priority of ["Kritik", "Yüksek", "Orta", "Düşük"]) {
    await backlogPanel.locator('.personal-priority-trigger').click();
    await page.locator('#dashboard-priority-popover').waitFor({ state: "visible" });
    await page.locator(`#dashboard-priority-popover input[value="${priority}"]`).check();
    assert.equal(await backlogPanel.locator('textarea').inputValue(), "Yeni ödeme kontrolü");
    const ids = await backlogPanel.locator('[data-open-item]').evaluateAll(nodes => nodes.map(node => node.dataset.openItem));
    const state = await stored();
    assert.ok(ids.every(id => state.items.find(item => item.id === id).priority === priority));
  }
  await backlogPanel.locator('button[type="submit"]').click();
  const createdItem = (await stored()).items.find(item => item.title === "Yeni ödeme kontrolü");
  assert.equal(createdItem.priority, "Düşük");
  assert.equal(createdItem.status, "Yeni");
  await backlogPanel.locator(`[data-open-item="${createdItem.id}"]`).waitFor();
  assert.equal(await backlogPanel.locator('button[type="submit"]').isVisible(), false);
  assert.equal(await page.locator('#modal-root .modal').count(), 0);
  await backlogPanel.locator('.personal-priority-trigger').click();
  await page.keyboard.press("Escape");
  assert.equal(await page.locator('#dashboard-priority-popover').isVisible(), false);
  await backlogPanel.locator('.personal-priority-trigger').click();
  await page.locator('#dashboard-priority-popover input[value=""]').check();

  const ids = {};
  for (const kind of ["task", "note", "question", "item"]) {
    const pin = page.locator(`.personal-grid [data-focus-kind="${kind}"]`).first();
    ids[kind] = await pin.getAttribute("data-focus-id");
    assert.equal((await pin.textContent()).trim(), "", "Pin control must contain only an icon");
    await pin.click();
    assert.equal(await page.locator(`.personal-grid [data-focus-kind="${kind}"][data-focus-id="${ids[kind]}"]`).getAttribute("aria-pressed"), "true");
  }
  assert.equal(await page.locator(".personal-focus-entry").count(), 4);

  // Search updates only the selected panel, without replacing its open popover.
  for (const kind of ["tasks", "notes", "questions", "items", "focus"]) {
    const trigger = page.locator(`[data-panel-search-trigger="${kind}"]`);
    const panel = page.locator(kind === "focus" ? '.personal-focus' : kind === "items" ? '.personal-critical' : '.personal-' + kind);
    const otherVisible = await page.locator('[data-panel-search-text]:visible').count() - await panel.locator('[data-panel-search-text]:visible').count();
    await trigger.click();
    const input = page.locator(`[data-panel-search="${kind}"]`);
    await input.fill("eşleşmeyen-arama-12345");
    assert.equal(await panel.locator('[data-panel-search-text]:visible').count(), 0);
    assert.equal(await page.locator('[data-panel-search-text]:visible').count(), otherVisible);
    assert.equal(await input.isVisible(), true);
    await page.keyboard.press("Escape");
    assert.equal(await input.isVisible(), false);
    await trigger.click();
    assert.equal(await input.inputValue(), "eşleşmeyen-arama-12345");
    await input.fill("");
    assert.ok(await panel.locator('[data-panel-search-text]:visible').count() > 0);
    const firstText = await panel.locator('[data-panel-search-text]').first().getAttribute('data-panel-search-text');
    await input.fill(firstText.split(" ")[0]);
    assert.ok(await panel.locator('[data-panel-search-text]:visible').count() > 0);
    await input.fill("");
    await page.keyboard.press("Escape");
  }

  await page.reload();
  await dashboard();
  assert.equal(await page.locator(".personal-focus-entry").count(), 4, "Focus must survive reload");
  for (const [kind, selector] of [["task", ".task-detail-modal"], ["note", ".note-modal"], ["question", "#open-question-form"], ["item", ".detail-modal"]]) {
    const row = page.locator(".personal-focus-entry").filter({ has: page.locator(`[data-focus-kind="${kind}"]`) });
    await row.locator(".personal-record-open").click();
    await page.locator(selector).waitFor();
    await close();
  }

  const before = await stored();
  await page.locator('.personal-focus-entry [data-focus-kind="note"]').click();
  assert.equal(await page.locator(".personal-focus-entry").count(), 3);
  assert.deepEqual((await stored()).notes, before.notes, "Removing focus must preserve the original note");
  await page.locator(`.personal-grid [data-focus-kind="note"][data-focus-id="${ids.note}"]`).click();
  assert.equal(await page.locator(".personal-focus-entry").count(), 4);

  // Complete the selected task and answer the selected question. Focus keeps the live record.
  await page.locator(".personal-tasks .personal-row").filter({ has: page.locator(`[data-focus-id="${ids.task}"]`) }).locator(".personal-task-check").click();
  assert.match(await page.locator(".personal-focus-entry").filter({ has: page.locator('[data-focus-kind="task"]') }).innerText(), /Tamamlandı/);
  await page.locator('.personal-questions [data-action="answer-open-question"]').first().click();
  await page.locator('#open-question-answer-form [name="answer"]').fill("Saat 17.00");
  await page.locator('#open-question-answer-form button[type="submit"]').click();
  if (await page.locator("#workspace-shelf:visible").count()) await page.keyboard.press("Escape");
  assert.match(await page.locator(".personal-focus-entry").filter({ has: page.locator('[data-focus-kind="question"]') }).innerText(), /Yanıtlandı/);

  // Maximize keeps the exact panel node, draft and saved layout; Escape restores it.
  const layoutBeforeMaximize = (await stored()).dashboardLayout;
  for (const kind of ["tasks", "notes", "questions", "items", "focus"]) {
    const panel = page.locator(kind === "focus" ? '.personal-focus' : `[data-dashboard-panel="${kind}"]`);
    await panel.evaluate(node => { window.originalPanel = node; });
    if (kind !== "focus") await panel.locator('textarea').fill("Korunan mesaj taslağı");
    await panel.locator('[data-dashboard-maximize]').click();
    assert.equal(await panel.evaluate(node => node === window.originalPanel), true);
    assert.equal(await page.locator('.is-panel-maximized').count(), 1);
    assert.ok((await panel.boundingBox()).height > 400);
    assert.equal(await panel.locator('[data-dashboard-maximize]').getAttribute('aria-label'), "Paneli küçült");
    if (kind !== "focus") assert.equal(await panel.locator('textarea').inputValue(), "Korunan mesaj taslağı");
    if (kind === "notes") await panel.locator('[data-dashboard-maximize]').click();
    else await page.keyboard.press("Escape");
    assert.equal(await page.locator('.is-panel-maximized').count(), 0);
    if (kind !== "focus") await panel.locator('textarea').fill("");
  }
  assert.deepEqual((await stored()).dashboardLayout, layoutBeforeMaximize);

  assert.equal(await page.locator("[data-dashboard-reset]").isVisible(), false);
  // Real drag and pointer resizing persist independently of the fixed focus panel.
  assert.equal(await page.locator('.personal-focus .dashboard-panel-grip, .personal-focus .dashboard-panel-resize').count(), 0);
  const order = () => page.locator('.personal-grid > section').evaluateAll(nodes => nodes.map(node => node.dataset.dashboardPanel));
  await page.locator('.personal-tasks .dashboard-panel-grip').dragTo(page.locator('.personal-notes .personal-panel-heading'));
  assert.deepEqual(await order(), ["notes", "tasks", "questions", "items"]);
  assert.equal(await page.locator("[data-dashboard-reset]").isVisible(), true);
  const taskPanel = page.locator('.personal-tasks');
  const originalSize = await taskPanel.boundingBox();
  const handle = await taskPanel.locator('.dashboard-panel-resize').boundingBox();
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
  await page.mouse.down();
  await page.mouse.move(handle.x + handle.width / 2 + 100, handle.y + handle.height / 2 + 70, { steps: 10 });
  await page.mouse.up();
  const larger = await taskPanel.boundingBox();
  assert.ok(larger.width > originalSize.width + 50);
  assert.ok(larger.height > originalSize.height + 50);
  const savedLayout = (await stored()).dashboardLayout;
  await page.reload(); await dashboard();
  assert.deepEqual(await order(), ["notes", "tasks", "questions", "items"]);
  assert.deepEqual((await stored()).dashboardLayout, savedLayout);
  assert.equal(Math.round((await taskPanel.boundingBox()).height), Math.round(larger.height));
  await taskPanel.locator('.dashboard-panel-resize').focus();
  await page.keyboard.press("ArrowUp");
  assert.equal(Math.round((await taskPanel.boundingBox()).height), Math.round(larger.height - 20));
  await page.locator('[data-dashboard-reset]').click();
  assert.equal(await page.locator("[data-dashboard-reset]").isVisible(), false);
  assert.deepEqual(await order(), ["tasks", "notes", "questions", "items"]);

  for (const dark of [false, true]) {
    await page.evaluate(dark => document.body.classList.toggle("dark-theme", dark), dark);
    for (const width of [1440, 1100, 990]) {
      await page.setViewportSize({ width, height: 800 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.documentElement.scrollHeight > innerHeight), false, `Page overflow at ${width}px`);
      assert.equal(await page.locator(".personal-dashboard-body").evaluate(element => element.scrollWidth > element.clientWidth), false);
    }
  }

  // Saved references may outlive deleted records; they must not break rendering.
  await page.evaluate(key => {
    const state = JSON.parse(localStorage.getItem(key));
    state.notes = [];
    state.dailyFocus.push({ kind: "bad", date: "invalid", id: "bad" });
    localStorage.setItem(key, JSON.stringify(state));
  }, key);
  await page.reload(); await dashboard();
  assert.equal(await page.locator(".personal-focus-entry").count(), 3);
  assert.equal((await stored()).tasks.length, before.tasks.length);

  await page.evaluate(key => {
    const state = JSON.parse(localStorage.getItem(key));
    state.dailyFocus = state.dailyFocus.map(entry => ({ ...entry, date: "2000-01-01" }));
    localStorage.setItem(key, JSON.stringify(state));
  }, key);
  await page.reload(); await dashboard();
  assert.equal(await page.locator(".personal-focus-entry").count(), 0, "Past focus must not appear as today's selection");
  assert.deepEqual(errors, []);
  console.log("PASS: dört kayıt türü, ikon eylemleri, kalıcılık, kayıt açma, odaktan çıkarma, görev/soru güncelleme, gün sınırı, geçersiz referanslar, tema ve taşma.");
} finally {
  await context.close();
  await browser.close();
}
