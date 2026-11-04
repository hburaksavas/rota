import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
 const page = await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(process.cwd()+'/index.html').href);
 await page.locator('#setup-form button[type="submit"]').click();await page.locator('[data-view="favspace"]').click();
 // DOM drop must complete using native hover paths even without native file-drop.
 await page.evaluate(()=>{window.rotaDesktop={resolveDroppedFileShortcuts:async()=>[{name:'Arşiv.zip',path:'C:\\Test\\Arşiv.zip'}]};const dt=new DataTransfer();dt.items.add(new File(['zip'],'Arşiv.zip'));window.dispatchEvent(new DragEvent('drop',{dataTransfer:dt,cancelable:true}));});
 await page.locator('.fav-drop-overlay.is-complete').waitFor();
 assert.equal(await page.locator('.fav-resource').filter({hasText:'Arşiv.zip'}).count(),1);
 await page.locator('[data-shortcut-cancel]').click();
 // Missing native path must leave the pending state and allow a picker retry.
 await page.evaluate(()=>{window.rotaDesktop.resolveDroppedFileShortcuts=async()=>[];const dt=new DataTransfer();dt.items.add(new File(['zip'],'Diğer.zip'));window.dispatchEvent(new DragEvent('drop',{dataTransfer:dt,cancelable:true}));});
 await page.locator('.fav-drop-overlay.has-error').waitFor({timeout:6000});
 assert.match(await page.locator('.fav-drop-status').innerText(),/Dosya konumu alınamadı/);
 await page.evaluate(()=>{window.rotaDesktop.pickFileShortcuts=async()=>[{name:'Diğer.zip',path:'C:\\Test\\Diğer.zip'}];});
 await page.locator('[data-shortcut-pick]').click();await page.locator('.fav-drop-overlay.is-complete').waitFor();
 assert.equal(await page.locator('.fav-resource').count(),2);await page.locator('[data-shortcut-cancel]').click();
 // A slow bridge may not insert a file after the user cancels.
 await page.evaluate(()=>{window.rotaDesktop.resolveDroppedFileShortcuts=()=>new Promise(resolve=>{window.__finishShortcut=resolve;});const dt=new DataTransfer();dt.items.add(new File(['zip'],'İptal.zip'));window.dispatchEvent(new DragEvent('drop',{dataTransfer:dt,cancelable:true}));});
 await page.keyboard.press('Escape');await page.evaluate(()=>window.__finishShortcut([{name:'İptal.zip',path:'C:\\Test\\İptal.zip'}]));
 assert.equal(await page.locator('.fav-resource').count(),2);assert.equal(await page.locator('.fav-drop-overlay').count(),0);
 assert.deepEqual(errors,[]);console.log('ZIP drop: native ikinci olay olmadan tamamlama, bekleme süresi, dosya seçerek kurtarma ve geç yanıt iptali geçti.');
} finally {await browser.close();}
