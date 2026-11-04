import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { runInNewContext } from 'node:vm';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { installNativeFileDrop } from '../../scripts/native-file-drop.mjs';
import { fileShortcuts } from '../../scripts/file-shortcuts.mjs';
const directory=await mkdtemp(join(tmpdir(),'rota-native-route-'));
try {
 const zip=join(directory,'Örnek arşiv.zip');await writeFile(zip,'zip');
 const window=new EventEmitter(), webview=new EventEmitter(), received=[];
 let pending, favspace=true, modal=false, emailCalls=0;
 const page={rotaDesktop:{createFileShortcuts:fileShortcuts,nativeDrop:async paths=>{emailCalls++;assert.equal(paths[0],zip);throw new Error('legacy-route');}},dispatchEvent:event=>{received.push(event);return true;}};
 const document={querySelector:selector=>selector==='.favspace'?favspace:modal};
 class CustomEvent {constructor(type,options={}){this.type=type;this.detail=options.detail;}}
 webview.evaluateScript=script=>{pending=runInNewContext(script,{window:page,document,CustomEvent});};
 const bridge=installNativeFileDrop(window,webview);
 webview.emit('drag-enter',{paths:[zip],position:{x:20,y:20}});assert.equal(received.at(-1).type,'rota-file-hover');assert.deepEqual(bridge.consumePaths(),[zip]);assert.deepEqual(bridge.consumePaths(),[]);
 webview.emit('drag-drop',{paths:[zip],position:{x:50,y:80}});await pending;
 assert.equal(received.at(-1).type,'rota-favspace-files');assert.equal(received.at(-1).detail[0].path,zip);assert.equal(emailCalls,0);
 webview.emit('drag-enter',{paths:[zip]});webview.emit('drag-leave',{});assert.equal(received.at(-1).type,'rota-file-hover-cancelled');assert.deepEqual(bridge.consumePaths(),[]);
 // Parent/title-bar target keeps working and content paths do not depend on it.
 window.emit('file-drop',{files:[zip]});await pending;assert.equal(received.at(-1).detail[0].path,zip);
 webview.emit('drag-drop',{paths:[join(directory,'missing.zip')]});await pending;assert.equal(received.at(-1).type,'rota-favspace-error');
 modal=true;webview.emit('drag-drop',{paths:[zip]});await pending;assert.equal(emailCalls,1);assert.equal(received.at(-1).type,'rota-native-error');
 console.log('Native yönlendirme: WebView drag-drop ZIP konumu, pencere hedefi, hover/iptal, hata ve eski ek/e-posta akışı geçti.');
} finally {await rm(directory,{recursive:true,force:true});}
