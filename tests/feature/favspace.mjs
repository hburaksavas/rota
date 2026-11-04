import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
const browser=await chromium.launch({headless:true,channel:'msedge'});
try {
const page=await browser.newPage({viewport:{width:1100,height:800}}); const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(pathToFileURL(process.cwd()+'/index.html').href);
await page.locator('#setup-form button[type="submit"]').click();
await page.locator('[data-view="favspace"]').click();
await page.locator('[data-fav="new"]').first().click();
await page.locator('.fav-editor [name="title"]').fill('Swagger test');
await page.locator('.fav-editor [name="url"]').fill('javascript:alert(1)');
await page.locator('.fav-editor button[type="submit"]').click();
assert.match(await page.locator('.fav-error').innerText(),/geçerli/);
await page.locator('.fav-editor [name="url"]').fill('https://example.com/docs');
await page.locator('.fav-editor [name="collection"]').fill('Test ortamları');
await page.locator('.fav-editor button[type="submit"]').click();
assert.equal(await page.locator('.fav-resource').count(),1);
await page.locator('[data-fav="pin"]').click();
await page.locator('#fav-search').fill('yok');assert.equal(await page.locator('.fav-resource').count(),0);
await page.locator('#fav-search').fill('Swagger');assert.equal(await page.locator('.fav-resource').count(),1);
await page.reload();await page.locator('[data-view="favspace"]').click();
assert.equal(await page.locator('.fav-resource').count(),1);
await page.locator('.fav-resource').click();
await page.locator('[data-fav="edit"]').click();
await page.locator('.fav-editor [name="title"]').fill('Güncel Swagger');
await page.locator('.fav-editor button[type="submit"]').click();
assert.match(await page.locator('.fav-resource').innerText(),/Güncel Swagger/);
const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('rota-po-workspace-v1')));
assert.equal(saved.favspace.resources[0].pinned,true);assert(saved.items.length>0);
for(const width of [990,1100,1440]) { await page.setViewportSize({width,height:800}); assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)); }
await page.locator('[data-fav="delete"]').click();
await page.locator('.app-dialog button[type="submit"]').click();
assert.equal(await page.locator('.fav-resource').count(),0);
// Source resources are derived without copying or mutating the original records.
await page.evaluate(() => {
 const key='rota-po-workspace-v1', state=JSON.parse(localStorage.getItem(key));
 state.favspace.enabled=false;
 state.notes.push({id:'FAV-NOTE',title:'Kaynak test notu',body:'[Rehber](https://example.org/guide) https://example.org/guide javascript:alert(1)',linked:state.items[0].id,updated:'Bugün',attachments:[{name:'Analiz.pdf',size:200,storedName:'fav-analysis.pdf'}]});
 state.items[0].description+=' https://example.org/backlog';
 state.items[0].activity=[{id:'FAV-ACT',kind:'comment',message:'https://example.org/activity',actor:'Test',occurredAt:new Date().toISOString(),attachments:[{name:'Akış.png',size:20,storedName:'fav-flow.png'}]}];
 state.productRules=[{id:'FAV-RULE',projectId:state.projects[0].id,title:'Kural',body:'https://example.org/rule',updatedAt:'Bugün'}];
 localStorage.setItem(key,JSON.stringify(state));
});
await page.reload();await page.locator('[data-view="favspace"]').click();
assert.equal(await page.locator('[data-fav="toggle"]').count(),0);
assert.equal(await page.locator('.fav-header .fav-toolbar').count(),1);
assert.equal(await page.locator('.fav-resource').count(),6);
assert.equal(await page.locator('.fav-resource').filter({hasText:'https://example.org/guide'}).count(),1);
await page.locator('.fav-resource').filter({hasText:'Analiz.pdf'}).click();
await page.locator('[data-open-file="fav-analysis.pdf"]').waitFor();
assert.equal(await page.locator('[data-open-file="fav-analysis.pdf"]').count(),1);
assert.equal(await page.locator('[data-fav="delete"]').count(),0);
await page.locator('[data-fav="pin"]').click();
await page.locator('[data-fav="source"]').click();
assert.match(await page.locator('#modal-root').innerText(),/Kaynak test notu/);
await page.locator('#modal-root .modal-close').first().click();
for(const dark of [false,true]) {
 await page.evaluate(d=>{document.body.classList.toggle('dark-theme',d);document.body.style.setProperty('--accent','#3aa57c');},dark);
 for(const width of [990,1100,1440]) {await page.setViewportSize({width,height:800});await page.waitForTimeout(450);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert(await page.locator('.fav-list').evaluate(e=>e.scrollWidth<=e.clientWidth));}
}
await page.reload();await page.locator('[data-view="favspace"]').click();await page.locator('[data-fav="pins"]').click();assert.equal(await page.locator('.fav-resource').count(),1);
await page.evaluate(()=>{const k='rota-po-workspace-v1',s=JSON.parse(localStorage.getItem(k));s.notes=s.notes.filter(n=>n.id!=='FAV-NOTE');localStorage.setItem(k,JSON.stringify(s));});
await page.reload();await page.locator('[data-view="favspace"]').click();
assert.equal(await page.locator('.fav-resource').count(),4);
assert.equal(await page.locator('.fav-resource').filter({hasText:'Analiz.pdf'}).count(),0);
// Native hover opens the animated drawer, cancellation never creates records.
await page.evaluate(()=>window.dispatchEvent(new CustomEvent('rota-file-hover')));
await page.locator('.fav-drop-overlay').waitFor();

await page.keyboard.press('Escape');assert.equal(await page.locator('.fav-drop-overlay').count(),0);
await page.evaluate(()=>window.dispatchEvent(new CustomEvent('rota-file-hover')));
await page.evaluate(()=>window.dispatchEvent(new CustomEvent('rota-file-hover-cancelled')));
assert.equal(await page.locator('.fav-drop-overlay').count(),0);
await page.evaluate(()=>window.dispatchEvent(new CustomEvent('rota-favspace-files',{detail:[{name:'Sunum.pptx',path:'C:\\Test\\Sunum.pptx'},{name:'Arşiv.zip',path:'C:\\Test\\Arşiv.zip'}]})));
assert.match(await page.locator('.fav-drop-status').innerText(),/2 dosya/);
await page.locator('[data-shortcut-cancel]').click();
assert.equal(await page.locator('.fav-resource').count(),6);
await page.evaluate(()=>window.dispatchEvent(new CustomEvent('rota-favspace-files',{detail:[{name:'Sunum.pptx',path:'C:\\Test\\Sunum.pptx'}]})));
assert.match(await page.locator('.fav-drop-status').innerText(),/zaten/);
await page.locator('[data-shortcut-cancel]').click();
await page.reload();await page.locator('[data-view="favspace"]').click();
await page.locator('.fav-resource').filter({hasText:'Sunum.pptx'}).click();
await page.evaluate(()=>{(window.rotaDesktop ??= {}).openFileShortcut=async path=>{window.__openedShortcut=path;};});
await page.locator('[data-fav="open-shortcut"]').click();
assert.match(await page.evaluate(()=>window.__openedShortcut),/Sunum.pptx$/);
assert.equal(await page.locator('[data-fav="edit"]').count(),0);
await page.evaluate(()=>{window.rotaDesktop.openFileShortcut=async()=>{throw new Error('missing');};});
await page.locator('[data-fav="open-shortcut"]').click();
assert.match(await page.locator('.fav-detail [role="alert"]').innerText(),/Taşınmış/);
await page.locator('[data-fav="delete"]').click();await page.locator('.app-dialog button[type="submit"]').click();
assert.equal(await page.locator('.fav-resource').count(),5);
// A real double click must survive the first click without reflowing the target away.
await page.evaluate(()=>{window.__shortcutOpens=0;window.__attachmentOpens=0;window.rotaDesktop.openFileShortcut=async()=>{window.__shortcutOpens++;};window.rotaDesktop.openAttachment=async()=>{window.__attachmentOpens++;return '';};});
const archiveCard=page.locator('.fav-resource').filter({hasText:'Arşiv.zip'});
await archiveCard.click();await page.waitForTimeout(500);
assert.equal(await page.evaluate(()=>window.__shortcutOpens),0);
await archiveCard.dblclick({delay:100});
assert.equal(await page.evaluate(()=>window.__shortcutOpens),1);
await archiveCard.focus();await archiveCard.press('Enter');
assert.equal(await page.evaluate(()=>window.__shortcutOpens),2);
await page.locator('.fav-resource').filter({hasText:'Akış.png'}).dblclick({delay:100});
assert.equal(await page.evaluate(()=>window.__attachmentOpens),1);

await page.locator('[data-view="backlog"]').click();
await page.evaluate(()=>window.dispatchEvent(new CustomEvent('rota-file-hover')));
assert.equal(await page.locator('.fav-drop-overlay').count(),0);
assert.deepEqual(errors,[]);console.log('Favspace: CRUD oluşturma, URL doğrulama, arama, sabitleme, yeniden yükleme, veri koruma ve 990/1100/1440 px kontrolleri geçti.');
} finally {await browser.close();}
