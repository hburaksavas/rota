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
    await page.locator(`.personal-${section} .personal-panel-heading button`).click();
    await page.locator('#quick-create-form [name="title"]').fill(title);
    await page.locator('#quick-create-form button[value="close"]').click();
    await page.locator(`.personal-${section} .personal-record-open`).filter({ hasText: title }).waitFor();
    assert.equal(await page.locator(`.personal-${section} .personal-panel-heading button svg`).count(), 1);
  }

  // Create a real question using the existing form; no fixture touches a user profile.
  await page.locator('.personal-questions [data-workspace-create="question"]').click();
  await page.locator('#open-question-form [name="text"]').fill("EFT son iptal saati nedir?");
  await page.locator('#open-question-form [name="owner"]').fill("Operasyon");
  await page.locator('#open-question-form button[type="submit"]').click();
  if (await page.locator("#workspace-shelf:visible").count()) await page.keyboard.press("Escape");

  const ids = {};
  for (const kind of ["task", "note", "question", "item"]) {
    const pin = page.locator(`.personal-grid [data-focus-kind="${kind}"]`).first();
    ids[kind] = await pin.getAttribute("data-focus-id");
    assert.equal((await pin.textContent()).trim(), "", "Pin control must contain only an icon");
    await pin.click();
    assert.equal(await page.locator(`.personal-grid [data-focus-kind="${kind}"][data-focus-id="${ids[kind]}"]`).getAttribute("aria-pressed"), "true");
  }
  assert.equal(await page.locator(".personal-focus-entry").count(), 4);

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
