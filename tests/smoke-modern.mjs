import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../js/workbench.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/workbench.css',import.meta.url),'utf8')+fs.readFileSync(new URL('../css/workbench-enhancements.css',import.meta.url),'utf8');

for(const id of ['build-version','project-select','view-road','view-sources','view-characters','view-events','view-atlas','road-content','sources-content','characters-content','events-content','atlas-content','project-dialog','source-dialog','event-dialog']){
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
for(const concept of ['chronologyKey','chronologicalCompare','Data akcji źródła','Data opisowa wydarzenia','1260 BC','początek czasu'])assert.ok(js.includes(concept),`missing descriptive chronology concept: ${concept}`);
for(const concept of ['editingSourceId','editingEventId','delete-source','delete-event','eventSourceIds','event-extra-sources'])assert.ok(js.includes(concept),`missing editing concept: ${concept}`);
for(const concept of ['projectWorlds','worldLinks','world-network','Wszystkie połączone światy'])assert.ok((js+css).includes(concept),`missing multiverse concept: ${concept}`);
for(const concept of ['worldLabel','world-designation','Numer, nazwa lub oznaczenie','Krótki opis','TRN414'])assert.ok(js.includes(concept),`missing world designation concept: ${concept}`);
for(const concept of ['add-event-world','worldDialogTarget',"openWorldDialog('event')",'Numer, nazwa lub oznaczenie'])assert.ok(js.includes(concept),`missing inline world creation concept: ${concept}`);
for(const concept of ['projectCharacters','characterIds','characterConnections','character-name','character-aliases','characterAliases','character-birth','character-death'])assert.ok(js.includes(concept),`missing character concept: ${concept}`);
assert.ok(js.includes("$('#event-extra-sources')||$('#event-source')?.closest('.form-row')"),'character form must initialize before the event dialog is opened');
for(const concept of ['sourceDialogTarget','characterDialogTarget','source-worlds','add-source-world','add-event-source','add-event-character','add-character-world','Świat pochodzenia'])assert.ok(js.includes(concept),`missing linked creation concept: ${concept}`);
for(const concept of ['import-extended-vo','importExtendedVo','extended-vo.sources.json','import-multiversal-vo','importMultiversalVo','multiversal-vo.sources.json','chronizo-source-pack','Nierozpoczęte','sourceTagFilter','sourceColorMode','EMCU','MVO'])assert.ok((html+js).includes(concept),`missing source compendium concept: ${concept}`);
for(const concept of ['THEME_KEY','ensureThemeDialog','data-theme-choice','shield','green','dark','light'])assert.ok((js+css).includes(concept),`missing theme concept: ${concept}`);
for(const concept of ['road-track','roadNode','branch-up','branch-down','exportProject','importProjectFile','chronizo-project','Zapisz JSON','Wczytaj JSON'])assert.ok((html+js+css).includes(concept),`missing horizontal road or JSON concept: ${concept}`);
assert.match(html,/data-view="atlas"[^>]*hidden/,'Atlas should be hidden in alpha 30');
assert.ok(css.includes('.metric{text-align:center}'),'metric numbers are not centered');
for(const type of ['Film','Serial','Komiks','Książka','Gra','Inne'])assert.match(html,new RegExp(`<option>${type}</option>`),`missing source type: ${type}`);
assert.doesNotMatch(html,/<option>Odcinek<\/option>/,'redundant source type remains: Odcinek');
assert.match(html,/α46/,'visible build version missing');
assert.ok(js.includes("filteredSources().slice().sort(chronologicalCompare)"),'source registry must follow the spreadsheet action date');
for(const orderGuard of ['importSheetPosition','rememberSheetPosition','sourceSheetRow','sheetRows','packed.row'])assert.ok(js.includes(orderGuard),`missing spreadsheet order guard: ${orderGuard}`);
for(const metadata of ['source-metadata.json','enrichSourceMetadata','releaseOrderRow','universeIndexRow','releaseDateIso'])assert.ok(js.includes(metadata),`missing sheet metadata enrichment: ${metadata}`);
for(const migration of ['migrateLegacySourceTags','extended-vo-','EMCU'])assert.ok(js.includes(migration),`missing legacy EMCU migration: ${migration}`);
for(const focus of ['selectedCharacterId','data-character-focus','character-focus-banner','clear-character-focus'])assert.ok((js+css).includes(focus),`missing character chronology focus: ${focus}`);
for(const lane of ['roadItemsMarkup','road-world-lane','road-lane-track'])assert.ok((js+css).includes(lane),`missing separate world lane: ${lane}`);
for(const removedMemory of ['dismissedImportKeys','dismissedSourceIdentities','protectedCount'])assert.ok(!js.includes(removedMemory),`deleted sources should be importable again: ${removedMemory}`);
const guardedImporter=js.slice(js.indexOf('async function importSourcePackFast'),js.indexOf('function importExtendedVo'));
assert.ok(!guardedImporter.includes('existing.worldIds='),'catalog update must not overwrite or extend worlds on an existing source');
console.log('Chronizo workbench smoke: OK');
