import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transformSync } from 'esbuild';
const source=fs.readFileSync(new URL('../../src/dialogs.ts',import.meta.url),'utf8');
const values=new Map();let current, opened=0, failWrite=false;
class Element {
 constructor(tag){this.tag=tag;this.children=[];this.listeners={};this.dataset={};this.isConnected=true;this.checked=false;}
 setAttribute(){} append(...nodes){this.children.push(...nodes);} focus(){} select(){} close(){} remove(){}
 addEventListener(type,fn){this.listeners[type]=fn;}
 showModal(){current=this;opened++;}
 querySelector(selector){
  this.nodes??={};
  if(selector==='[data-preference-error]')return this.nodes['.app-dialog-body']?.children.find(n=>n.dataset?.preferenceError!==undefined)||null;
  return this.nodes[selector]??=new Element(selector);
 }
}
const context=vm.createContext({HTMLElement:Element,document:{activeElement:null,createElement:tag=>new Element(tag),createTextNode:text=>text,body:new Element('body')},window:{addEventListener(){},removeEventListener(){}},localStorage:{getItem:key=>values.get(key)??null,setItem(key,value){if(failWrite)throw new Error('quota');values.set(key,value);}}});
vm.runInContext(transformSync(source.replaceAll('export ',''),{loader:'ts'}).code+'\nglobalThis.api={appConfirm,appConfirmDeletion,isDeletionConfirmationEnabled,setDeletionConfirmationEnabled};',context);
const api=context.api, tick=()=>new Promise(resolve=>setImmediate(resolve));
const remember=()=>current.querySelector('.app-dialog-body').children.find(n=>n.tag==='label')?.children[0];
const submit=()=>current.listeners.submit({preventDefault(){},stopPropagation(){}});
assert.equal(api.isDeletionConfirmationEnabled(),true);
let result=api.appConfirmDeletion('Not silinsin mi?');await tick();remember().checked=true;current.listeners.cancel({preventDefault(){}});
assert.equal(await result,false);assert.equal(api.isDeletionConfirmationEnabled(),true);
result=api.appConfirmDeletion('Not silinsin mi?');await tick();submit();assert.equal(await result,true);assert.equal(api.isDeletionConfirmationEnabled(),true);
result=api.appConfirmDeletion('Not silinsin mi?');await tick();remember().checked=true;submit();assert.equal(await result,true);assert.equal(api.isDeletionConfirmationEnabled(),false);
let before=opened;assert.equal(await api.appConfirmDeletion('Başka not silinsin mi?'),true);assert.equal(opened,before);
// Other confirmation flows still ask.
result=api.appConfirm('Yedek geri yüklensin mi?');await tick();assert.equal(remember(),undefined);submit();assert.equal(await result,true);
assert.equal(api.setDeletionConfirmationEnabled(true),true);
result=api.appConfirmDeletion('Görev silinsin mi?');await tick();assert.ok(remember());
failWrite=true;remember().checked=true;submit();assert.match(current.querySelector('[data-preference-error]').textContent,/Tercih kaydedilemedi/);assert.equal(api.isDeletionConfirmationEnabled(),true);
remember().checked=false;submit();assert.equal(await result,true);
console.log('PASS deletion preference: cancel, confirm once, remember, skip, re-enable, unrelated confirms, storage failure');
