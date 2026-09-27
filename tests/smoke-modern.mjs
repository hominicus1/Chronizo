import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../js/workbench.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/workbench.css',import.meta.url),'utf8')+fs.readFileSync(new URL('../css/workbench-enhancements.css',import.meta.url),'utf8');

for(const id of ['build-version','project-select','view-road','view-sources','view-events','view-atlas','road-content','sources-content','events-content','atlas-content','project-dialog','source-dialog','event-dialog']){
  assert.match(html,new RegExp(`id=["']${id}["']`),`missing ${id}`);
}
for(const concept of ['projects:[]','sources:[]','events:[]','localStorage','Zapisz i dodaj następne','skrzynce do uporządkowania']){
  assert.ok((html+js).includes(concept),`missing ${concept}`);
}
for(const demo of ['Earth-616','Avengers','Tony Stark','Steve Rogers','Nowy Jork','Dom Parkerów']){
  assert.ok(!html.includes(demo),`active UI still contains demo value: ${demo}`);
}
assert.ok(js.includes('chronizo.workbench.v1'),'isolated clean storage missing');
assert.ok(js.includes('timeType'),'flexible event time missing');
assert.ok(css.includes('@media(max-width:800px)'),'mobile layout missing');
for(const concept of ['event-relation-picker','event-relation-search','relationEventId','relationHaystack','relation-group'])assert.ok((js+css).includes(concept),`missing relation picker concept: ${concept}`);
for(const concept of ['roadMode','eventChronologyDate','orderEventsChronologically','source-date','event-date','dateApprox'])assert.ok(js.includes(concept),`missing chronology concept: ${concept}`);
for(const concept of ['editingSourceId','editingEventId','delete-source','delete-event','eventSourceIds','event-extra-sources'])assert.ok(js.includes(concept),`missing editing concept: ${concept}`);
for(const concept of ['projectWorlds','worldLinks','world-network','Wszystkie połączone światy'])assert.ok((js+css).includes(concept),`missing multiverse concept: ${concept}`);
assert.ok(css.includes('.metric{text-align:center}'),'metric numbers are not centered');
assert.match(html,/α26/,'visible build version missing');
console.log('Chronizo workbench smoke: OK');
