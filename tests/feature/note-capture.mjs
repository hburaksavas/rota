import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transformSync } from 'esbuild';
const source = fs.readFileSync(new URL('../../src/app.ts', import.meta.url), 'utf8');
const field = { value:'', focus() {} };
const form = { kind:'note', linked:'PAY-1', dataset:{messageKind:'notes'}, classList:{remove(){}}, closest(){return null;}, querySelector(selector){ return selector === 'textarea' ? field : {disabled:false}; } };
const fixture = { notes:[], tasks:[], openQuestions:[] };
let saved = 0, closed = 0, fail = false;
const context = vm.createContext({
 state:fixture, modalRoot:{querySelector(selector){ return selector.includes(' form') ? form : null; }},
 document:{getElementById(){return null;}}, root:{querySelector(){return null;}},
 FormData:class { constructor(form){this.form=form;} get(name){return name === 'message' ? field.value : this.form[name];} },
 save(){if(fail)return false; saved++; return true;}, render(){}, closeModal(){closed++;},
 resizeWorkspaceMessage(){}, nextId(prefix){return prefix+'-'+(saved+1);},
 workspaceMessageDrafts:{notes:''}, dashboardSearches:{notes:''}, unifiedNoteFilter:'', unifiedNoteStatus:'active', workspaceShelfQuery:'', questionFilter:'open', form, field,
});
const slice = (from,to) => source.slice(source.indexOf(from),source.indexOf(to,source.indexOf(from)));
const code = 'let noteCaptureMessages = [];\n' + slice('function appendNoteCaptureMessage(', '\ndocument.addEventListener') + '\n' + slice('function sendWorkspaceMessage(', 'function renderWorkspaceShelf()');
vm.runInContext(transformSync(code, {loader:'ts'}).code + '\nfunction renderNoteCaptureMessages() {}',context);
field.value='İlk mesaj'; vm.runInContext('appendNoteCaptureMessage(form)',context);
field.value='İkinci mesaj'; vm.runInContext('appendNoteCaptureMessage(form)',context);
assert.equal(saved,0); assert.equal(fixture.notes.length,0);
field.value='Gönderilmemiş son satır'; vm.runInContext('completeNoteCapture()',context);
assert.equal(saved,1); assert.equal(closed,1); assert.equal(fixture.notes.length,1);
assert.equal(fixture.notes[0].body,'İlk mesaj\n\nİkinci mesaj\n\nGönderilmemiş son satır');
assert.equal(fixture.notes[0].linked,'PAY-1');
vm.runInContext('completeNoteCapture()',context); assert.equal(saved,1);
// Failed saves retain the draft and roll back record insertion.
fail=true; field.value='Kaybolmayan taslak'; vm.runInContext('appendNoteCaptureMessage(form); completeNoteCapture()',context);
assert.equal(fixture.notes.length,1); assert.equal(closed,1);
fail=false; vm.runInContext('completeNoteCapture()',context); assert.equal(fixture.notes.length,2);
// Same capture works for task and question kinds, each as one record.
for (const kind of ['task','question']) {
 form.kind=kind; field.value=kind+' mesajı'; vm.runInContext('appendNoteCaptureMessage(form); completeNoteCapture()',context);
}
assert.equal(fixture.tasks.length,1); assert.equal(fixture.openQuestions.length,1);
console.log('PASS capture: deferred save, multiple messages as one record, unsent text, blank completion, rollback, kinds');
