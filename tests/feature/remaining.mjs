import { chromium } from 'playwright';
import { build } from 'esbuild';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import assert from 'node:assert/strict';
const host = await fs.readFile('scripts/start-node-webview.mjs','utf8');
const requestSource = host.slice(host.indexOf('const jiraRequest ='),host.indexOf('const jiraFields ='));
const request204 = new Function('validateJira','keyring','fetch',requestSource+'return jiraRequest;')(base=>new URL(base),{getPassword:()=> 'test-only'},async()=>({status:204,ok:true,text:async()=>{throw new Error('204 gövdesi okunmamalı');}}));
assert.equal(await request204('https://jira.example.test','/rest/api/2/issue/TEST-1','PUT',{fields:{summary:'test'}}),null);
const source = await fs.readFile('src/app.ts', 'utf8');
const bundle = await build({ stdin: { contents: source + '\nwindow.testApi = { get state(){return state}, get context(){return {view:activeView,project:activeProjectId,query}}, setProject, setQuery(value){query=value}, clearProject(){activeProjectId=null}, openNewModal, persistCurrentFormDraft, restoreFormDraft, openBacklogExcelImport, confirmBacklogExcelImport, openBulkImpactPreview, applyBulkImpactPreview, get selected(){return selectedBacklogItemIds}, openItem, setView, openWorkspaceSettings, openRiskEditor, openRiskCenter, openDiagnostics, structuredTextMarkup, save, updateBacklogRows, getDailyPlan, openLinkedJira, applyLinkedJira, openRecordEditor, renderDailyPlan, undoLastDeletion, confirmMergeWorkItem, openMergeWorkItem, renderEmailDestination, attachEmailToExisting, applyWorkStatus, setAppZoom, openQuickCreateModal, openInlineBacklogEdit, moveBoardItem, openWorkTemplateEditor, checkFollowUpReminders, prepareEmail(source){pendingDroppedEmailSource=source;}, get assignments(){return getWorkAssignments(state.items[0])} };', resolveDir: process.cwd() + '/src', loader:'ts' }, bundle:true, write:false, format:'iife', platform:'browser', target:'es2022' });
const server = createServer(async(req,res)=>{try { const file = req.url === '/' ? 'index.html' : decodeURIComponent(req.url.slice(1)); const body = file === 'dist/renderer/app.js' ? bundle.outputFiles[0].contents : await fs.readFile(file); res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html'); res.end(body); } catch {res.statusCode=404;res.end();}}).listen(0,'127.0.0.1');
await new Promise(r=>server.once('listening',r));
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage({viewport:{width:1366,height:768}});
page.setDefaultTimeout(10000);
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{window.rotaDesktop={getAutomaticBackupDirectory:async()=>'', removeAttachment:async()=>true,pickAttachments:async()=>[{name:"inline-test.txt",size:4,storedName:"inline-test.txt"}], jiraHasToken:async()=>false,jiraGetIssue:async()=>({issue:{key:'TEST-1',summary:'Jira başlık',status:'Open',updated:'v1'},transitions:[]}),jiraUpdateLinkedIssue:async()=>{window.jiraWrites=(window.jiraWrites||0)+1;},importSelectedEmailAttachments:async()=>[], pickBacklogExcelImport:async()=>({filename:'test.xlsx',fingerprint:'test-hash',rows:[],sheets:[{name:'İşler',rows:[['Başlık','Açıklama','Hedef tarih','Tür'],['Yeni iş','Detay','2026-12-04','Task'],['','Eksik','hatalı','Bug'],['Yanlış tarih','Detay','2026-02-30','Story']]}]}),getDiagnostics:async()=>({host:'test'}),exportUnreadableWorkspace:async()=>null};});
try {
 await page.goto(`http://127.0.0.1:${server.address().port}`); await page.waitForFunction(()=>window.testApi);
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';testApi.setView('backlog');});
 for (const zoom of [0.5,0.75,0.9,1,1.1,1.25,1.5,2]) {
  await page.evaluate(value=>testApi.setAppZoom(value),zoom);
  for (const view of ['roadmap','backlog']) {
   await page.evaluate(value=>testApi.setView(value),view);
   await page.waitForTimeout(550);
   const drift=await page.evaluate(()=>{
    const active=document.querySelector('.primary-nav .nav-item.active').getBoundingClientRect();
    const pill=document.querySelector('.nav-active-pill').getBoundingClientRect();
    return Math.max(...['left','top','width','height'].map(key=>Math.abs(active[key]-pill[key])));
   });
   assert.ok(drift<1, `Menü vurgusu %${zoom*100} / ${view}: ${drift}px kaydı`);
  }
 }
 await page.evaluate(()=>testApi.setAppZoom(1));
 for (const zoom of [0.75,1,1.25]) {
  await page.evaluate(value=>{testApi.setAppZoom(value);document.querySelectorAll('.nav-group').forEach(group=>group.open=false);},zoom);
  await page.waitForTimeout(400);
  assert.equal(await page.locator('.nav-active-pill.visible').count(),0,'Kapalı menü grubunun vurgusu boş kutu bırakmamalı');
  await page.evaluate(()=>{document.querySelector('.nav-item.active').closest('details').open=true;});
  await page.waitForTimeout(650);
  assert.equal(await page.locator('.nav-active-pill.visible').count(),1);
  const drift=await page.evaluate(()=>{const active=document.querySelector('.nav-item.active').getBoundingClientRect();const pill=document.querySelector('.nav-active-pill').getBoundingClientRect();return Math.max(Math.abs(active.top-pill.top),Math.abs(active.height-pill.height));});
  assert.ok(drift<1,'Grup yeniden açılınca vurgu seçili satıra dönmeli');
 }
 await page.evaluate(()=>testApi.setAppZoom(1));
 assert.equal(await page.locator('[data-view="focus"]').count(),0);assert.equal(await page.locator('.workspace-tools [data-workspace-create]').count(),3);
 const workspaceContext=await page.evaluate(()=>{testApi.setProject(testApi.state.projects[0].id);testApi.setQuery('transfer');testApi.updateBacklogRows();return testApi.context;});
 assert.equal(await page.locator('.primary-nav [data-view="questions"]').count(),0);
 const initialQuestions=await page.evaluate(()=>JSON.parse(JSON.stringify(testApi.state.openQuestions||[])));
 await page.locator('.workspace-tools [data-workspace-panel="questions"]').click();
 await page.locator('.workspace-shelf-add').click();
 await page.locator('#open-question-form [name="text"]').fill('Toolbar karar sorusu');
 await page.locator('#open-question-form [name="owner"]').fill('Operasyon');
 await page.locator('#open-question-form [name="expectedAt"]').fill('2020-01-01');
 await page.locator('#open-question-form [name="linkedItemId"]').selectOption('PAY-241');
 await page.locator('#open-question-form button[type="submit"]').click();
 assert.deepEqual(await page.evaluate(()=>testApi.context),workspaceContext);
 await page.locator('#workspace-shelf-search').fill('Toolbar karar sorusu');
 assert.equal(await page.locator('.workspace-question-row').count(),1);
 assert.equal(await page.locator('.workspace-question-row.is-overdue').count(),1);
 assert.match(await page.locator('.workspace-question-link').innerText(),/PAY-241/);
 await fs.mkdir(process.env.TEMP+'/rota-feature-review',{recursive:true});
 for (const dark of [false,true]) {
  await page.evaluate(value=>document.body.classList.toggle('dark-theme',value),dark);
  await page.screenshot({path:process.env.TEMP+'/rota-feature-review/questions-'+(dark?'dark':'light')+'.png'});
 }
 await page.evaluate(()=>document.body.classList.remove('dark-theme'));

 await page.locator('.workspace-question-action[data-action="edit-open-question"]').click();
 await page.locator('#open-question-form [name="owner"]').fill('Ürün ekibi');
 await page.locator('#open-question-form button[type="submit"]').click();
 await page.locator('#workspace-shelf-search').fill('Toolbar karar sorusu');
 await page.locator('.workspace-question-action[data-action="answer-open-question"]').click();
 await page.locator('#open-question-answer-form [name="answer"]').fill('Limit onaylandı');
 await page.locator('#open-question-answer-form button[type="submit"]').click();
 assert.deepEqual(await page.evaluate(()=>testApi.context),workspaceContext);
 assert.equal(await page.locator('#workspace-question-filter').inputValue(),'answered');
 await page.locator('#workspace-shelf-search').fill('Toolbar karar sorusu');
 assert.equal(await page.locator('.workspace-question-answer').innerText(),'Limit onaylandı');
 await page.locator('.workspace-question-action[data-action="reopen-question"]').click();
 await page.locator('#workspace-shelf-search').fill('Toolbar karar sorusu');
 assert.equal(await page.locator('#workspace-question-filter').inputValue(),'open');
 page.once('dialog',dialog=>dialog.accept());
 await page.locator('.workspace-question-action[data-action="delete-open-question"]').click();
 assert.deepEqual(await page.evaluate(()=>testApi.state.openQuestions||[]),initialQuestions);
 assert.deepEqual(await page.evaluate(()=>testApi.context),workspaceContext);
 await page.keyboard.press('Escape');
 const initialTasks=await page.evaluate(()=>testApi.state.tasks.map(task=>task.id));const initialNotes=await page.evaluate(()=>testApi.state.notes.map(note=>note.id));
 await page.locator('.workspace-tools [data-workspace-create="task"]').click();assert.equal(await page.locator('#quick-create-form [name="kind"]').inputValue(),'Kişisel görev');await page.locator('#quick-create-form [name="title"]').fill('Çalışma alanı görevi');await page.locator('#quick-create-form [name="description"]').fill('Toolbar üzerinden eklendi');await page.locator('#quick-create-form button[value="close"]').click();
 assert.deepEqual(await page.evaluate(()=>testApi.context),workspaceContext);assert.ok(await page.evaluate(()=>testApi.state.tasks.some(task=>task.title==='Çalışma alanı görevi')));
 await page.locator('.workspace-tools [data-workspace-panel="tasks"]').click();await page.locator('#workspace-shelf-search').fill('Çalışma alanı görevi');assert.equal(await page.locator('.workspace-record-row').count(),1);await page.locator('.workspace-task-toggle').click();assert.equal(await page.locator('.workspace-record-row').count(),0);await page.locator('#workspace-show-completed').check();assert.equal(await page.locator('.workspace-record-row.is-done').count(),1);await page.locator('.workspace-record-open').click();assert.equal(await page.locator('.task-detail-modal').count(),1);assert.equal(await page.locator('#workspace-shelf').isVisible(),false);await page.locator('.modal-close').click();
 assert.equal(await page.locator('.workspace-tools [data-workspace-panel="tasks"]').evaluate(node=>document.activeElement===node),true);
 await page.locator('.workspace-tools [data-workspace-create="note"]').click();await page.locator('#quick-create-form [name="title"]').fill('Çalışma alanı notu');await page.locator('#quick-create-form [name="description"]').fill('Genel çalışma alanından ulaşılabilen not');await page.locator('#quick-create-form button[value="close"]').click();assert.deepEqual(await page.evaluate(()=>testApi.context),workspaceContext);
 await page.locator('.workspace-tools [data-workspace-panel="notes"]').click();await page.locator('#workspace-shelf-search').fill('Çalışma alanı notu');assert.equal(await page.locator('.workspace-record-row').count(),1);await page.locator('.workspace-record-open').click();assert.equal(await page.locator('.note-modal').count(),1);await page.locator('.modal-close').click();
 await page.locator('.workspace-tools [data-workspace-create="note"]').click();await page.locator('#quick-create-form [name="title"]').fill('Ayrıntılı çalışma notu');await page.locator('#quick-create-form [name="description"]').fill('Ayrıntılı form da aynı çalışma alanında kalır');await page.locator('[data-action="expand-create-form"]').click();assert.equal(await page.locator('#new-kind').inputValue(),'Not');await page.locator('#new-form button[type="submit"]').click();assert.deepEqual(await page.evaluate(()=>testApi.context),workspaceContext);assert.ok(await page.evaluate(()=>testApi.state.notes.some(note=>note.title==='Ayrıntılı çalışma notu')));
 await page.locator('.workspace-tools [data-workspace-panel="notes"]').click();await page.locator('#workspace-shelf-search').fill('Ayrıntılı çalışma notu');await page.locator('.workspace-record-convert').click();assert.ok(await page.evaluate(()=>testApi.state.tasks.some(task=>task.title==='Ayrıntılı çalışma notu'&&task.description==='Ayrıntılı form da aynı çalışma alanında kalır')));assert.deepEqual(await page.evaluate(()=>testApi.context),workspaceContext);await page.keyboard.press('Escape');
 assert.ok(await page.evaluate(ids=>ids.every(id=>testApi.state.tasks.some(task=>task.id===id)),initialTasks));assert.ok(await page.evaluate(ids=>ids.every(id=>testApi.state.notes.some(note=>note.id===id)),initialNotes));
 await page.locator('.workspace-tools [data-workspace-create="item"]').click();assert.equal(await page.locator('#quick-create-form [name="kind"]').inputValue(),'Backlog işi');await page.locator('.modal-close').click();
 await page.locator('.workspace-tools [data-workspace-create="item"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.workspace-tools [data-workspace-create="task"]').evaluate(node=>document.activeElement===node),true);
 await fs.mkdir(process.env.TEMP+'/rota-feature-review',{recursive:true});
 for(const theme of ['light','dark']) {
  await page.evaluate(t=>document.body.classList.toggle('dark-theme',t==='dark'),theme);await page.locator('.workspace-tools [data-workspace-panel="notes"]').click();await page.mouse.move(0,0);await page.waitForTimeout(300);
  assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.workspace-record-row')].every(row=>{const rect=row.getBoundingClientRect();const shelf=document.getElementById('workspace-shelf').getBoundingClientRect();const y=rect.top+rect.height/2;return y>=shelf.bottom||Boolean(document.elementFromPoint(rect.left+rect.width/2,y)?.closest('#workspace-shelf'));})), 'Kayıt panelinin üstünü backlog başlığı kapatmamalı');
  await page.screenshot({path:process.env.TEMP+'/rota-feature-review/toolbar-'+theme+'.png'});await page.keyboard.press('Escape');assert.equal(await page.locator('#workspace-shelf').isVisible(),false);
 }
 await page.setViewportSize({width:1024,height:768});await page.evaluate(()=>testApi.setAppZoom(1.25));await page.locator('.workspace-tools [data-workspace-panel="tasks"]').click();
 const toolbarBounds=await page.locator('.workspace-tools').evaluate(node=>{const rect=node.getBoundingClientRect();return {right:rect.right,width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth};});assert.ok(toolbarBounds.right<=toolbarBounds.width);assert.equal(toolbarBounds.overflow,false);
 await page.mouse.move(0,0);await page.waitForTimeout(300);await page.screenshot({path:process.env.TEMP+'/rota-feature-review/toolbar-narrow.png'});await page.keyboard.press('Escape');await page.evaluate(()=>testApi.setAppZoom(1));await page.setViewportSize({width:1366,height:768});
 await page.evaluate(()=>{testApi.clearProject();testApi.setQuery('');testApi.setView('backlog');});
 await page.evaluate(()=>testApi.openBacklogExcelImport());
 assert.equal(await page.locator('[data-import-row]:enabled').count(),1);
 assert.equal(await page.locator('[data-import-row]:disabled').count(),2);
 const before=await page.evaluate(()=>testApi.state.items.length);
 await page.locator('[data-action="confirm-backlog-import"]').click();
 assert.equal(await page.evaluate(()=>testApi.state.items.length),before+1);
 await page.evaluate(()=>testApi.openBacklogExcelImport());
 assert.equal(await page.locator('[data-import-row]:checked').count(),0);
 await page.evaluate(()=>testApi.openNewModal());
 await page.locator('#new-title-input').fill('Kurtarılacak taslak');
 await page.evaluate(()=>testApi.persistCurrentFormDraft());
 await page.reload(); await page.waitForFunction(()=>window.testApi);
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';testApi.openNewModal();});
 await page.locator('[data-action="restore-form-draft"]').click();
 assert.equal(await page.locator('#new-title-input').inputValue(),'Kurtarılacak taslak');
 await page.locator('.modal-close').click();
 assert.equal(await page.evaluate(()=>testApi.state.formDrafts.length),0);
 await page.evaluate(()=>{testApi.setView('backlog');testApi.openItem(testApi.state.items[0].id);});
 for (const width of [1366,1024]) {
  await page.setViewportSize({width,height:768});
  await page.evaluate(()=>{localStorage.setItem('rota-detail-panel','false');testApi.openItem(testApi.state.items[0].id);});
  assert.equal(await page.locator('.detail-modal-sidepanel').count(),1);
  assert.equal(await page.locator('[data-action="toggle-detail-panel"]').count(),0);
  assert.equal(await page.locator('.detail-body').evaluate(node=>getComputedStyle(node).gridTemplateColumns.split(' ').length),1);
 }
 await page.setViewportSize({width:1366,height:768});
 await page.evaluate(()=>{testApi.openItem(testApi.state.items[0].id);window.originalDetailPanel=document.querySelector('.detail-modal');});
 await page.waitForTimeout(450);
 const centered=await page.locator('.detail-modal').evaluate(node=>{const rect=node.getBoundingClientRect();return Math.abs(rect.left+rect.width/2-innerWidth/2)<2;});assert.ok(centered);
 assert.equal(await page.locator('.detail-modal [data-action="edit-item"]').count(),0);
 assert.equal(await page.locator('.detail-property-group').count(),3);assert.equal(await page.locator('.detail-property-group[open]').count(),0);
 assert.equal(await page.locator('.detail-footer .privacy-note-inline').count(),0);assert.equal(await page.locator('.detail-footer button').filter({hasText:'Arşivle'}).count(),0);

 const initialRecord=await page.locator('.detail-modal').getAttribute('data-open-item');
 await page.evaluate(()=>{window.originalDetailBackdrop=document.querySelector('.detail-backdrop-sidepanel');window.panelOpeningAnimations=0;window.originalDetailPanel.addEventListener('animationstart',event=>{if(event.target===window.originalDetailPanel)window.panelOpeningAnimations++;});});
 const nextRecord=await page.locator('[data-detail-nav="next"]').getAttribute('data-open-item');
 await page.locator('[data-detail-nav="next"]').click();assert.equal(await page.locator('.detail-modal').getAttribute('data-open-item'),nextRecord);
 assert.ok(await page.evaluate(()=>document.querySelector('.detail-modal')===window.originalDetailPanel&&document.querySelector('.detail-backdrop-sidepanel')===window.originalDetailBackdrop));
 assert.equal(await page.locator('.detail-body').evaluate(node=>getComputedStyle(node).animationName),'detail-record-next-in');
 assert.equal(await page.locator('[data-detail-nav="next"]').evaluate(node=>document.activeElement===node),true);
 await page.locator('[data-detail-nav="previous"]').click();assert.equal(await page.locator('.detail-modal').getAttribute('data-open-item'),initialRecord);assert.equal(await page.locator('.detail-body').evaluate(node=>getComputedStyle(node).animationName),'detail-record-previous-in');
 assert.equal(await page.locator('[data-detail-nav="previous"]').isDisabled(),true);
 await page.locator('[data-detail-tab="activity"]').click();await page.locator('[data-detail-nav="next"]').click();assert.equal(await page.locator('[data-detail-tab="activity"].selected').count(),1);await page.locator('[data-detail-nav="previous"]').click();
 await page.locator('[data-detail-tab="overview"]').click();
 for(let index=0;index<3;index++)await page.locator('[data-detail-nav="next"]').click();
 for(let index=0;index<3;index++)await page.locator('[data-detail-nav="previous"]').click();
 assert.equal(await page.locator('.detail-modal').getAttribute('data-open-item'),initialRecord);assert.equal(await page.locator('.detail-footer-nav button').count(),2);assert.equal(await page.locator('[data-action="linked-jira"]').count(),1);
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-detail-nav="next"]').click();assert.equal(await page.locator('.detail-body').evaluate(node=>getComputedStyle(node).animationName),'none');await page.locator('[data-detail-nav="previous"]').click();await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('[data-detail-edit="title"]').click();await page.locator('[data-detail-input]').fill('');await page.locator('[data-detail-nav="next"]').click();assert.equal(await page.locator('.detail-modal').getAttribute('data-open-item'),initialRecord);assert.equal(await page.locator('.detail-inline-editor').count(),1);await page.locator('[data-detail-cancel]').click();
 await page.locator('[data-detail-edit="title"]').click();await page.locator('[data-detail-input]').fill('Geçişten önce kaydedildi');await page.locator('[data-detail-nav="next"]').click();assert.equal(await page.evaluate(id=>testApi.state.items.find(item=>item.id===id).title,initialRecord),'Geçişten önce kaydedildi');await page.locator('[data-detail-nav="previous"]').click();
 assert.equal(await page.evaluate(()=>window.panelOpeningAnimations),0);assert.ok(await page.evaluate(()=>document.querySelector('.detail-modal')===window.originalDetailPanel));
 await page.locator('[data-detail-edit="title"]').click();await page.locator('[data-detail-input]').fill('Panel içinde yeni başlık');await page.locator('[data-detail-input]').press('Enter');
 assert.equal(await page.evaluate(()=>testApi.state.items[0].title),'Panel içinde yeni başlık');assert.ok(await page.evaluate(()=>document.querySelector('.detail-modal')===window.originalDetailPanel));
 await page.locator('[data-detail-edit="title"]').click();await page.locator('[data-detail-input]').fill('');await page.locator('[data-detail-commit]').click();assert.equal(await page.locator('[data-detail-input]').count(),1);assert.ok((await page.locator('.detail-inline-error').textContent()).length>0);
 await page.locator('[data-detail-cancel]').click();assert.equal(await page.evaluate(()=>testApi.state.items[0].title),'Panel içinde yeni başlık');
 await page.locator('[data-detail-edit="description"]').click();await page.locator('[data-detail-input]').fill('Güncellenen bağlam');await page.locator('[data-detail-input]').press('Control+Enter');
 assert.equal(await page.evaluate(()=>testApi.state.items[0].description),'Güncellenen bağlam');
 await page.locator('[data-detail-group="properties"] > summary').click();
 await page.locator('[data-detail-edit="area"]').click();await page.locator('[data-detail-input]').fill('Yeni alan');await page.locator('.detail-header').click();assert.equal(await page.evaluate(()=>testApi.state.items[0].area),'Yeni alan');
 await page.locator('[data-detail-edit="labels"]').click();await page.locator('[data-detail-input]').fill('Bir, İki');await page.locator('[data-detail-commit]').click();assert.deepEqual(await page.evaluate(()=>testApi.state.items[0].labels),['Bir','İki']);
 await page.locator('[data-detail-tab="activity"]').click();await page.locator('#progress-note-text').fill('Kaybolmayan not taslağı');assert.equal(await page.locator('.detail-aside').isVisible(),false);
 await page.evaluate(()=>{const select=document.getElementById('detail-priority');select.value='Kritik';select.dispatchEvent(new Event('change',{bubbles:true}));});assert.equal(await page.locator('#progress-note-text').inputValue(),'Kaybolmayan not taslağı');assert.equal(await page.locator('[data-detail-tab="activity"].selected').count(),1);assert.ok(await page.evaluate(()=>document.querySelector('.detail-modal')===window.originalDetailPanel));
 await page.evaluate(()=>{const select=document.getElementById('detail-status');select.value='Bloke';select.dispatchEvent(new Event('change',{bubbles:true}));});assert.equal(await page.locator('[data-detail-blocker]').count(),5);assert.equal(await page.locator('.detail-modal').count(),1);
 await page.locator('[data-detail-blocker="reason"]').fill('Blokaj');await page.locator('[data-detail-blocker="nextStep"]').fill('İncele');await page.locator('[data-detail-blocker="expectedAction"]').fill('Karar');await page.locator('[data-detail-blocker="owner"]').fill('Test PO');await page.locator('[data-detail-commit]').click();assert.equal(await page.evaluate(()=>testApi.state.items[0].status),'Bloke');
 await page.locator('#detail-status').selectOption('Devam ediyor');assert.equal(await page.evaluate(()=>testApi.state.items[0].status),'Devam ediyor');assert.ok(await page.evaluate(()=>document.querySelector('.detail-modal')===window.originalDetailPanel));
 const scrollPreserved=await page.evaluate(()=>{const body=document.querySelector('.detail-body');body.scrollTop=100;const before=body.scrollTop;const select=document.getElementById('detail-priority');select.value='Yüksek';select.dispatchEvent(new Event('change',{bubbles:true}));return Math.abs(body.scrollTop-before)<2;});assert.ok(scrollPreserved);
 await page.locator('[data-detail-tab="overview"]').click();await page.locator('[data-detail-edit="title"]').click();await page.locator('[data-detail-input]').fill('Saklama testi');
 await page.evaluate(()=>{window.originalStorageSet=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key==='rota-po-workspace-v1')throw new Error('test');return window.originalStorageSet.call(this,key,value);};});
 await page.locator('[data-detail-commit]').click();assert.equal(await page.locator('[data-detail-input]').count(),1);assert.ok((await page.locator('.detail-inline-error').textContent()).includes('Kaydedilemedi'));
 await page.evaluate(()=>{Storage.prototype.setItem=window.originalStorageSet;});await page.locator('[data-detail-commit]').click();assert.equal(await page.evaluate(()=>testApi.state.items[0].title),'Saklama testi');
 await page.evaluate(()=>{testApi.state.teams.push({id:'TEAM-INLINE',name:'Panel takımı',members:['Panel Üye']});});
 await page.locator('[data-detail-group="team"] > summary').click();
 await page.locator('[data-detail-edit="assignments"]').click();await page.locator('[data-add-assignment="detail-assignment-list"]').click();await page.locator('#detail-assignment-list [data-assignment-member]').fill('Geçersiz üye');await page.locator('[data-detail-commit]').click();assert.equal(await page.locator('.detail-inline-editor').count(),1);
 await page.locator('#detail-assignment-list [data-assignment-member]').fill('Panel Üye');await page.locator('#detail-assignment-list [data-assignment-scope]').fill('Analiz');await page.locator('[data-detail-commit]').click();assert.equal(await page.evaluate(()=>testApi.assignments[0].member),'Panel Üye');
 await page.locator('[data-detail-tab="relationships"]').click();await page.locator('[data-detail-edit="dependsOnIds"]').click();const dependency=await page.evaluate(()=>testApi.state.items[1].id);await page.locator('[data-detail-input]').selectOption([dependency]);await page.locator('[data-detail-commit]').click();assert.ok(await page.evaluate(id=>testApi.state.items[0].dependsOnIds.includes(id),dependency));
 await page.locator('[data-detail-edit="relatedRecords"]').click();await page.locator('[data-detail-input]').selectOption(['item::'+dependency]);await page.locator('[data-detail-commit]').click();assert.ok(await page.evaluate(id=>testApi.state.items[0].relatedRecords.some(link=>link.targetId===id),dependency));
 await page.locator('[data-detail-tab="attachments"]').click();await page.locator('[data-add-to-item]').click();assert.ok(await page.evaluate(()=>testApi.state.items[0].attachments.some(file=>file.name==='inline-test.txt')));assert.ok(await page.evaluate(()=>document.querySelector('.detail-modal')===window.originalDetailPanel));assert.equal(await page.locator('[data-detail-tab="attachments"].selected').count(),1);
 await page.locator('[data-detail-tab="activity"]').click();await page.locator('#progress-note-text').fill('Paneli kapatmayan not');await page.locator('[data-save-progress-note]').click();assert.ok(await page.evaluate(()=>testApi.state.items[0].activity.some(entry=>entry.message==='Paneli kapatmayan not')));assert.equal(await page.locator('#progress-note-text').inputValue(),'');assert.ok(await page.evaluate(()=>document.querySelector('.detail-modal')===window.originalDetailPanel));
 await page.locator('[data-detail-tab="overview"]').click();
 await fs.mkdir(process.env.TEMP+'/rota-feature-review',{recursive:true});await page.evaluate(()=>document.body.classList.add('dark-theme'));await page.waitForTimeout(450);await page.screenshot({path:process.env.TEMP+'/rota-feature-review/detail-inline.png'});
 for(const tab of ['overview','activity','attachments','relationships']) {
  await page.locator('[data-detail-tab="'+tab+'"]').click();
  if(tab==='overview')await page.evaluate(()=>document.querySelectorAll('.detail-property-group').forEach(group=>group.open=false));
  await page.waitForTimeout(100);await page.screenshot({path:process.env.TEMP+'/rota-feature-review/compact-'+tab+'.png'});
 }
 const darkSurfaces=await page.evaluate(()=>[...document.querySelectorAll('.detail-modal .activity-note-composer,.detail-modal .attached-file,.detail-modal .dependency-section,.detail-modal .recent-activity')].map(node=>getComputedStyle(node).backgroundColor));
 assert.ok(darkSurfaces.every(color=>color!=='rgb(255, 255, 255)'&&color!=='rgb(250, 251, 255)'&&color!=='rgb(251, 252, 254)'&&color!=='rgb(246, 248, 255)'));
 for (const theme of ['light','dark','contrast']) {
  await page.evaluate(t=>{document.body.classList.toggle('dark-theme',t!=='light');document.body.classList.toggle('high-contrast',t==='contrast');testApi.openWorkspaceSettings('work');},theme);
  assert.equal(await page.locator('[data-action="workflow-checks"]').count(),0);
  assert.equal(await page.locator('[name="estimateConfidence"], [name="estimateReason"]').count(),0);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  assert.equal(overflow,false,theme+' horizontal overflow');
 }
 await page.evaluate(()=>testApi.openRiskEditor(undefined,testApi.state.items[0].id));
 await page.locator('#risk-form [name="title"]').fill('Takip riski');
 await page.locator('#risk-form [type="submit"]').click();
 assert.equal(await page.evaluate(()=>testApi.state.risks.at(-1).title),'Takip riski');
 await page.evaluate(()=>testApi.openDiagnostics()); assert.equal(await page.locator('#diagnostic-report').count(),1);
 assert.equal(await page.evaluate(()=>testApi.structuredTextMarkup('<img src=x onerror=alert(1)>').includes('<img')),false);
 assert.deepEqual(errors,[]);
 await page.evaluate(()=>{testApi.state.profile.jiraBaseUrl='https://jira.example.test'; return testApi.openLinkedJira(testApi.state.items[0].id,'TEST-1');});
 await page.locator('#linked-jira-direction').selectOption('pull'); await page.locator('#linked-jira-title').check();
 await page.locator('[data-action="apply-linked-jira"]').click();
 assert.equal(await page.evaluate(()=>testApi.state.items[0].title),'Jira başlık');
 assert.equal(await page.evaluate(()=>window.jiraWrites||0),0);
 await page.evaluate(()=>{testApi.openNewModal();testApi.prepareEmail({name:'test.eml',from:'Test',date:'2026-11-03',fingerprint:'mail-test'});document.getElementById('new-title-input').value='E-posta başlığı';document.getElementById('new-description').value='Önizlenen gövde';testApi.renderEmailDestination();});
 await page.locator('#email-existing-item').selectOption(await page.evaluate(()=>testApi.state.items[0].id));
 await page.locator('[data-action="attach-email-existing"]').click();
 assert.equal(await page.evaluate(()=>testApi.state.items[0].sourceEmails[0].fingerprint),'mail-test');
 assert.ok(await page.evaluate(()=>testApi.state.items[0].activity.some(entry=>entry.message.includes('Önizlenen gövde'))));
 await fs.mkdir(process.env.TEMP+'/rota-feature-review',{recursive:true});
 await page.setViewportSize({width:1366,height:768});
 for (const theme of ['light','dark','contrast']) {
  await page.evaluate(t=>{document.body.classList.toggle('dark-theme',t!=='light');document.body.classList.toggle('high-contrast',t==='contrast');return testApi.openBacklogExcelImport();},theme);
  await page.waitForTimeout(450);
  await page.screenshot({path:process.env.TEMP+'/rota-feature-review/'+theme+'.png'});
 }
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';testApi.setView('backlog');const item=testApi.state.items[0];item.status='Yeni';item.acceptance=[];testApi.state.workflowChecks={Task:{ready:['acceptance','estimate'],done:['acceptance']}};testApi.applyWorkStatus(item,'Hazır');});
 assert.equal(await page.locator('#status-update-note').count(),0);
 assert.equal(await page.evaluate(()=>testApi.state.items[0].status),'Hazır');
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';testApi.state.teams.push({id:'TEAM-TEST',name:'Test takım',members:['Test üye']});testApi.selected.clear();testApi.selected.add(testApi.state.items[0].id);testApi.openBulkImpactPreview('assignment','TEAM-TEST::Test üye');});
 await page.locator('#bulk-assignment-mode').selectOption('replace');await page.locator('[data-action="apply-bulk-preview"]').click();
 assert.equal(await page.evaluate(()=>testApi.assignments[0].member),'Test üye');
 await page.evaluate(()=>testApi.openBulkImpactPreview('assignment','TEAM-TEST::Test üye'));
 await page.locator('#bulk-assignment-mode').selectOption('remove');await page.locator('[data-action="apply-bulk-preview"]').click();
 assert.equal(await page.evaluate(()=>testApi.assignments.length),0);
 await page.evaluate(()=>testApi.openWorkTemplateEditor());
 await page.locator('#work-template-form [name="name"]').fill('Test şablonu');await page.locator('#work-template-form [name="labels"]').fill('Test, Kontrol');await page.locator('#work-template-form [type="submit"]').click();
 const templateId=await page.evaluate(()=>testApi.state.workTemplates.at(-1).id);
 await page.evaluate(()=>testApi.openNewModal());await page.locator('#new-work-template').selectOption(templateId);
 assert.equal(await page.locator('#new-labels').inputValue(),'Test, Kontrol');
 await page.locator('.modal-close').click();
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';testApi.setView('focus');});
 assert.equal(await page.locator('.notification-center, [data-action="snooze-notification"]').count(),0);
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';const item=testApi.state.items[0];item.estimate=2;testApi.openRecordEditor('item',item.id);});
 assert.equal(await page.locator('[name="estimateReason"], [name="estimateConfidence"], #edit-item-form').count(),0);await page.locator('[data-detail-group="planning"] > summary').click();await page.locator('[data-detail-edit="estimate"]').click();await page.locator('[data-detail-input]').fill('5');await page.locator('[data-detail-commit]').click();
 assert.equal(await page.evaluate(()=>testApi.state.items[0].estimate),5);
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';const item=testApi.state.items[0];item.labels=['SözlükTest'];testApi.openWorkspaceSettings('work');});
 await page.locator('[data-dict-row="SözlükTest"] [data-dict-start="rename"]').click();await page.locator('[data-dict-rename-input]').fill('SözlükYeni');await page.locator('[data-dict-apply="rename"]').click();
 assert.ok(await page.evaluate(()=>testApi.state.items[0].labels.includes('SözlükYeni')));
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';const plan=testApi.getDailyPlan();plan.entries=[{type:'item',id:testApi.state.items[0].id,estimatedMinutes:45}];plan.focusBudgetMinutes=30;testApi.renderDailyPlan();});
 assert.equal(await page.locator('.daily-plan-summary.budget-over, #daily-focus-budget, .daily-plan-budget').count(),0);await page.locator('[data-action="carry-daily-entry"]').click();
 assert.ok(await page.evaluate(()=>{const plan=testApi.getDailyPlan();return plan.entries.length===1&&testApi.state.dailyPlans.some(next=>next.date!==plan.date&&next.entries.some(entry=>entry.carriedFrom===plan.date&&entry.id===plan.entries[0].id));}));
 await page.evaluate(()=>{const original=testApi.state.items[0];testApi.state.items.push({...structuredClone(original),id:'MERGE-SOURCE',title:'Kaynak',dependsOnIds:[],activity:[{id:'ACT-MERGE',kind:'comment',message:'Taşınacak not',actor:'Test',occurredAt:new Date().toISOString()}]});testApi.openMergeWorkItem('MERGE-SOURCE');});
 await page.locator('#merge-target').selectOption(await page.evaluate(()=>testApi.state.items[0].id));assert.ok((await page.locator('#merge-diff').textContent()).includes('Kaynak'));
 await page.locator('[data-action="confirm-merge-item"]').click();assert.ok(await page.evaluate(()=>testApi.state.items.find(item=>item.id==='MERGE-SOURCE').archived));assert.ok(await page.evaluate(()=>testApi.state.items[0].activity.some(entry=>entry.message.includes('Taşınacak not'))));
 await page.evaluate(()=>testApi.undoLastDeletion());assert.equal(await page.evaluate(()=>Boolean(testApi.state.items.find(item=>item.id==='MERGE-SOURCE').archived)),false);
 for (const width of [1024,1366]) {
  await page.setViewportSize({width,height:768});await page.evaluate(()=>testApi.setAppZoom(1.25));
  for (const open of ['openNewModal','openRiskEditor','openDiagnostics']) {
   await page.evaluate(async method=>{await testApi[method]();},open);await page.waitForTimeout(200);
   const bounds=await page.locator('.modal').evaluate(node=>{const rect=node.getBoundingClientRect();return {top:rect.top,bottom:rect.bottom,width:rect.width,viewport:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth};});
   assert.ok(bounds.top>=-1&&bounds.bottom<=769,open+' %125 dialog dikey sınırı');assert.equal(bounds.overflow,false,open+' yatay taşma');
  }
 }
 await page.evaluate(()=>{testApi.setAppZoom(1);document.getElementById('modal-root').innerHTML='';testApi.openQuickCreateModal();});
 await page.locator('#quick-create-form [name="title"]').fill('Hızlı taslak');await page.evaluate(()=>testApi.persistCurrentFormDraft());
 await page.locator('[data-action="expand-create-form"]').click();assert.equal(await page.locator('#new-title-input').inputValue(),'Hızlı taslak');await page.locator('.modal-close').click();
 await page.setViewportSize({width:1366,height:768});
 const performanceResult = await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';const sample=structuredClone(testApi.state.items[0]);testApi.state.items=Array.from({length:5000},(_,i)=>({...structuredClone(sample),id:'PERF-'+i,title:'Performans işi '+i, archived:false,status:'Yeni'}));testApi.clearProject();testApi.setView('backlog');const start=performance.now();testApi.setQuery('Performans');testApi.updateBacklogRows();return {duration:performance.now()-start,rows:document.querySelectorAll('.backlog-work-row').length,userAgent:navigator.userAgent};});assert.ok(performanceResult.duration<300,'5.000 iş filtre çizimi 300 ms hedefini aştı');assert.ok(performanceResult.rows<=60); console.log('PERFORMANCE',JSON.stringify(performanceResult));
 await page.evaluate(()=>{document.getElementById('modal-root').innerHTML='';document.activeElement?.blur();const wrap=document.querySelector('.backlog-table-wrap');wrap.scrollTop=wrap.scrollHeight;});await page.waitForTimeout(250);assert.ok((await page.locator('.backlog-work-row').last().getAttribute('data-open-item')).includes('4999'));
 await page.evaluate(()=>{const wrap=document.querySelector('.backlog-table-wrap');wrap.scrollTop=0;});await page.waitForTimeout(250);await page.locator('[data-select-backlog-item]').first().check();
 await page.evaluate(()=>{document.activeElement?.blur();const wrap=document.querySelector('.backlog-table-wrap');wrap.scrollTop=wrap.scrollHeight;});await page.waitForTimeout(250);assert.ok(await page.evaluate(()=>testApi.selected.has('PERF-0')));
 await page.locator('[data-action="kanban"]').click();assert.equal(await page.locator('.board-card').count(),40);await page.locator('[data-action="board-load-more"]').click();assert.equal(await page.locator('.board-card').count(),80);
 assert.equal(await page.locator('#board-lane, .board-lane-heading, .board-wip-control').count(),0);
 let previousBoardHeight=0;
 for(const height of [768,1080]) {
  await page.setViewportSize({width:1366,height});await page.waitForTimeout(100);
  const geometry=await page.evaluate(()=>{const board=document.querySelector('.board-wrap');const column=board.querySelector('.board-column');const cards=column.querySelector('.board-cards');const more=column.querySelector('[data-action="board-load-more"]');const bounds=board.getBoundingClientRect();return {height:bounds.height,bottom:bounds.bottom,cardsBottom:cards.getBoundingClientRect().bottom,moreTop:more.getBoundingClientRect().top,scrolls:cards.scrollHeight>cards.clientHeight,overflow:document.documentElement.scrollHeight>innerHeight, fills:Math.abs(column.getBoundingClientRect().bottom-(bounds.bottom-15))<3};});
  assert.ok(geometry.fills,'Board sütunları alanı doldurmalı');assert.ok(geometry.bottom<=height);assert.ok(geometry.cardsBottom<=geometry.moreTop+1);assert.ok(geometry.scrolls);assert.equal(geometry.overflow,false);
  if(previousBoardHeight)assert.ok(Math.abs(geometry.height-previousBoardHeight-312)<3,'Board pencereyle büyümeli');previousBoardHeight=geometry.height;
 }
 const legacy=await page.evaluate(()=>{testApi.state.items=testApi.state.items.slice(0,2);testApi.state.wipLimits={'__all::Analiz ediliyor':0};testApi.state.notifications=[{id:'legacy',recordId:'legacy',type:'task',title:'Eski',dueAt:'2026-01-01',state:'unread'}];testApi.moveBoardItem('PERF-0','Analiz ediliyor');testApi.save();return JSON.parse(localStorage.getItem('rota-po-workspace-v1'));});
 assert.equal(legacy.items.find(item=>item.id==='PERF-0').status,'Analiz ediliyor');
 assert.equal(legacy.wipLimits['__all::Analiz ediliyor'],0);assert.equal(legacy.notifications[0].id,'legacy');

 assert.deepEqual(errors,[]);
 console.log('PASS: Kişisel alan kaldırıldı; ortak toolbar, görev/not oluşturma, arama, tamamlama, ayrıntılı form, nottan görev, bağlam ve veri korunumu, tema, dar pencere ve klavye doğrulandı. Merkezde inline iş detayı; aynı panel düğümü, sekme, kaydırma ve not taslağı; alan/atama/blokaj/ilişki kayıtları, iptal ve saklama hatası. Kaldırılan sekiz özellik görünmüyor; durum ve tahmin değişimi gerekçesiz çalışıyor; eski veriler korunuyor. Excel, taslak, detay, tema, risk, Jira/e-posta, atama, şablon, sözlük, günlük süre/taşıma, birleştirme, Board ve 5.000 iş testleri geçti.');
} finally {await browser.close();server.close();}
