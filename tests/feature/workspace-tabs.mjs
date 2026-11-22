import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transformSync } from 'esbuild';
const source=fs.readFileSync(new URL('../../src/app.ts',import.meta.url),'utf8');
const extract=(start,end)=>source.slice(source.indexOf(start),source.indexOf(end,source.indexOf(start)));
const drafts={notes:'Not taslağı',questions:'Soru taslağı',tasks:'Görev taslağı',items:''};
const links={notes:'PAY-1',questions:'',tasks:'',items:''};
const context=vm.createContext({itemById:id=>({id,title:'Örnek iş'}),resizeWorkspaceMessage(){},state:{items:[{id:'PAY-1',title:'Örnek iş'}]},workspaceMessageDrafts:drafts,workspaceMessageLinks:links,unifiedNoteKind:'task',unifiedNoteLinked:'',requestAnimationFrame(){},esc:value=>String(value),icon:name=>name,meetingStagePlaceholders:{note:'Notunu yaz',question:'Sorunu yaz',task:'Görevini yaz'},meetingStageRecordLabels:{note:'Not',question:'Soru',task:'Görev'},meetingStageRecordIcons:{note:'note',question:'help',task:'task'}});
vm.runInContext(transformSync(extract('function workspaceRecordKind(', 'document.addEventListener'),{loader:'ts'}).code,context);
vm.runInContext(transformSync(extract('function workspaceLinkChip(', 'function sendWorkspaceMessage('),{loader:'ts'}).code,context);
context.workspaceSection='notes';
const tabs=vm.runInContext('workspaceSectionsMarkup()',context);
assert.equal((tabs.match(/data-workspace-section=/g)||[]).length,3);
assert.ok(tabs.includes('Notlar')&&tabs.includes('Sorular')&&tabs.includes('Görevler'));
assert.doesNotMatch(tabs,/followup|Yanıt bekleyen|Planlı/);
for(const [section,type] of [['notes','note'],['questions','question'],['tasks','task']]){
 const markup=vm.runInContext(`workspaceMessageComposer('${section}',workspaceRecordKind('${section}'))`,context);
 assert.match(markup,new RegExp('name="kind" value="'+type+'"'));
 assert.ok(markup.includes(drafts[section]));
 assert.match(markup,new RegExp('data-message-kind="'+section+'"'));
 assert.doesNotMatch(markup,/type="radio"/);
}
assert.equal(drafts.notes,'Not taslağı');assert.equal(drafts.questions,'Soru taslağı');
const markup=vm.runInContext('workspaceMessageComposer("notes", "note")',context);
assert.match(markup,/name="linked" value="PAY-1"/);assert.match(markup,/workspace-link-chip[^>]*>link/);assert.doesNotMatch(markup,/<select/);
assert.doesNotMatch(source,/createFollowUps|followUps\.bell|checkPersonalFollowUps/);
console.log('PASS workspace tabs: three kinds, automatic type, same composer, independent drafts and links, no followup UI');
