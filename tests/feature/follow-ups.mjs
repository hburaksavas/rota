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
const stored = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
const panel = page.locator("#workspace-followups");
const taskTitle = "Takip edilecek görev";

try {
  await page.goto(pathToFileURL(fileURLToPath(new URL("../../index.html", import.meta.url))).href);
  await page.locator('#setup-form button[type="submit"]').click();
  await page.evaluate(key => {
    const workspace = JSON.parse(localStorage.getItem(key));
    workspace.teams = [{ id: "TEAM-TEST", name: "Ödeme", members: ["Deniz Kaya"] }];
    localStorage.setItem(key, JSON.stringify(workspace));
  }, key);
  await page.reload();
  await page.locator(".workspace-command-context").click();
  await panel.waitFor();
  await panel.getByText("Zamanı gelen takip yok.").waitFor();

  await page.locator('.personal-tasks textarea[name="message"]').fill(taskTitle);
  await page.locator('.personal-tasks textarea[name="message"]').press("Enter");
  const taskRow = page.locator(".personal-tasks .personal-row").filter({ hasText: taskTitle });
  await taskRow.waitFor();

  // Date follow-up on a task through the bell.
  await taskRow.locator("[data-followup-kind]").click();
  const form = page.locator("#followup-record-form");
  await form.waitFor();
  await form.locator('input[name="dueAt"]').fill("2020-01-01T09:00");
  await form.locator('button[type="submit"]').click();
  await form.waitFor({ state: "detached" });
  let data = await stored();
  assert.equal(data.followUps.length, 1);
  assert.equal(data.followUps[0].recordKind, "task");
  assert.equal(data.followUps[0].trigger, "date");
  const me = data.followUps[0].owner;
  assert.ok(me);
  assert.equal(await taskRow.locator(".followup-bell.is-active").count(), 1);
  await panel.locator(".followup-row").filter({ hasText: taskTitle }).getByText(/Tarih geldi/).waitFor();

  // Another person follows the same task with their own condition.
  await taskRow.locator("[data-followup-kind]").click();
  const owners = await form.locator('select[name="owner"] option').allTextContents();
  assert.ok(owners.length > 1, "Takım üyeleri takip eden olarak seçilebilmeli");
  await form.locator('select[name="owner"]').selectOption({ index: 1 });
  await form.locator('input[name="trigger"][value="update"]').check();
  assert.equal(await form.locator("[data-followup-date]").isHidden(), true);
  await form.locator('button[type="submit"]').click();
  await form.waitFor({ state: "detached" });
  data = await stored();
  assert.equal(data.followUps.length, 2);
  const other = data.followUps.find(entry => entry.owner !== me);
  assert.equal(other.trigger, "update");

  // Owner filter: mine shows one due; all people shows the waiting update follow-up.
  assert.equal(await panel.locator(".followup-row").count(), 1);
  await panel.locator("[data-followup-owner]").selectOption("*");
  await panel.locator('[data-followup-view="waiting"]').click();
  await panel.locator(".followup-row").filter({ hasText: "Kayıt güncellendiğinde" }).waitFor();

  // Updating the record makes the update follow-up due.
  await page.waitForTimeout(20);
  await taskRow.locator("[data-toggle-task]").click();
  await panel.locator('[data-followup-view="due"]').click();
  await panel.locator(".followup-row").filter({ hasText: /Kayıt güncellendi ·/ }).waitFor();
  assert.equal(await panel.locator(".followup-row").count(), 2);

  // Snooze the date follow-up, finish the update follow-up.
  const dateRow = panel.locator(".followup-row").filter({ hasText: /Tarih geldi/ });
  await dateRow.locator("[data-followup-snooze-toggle]").click();
  await panel.locator('[data-until="hour"]').click();
  await panel.locator(".followup-row").filter({ hasText: /Tarih geldi/ }).waitFor({ state: "detached" });
  data = await stored();
  assert.ok(Date.parse(data.followUps.find(entry => entry.owner === me).snoozedUntil) > Date.now());
  await panel.locator(".followup-row").filter({ hasText: /Kayıt güncellendi/ }).locator("[data-followup-done]").click();
  data = await stored();
  assert.ok(data.followUps.find(entry => entry.owner !== me).doneAt);
  await panel.getByText("Zamanı gelen takip yok.").waitFor();
  await panel.locator('[data-followup-view="waiting"]').click();
  await panel.locator(".followup-row").filter({ hasText: /Ertelendi/ }).waitFor();

  // Quick follow-up without a record, linked to a backlog item later.
  await panel.locator("[data-followup-quick]").click();
  const quick = page.locator("#followup-quick-form");
  await quick.locator('input[name="title"]').fill("Hazineden limit onayını sor");
  await quick.locator('input[name="dueAt"]').fill("2020-02-01T10:00");
  await quick.locator('button[type="submit"]').click();
  await quick.waitFor({ state: "detached" });
  await panel.locator('[data-followup-view="due"]').click();
  const quickRow = panel.locator(".followup-row").filter({ hasText: "Hazineden limit onayını sor" });
  await quickRow.getByText("Hızlı takip").waitFor();
  assert.equal(await quickRow.locator("[data-followup-item]").count(), 0);
  await quickRow.locator(".personal-record-open").click();
  const itemId = await quick.locator('select[name="linkedItemId"] option').nth(1).getAttribute("value");
  await quick.locator('select[name="linkedItemId"]').selectOption(itemId);
  await quick.locator('button[type="submit"]').click();
  await quick.waitFor({ state: "detached" });
  await quickRow.locator(`[data-followup-item="${itemId}"]`).waitFor();
  data = await stored();
  assert.equal(data.followUps.find(entry => entry.title === "Hazineden limit onayını sor").linkedItemId, itemId);

  // Panel can be hidden and restored like other workspace panels.
  await panel.locator('[data-dashboard-hide="followups"]').click();
  assert.equal(await panel.isHidden(), true);
  await page.locator('[popovertarget="dashboard-visibility"]').click();
  await page.locator('[data-dashboard-visible="followups"]').check();
  assert.equal(await panel.isVisible(), true);

  assert.deepEqual(errors, []);
  console.log("Kişisel takip testleri geçti.");
} finally {
  await browser.close();
}
