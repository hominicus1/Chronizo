import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../js/workbench.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/workbench.css',import.meta.url),'utf8')+fs.readFileSync(new URL('../css/workbench-enhancements.css',import.meta.url),'utf8');

for(const id of ['build-version','project-select','view-road','view-sources','view-worlds','view-characters','view-events','view-atlas','road-content','sources-content','worlds-content','characters-content','events-content','atlas-content','project-dialog','source-dialog','event-dialog']){
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
for(const concept of ['importExtendedVo','extended-vo.sources.json','importMultiversalVo','multiversal-vo.sources.json','chronizo-source-pack','Nierozpoczęte','sourceTagFilter','sourceColorMode','EMCU','MVO'])assert.ok(js.includes(concept),`missing hidden source compendium mechanism: ${concept}`);
assert.doesNotMatch(html,/id="import-(extended|multiversal)-vo"/,'Marvel catalog import buttons must stay out of the universal UI');
for(const concept of ['THEME_KEY','ensureThemeDialog','data-theme-choice','shield','green','dark','light'])assert.ok((js+css).includes(concept),`missing theme concept: ${concept}`);
for(const concept of ['road-track','roadNode','branch-up','branch-down','exportProject','importProjectFile','chronizo-project','Eksportuj projekt','Importuj projekt'])assert.ok((html+js+css).includes(concept),`missing horizontal road or JSON concept: ${concept}`);
assert.match(html,/data-view="atlas"[^>]*hidden/,'Atlas should be hidden in alpha 30');
assert.ok(css.includes('.metric{text-align:center}'),'metric numbers are not centered');
for(const type of ['Film','Serial','Komiks','Książka','Gra','Inne'])assert.match(html,new RegExp(`<option>${type}</option>`),`missing source type: ${type}`);
assert.doesNotMatch(html,/<option>Odcinek<\/option>/,'redundant source type remains: Odcinek');
assert.match(html,/α56/,'visible build version missing');
for(const migration of ['MVO_MINI_VERSE_ADDITIONS','migrateMvoMiniVerseSources','mvo-mini-verse-9-v2-order-repair','catalogMigrations','Mini-Verse VOs','runCatalogMigrations'])assert.ok(js.includes(migration),`missing one-time MVO additions migration: ${migration}`);
assert.equal((js.match(/\['mini-verse-vo-\d+'/g)||[]).length,9,'embedded MVO migration must contain exactly nine sources');
for(const projectTransfer of ['↑ Importuj projekt','↓ Eksportuj projekt','id="export-project"'])assert.ok(js.includes(projectTransfer),`missing universal project transfer action: ${projectTransfer}`);
assert.ok(js.includes("multiversal-vo.sources.json?v=2"),'Multiversal VO cache version must expose subsidiary VO additions');
for(const paging of ['SOURCE_PAGE_SIZE','sourcePage','sourceCatalogCompare','previous-sources','next-sources','Strona ${sourcePage+1} z ${pageCount}'])assert.ok(js.includes(paging),`missing source pagination or MVO order: ${paging}`);
assert.ok(js.includes("rows.MVO??rows.EMCU"),'all-sources order must prefer Multiversal VO');
assert.ok(js.includes("sourceTagFilter==='all'||sourceTagFilter==='MVO'"),'MVO filter must preserve spreadsheet order');
for(const search of ['data-view-search="road"','data-view-search="sources"','data-view-search="worlds"','data-view-search="characters"','data-view-search="events"','matchesViewSearch','sourceMatchesSearch','eventMatchesSearch','characterMatchesSearch'])assert.ok((html+js).includes(search),`missing view search: ${search}`);
for(const worldsView of ['data-view="worlds"','add-world-view-button','renderWorlds','Kartoteka światów'])assert.ok((html+js).includes(worldsView),`missing worlds submenu: ${worldsView}`);
assert.ok(!js.includes("content.querySelector('.road-summary');side.insertAdjacentHTML"),'world registry must not remain under Road');
for(const palette of ["EMCU:'#df3348'","MVO:'#35b84a'","tags.includes('EMCU')?tag.EMCU","?62:","?40:18"])assert.ok(js.includes(palette),`missing stronger source palette: ${palette}`);
assert.ok(js.includes("filteredSources().filter(source=>sourceMatchesSearch(source,'sources')).slice().sort(sourceCatalogCompare)"),'source registry must follow MVO order and search');
for(const orderGuard of ['importSheetPosition','rememberSheetPosition','sourceSheetRow','sheetRows','packed.row'])assert.ok(js.includes(orderGuard),`missing spreadsheet order guard: ${orderGuard}`);
for(const metadata of ['source-metadata.json','enrichSourceMetadata','releaseOrderRow','universeIndexRow','releaseDateIso'])assert.ok(js.includes(metadata),`missing sheet metadata enrichment: ${metadata}`);
for(const migration of ['migrateLegacySourceTags','extended-vo-','EMCU'])assert.ok(js.includes(migration),`missing legacy EMCU migration: ${migration}`);
for(const focus of ['selectedCharacterId','data-character-focus','character-focus-banner','clear-character-focus'])assert.ok((js+css).includes(focus),`missing character chronology focus: ${focus}`);
for(const lane of ['roadItemsMarkup','road-world-lane','road-lane-track'])assert.ok((js+css).includes(lane),`missing separate world lane: ${lane}`);
for(const removedMemory of ['dismissedImportKeys','dismissedSourceIdentities','protectedCount'])assert.ok(!js.includes(removedMemory),`deleted sources should be importable again: ${removedMemory}`);
const guardedImporter=js.slice(js.indexOf('async function importSourcePackFast'),js.indexOf('function importExtendedVo'));
assert.ok(!guardedImporter.includes('existing.worldIds='),'catalog update must not overwrite or extend worlds on an existing source');
console.log('Chronizo workbench smoke: OK');
