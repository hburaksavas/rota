import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{channel:'msedge'}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.setDefaultTimeout(7000);
const errors=[];page.on('pageerror',error=>errors.push(error.message));
const key='rota-po-workspace-v1';
const stored=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
const composer=()=>page.locator('.workspace-panel .workspace-message-composer');
const tab=kind=>page.locator(`[data-workspace-section="${kind}"]`);
try{
 await page.goto(pathToFileURL(fileURLToPath(new URL('../../index.html',import.meta.url))).href);
 await page.locator('#setup-form button[type="submit"]').click();
 await page.locator('.workspace-command-context').click();
 assert.equal(await page.locator('.workspace-panel > .personal-focus').count(),1);
 assert.equal(await page.locator('[data-workspace-section]').count(),3);
 assert.equal(await page.locator('[data-followup-view], [data-followup-kind], #workspace-followups, #workspace-panel-title, .unified-note-filters').count(),0);
 const titles={notes:'Sekmeli not',questions:'Sekmeli soru',tasks:'Sekmeli görev'};
 for(const [section,type] of [['notes','note'],['questions','question'],['tasks','task']]){
  await tab(section).click();
  assert.equal(await composer().locator('[name="kind"]').inputValue(),type);
  const before=(await stored())[section==='questions'?'openQuestions':section].length;
  await composer().locator('textarea').fill(titles[section]);
  await composer().locator('textarea').press('Shift+Enter');
  await composer().locator('textarea').pressSequentially('İkinci satır');
  await composer().locator('textarea').press('Enter');
  assert.equal((await stored())[section==='questions'?'openQuestions':section].length,before+1);
  await page.locator('.unified-note-row').filter({hasText:titles[section]}).waitFor();
  assert.ok((await page.locator('.unified-note-row').evaluateAll(rows=>rows.map(row=>row.dataset.recordKind))).every(kind=>kind===type));
  assert.equal(await composer().locator('textarea').inputValue(),'');
 }
 await tab('notes').click();await composer().locator('textarea').fill('Not taslağı');
 await tab('questions').click();await composer().locator('textarea').fill('Soru taslağı');
 await tab('notes').click();assert.equal(await composer().locator('textarea').inputValue(),'Not taslağı');
 await tab('questions').click();assert.equal(await composer().locator('textarea').inputValue(),'Soru taslağı');
 await composer().locator('textarea').fill('   ');const before=(await stored()).openQuestions.length;
 await composer().locator('textarea').press('Enter');assert.equal((await stored()).openQuestions.length,before);
 await tab('tasks').click();const task=page.locator('.unified-note-row').filter({hasText:titles.tasks});
 await task.locator('[data-toggle-task]').click();assert.equal(await task.locator('[data-toggle-task]').getAttribute('aria-label'),'Görevi yeniden aç');
 await page.reload();await page.locator('.workspace-command-context').click();
 for(const section of ['notes','questions','tasks']){await tab(section).click();await page.locator('.unified-note-row').filter({hasText:titles[section]}).waitFor();}
 await page.setViewportSize({width:780,height:720});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);
 console.log('PASS three tabs: inline creation, automatic kinds, independent drafts, completion, persistence, narrow layout');
}finally{await browser.close();}
