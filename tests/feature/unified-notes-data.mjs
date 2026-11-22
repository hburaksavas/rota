import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transformSync } from 'esbuild';
const source = fs.readFileSync(new URL('../../src/app.ts', import.meta.url), 'utf8');
const start = source.indexOf('type UnifiedNoteKind =');
const end = source.indexOf('function unifiedNoteFilters()', start);
const fixture = {
 notes: [{ id: 'N1', title: 'Eski not', body: 'Ekli içerik', linked: 'PAY-1', createdAt: '2026-11-20', attachments: [{ name:'test.pdf' }] }],
 tasks: [{ id: 'T1', title: 'Açık görev', linked:'PAY-1', done:false, updatedAt:'2026-11-22' }, { id:'T2', title:'Biten görev', done:true, linked:'' }],
 openQuestions: [{ id:'Q1', text:'Açık soru\nİkinci satır', status:'Açık', createdAt:'2026-11-21' }, { id:'Q2',text:'Yanıtlanan soru', status:'Yanıtlandı', answer:'Yanıt' }]
};
const snapshot = JSON.stringify(fixture);
const context = vm.createContext({ state: fixture });
vm.runInContext(transformSync(source.slice(start,end), { loader: 'ts', target: 'es2022' }).code, context);
const records = () => JSON.parse(vm.runInContext('JSON.stringify(unifiedNotes())', context));
assert.equal(records().length, 5);
vm.runInContext('unifiedNoteStatus = "active"', context);
assert.deepEqual(records().map(r => r.id), ['T1','Q1','N1']);
vm.runInContext('unifiedNoteFilter = "question"', context);
assert.deepEqual(records().map(r => r.id), ['Q1']);
assert.match(records()[0].body, /İkinci satır/);
vm.runInContext('unifiedNoteStatus = "completed"', context);
assert.deepEqual(records().map(r => r.id), ['Q2']);
assert.match(records()[0].body, /Yanıt/);
vm.runInContext('unifiedNoteFilter = ""', context);
assert.deepEqual(records().map(r => r.id), ['T2','Q2']);
vm.runInContext('unifiedNoteStatus = "all"', context);
assert.equal(records().length, 5);
assert.equal(records().find(r => r.id === 'N1').linked, 'PAY-1');
assert.equal(JSON.stringify(fixture), snapshot, 'Original data, attachments, and IDs must remain unchanged');
console.log('PASS unified notes data: legacy records, sorting, kinds, statuses, answers, links, no mutation');
