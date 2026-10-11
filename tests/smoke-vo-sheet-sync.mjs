import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {sourceActionKey} from '../js/source-chronology.js';
import {execFileSync} from 'node:child_process';
import {applyVoSheetOrder, sheetOrderSources, insertAdditionalSources} from '../js/vo-sheet-order.js';

const read = path => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));
execFileSync(process.execPath, ['scripts/build-complete-project.mjs'], {cwd: new URL('..', import.meta.url)});
const pack = read('../data/vo-sheet-order.json');
const project = read('../Road-to-Doomsday-Biblia-Chronizo-alpha80.chronizo.json').project;
const before = structuredClone(project);
applyVoSheetOrder(project, pack);
assert.deepEqual(project.sources.map(({sheetEntries, sheetOrderSynced, ...source}) => source), before.sources.map(({sheetEntries, sheetOrderSynced, ...source}) => source));
assert.deepEqual(project.events, before.events);

const code = fs.readFileSync(new URL('../js/workbench-alpha81.js', import.meta.url), 'utf8');
const functions = ['filteredSources', 'sourceSheetRow', 'sourceCatalogCompare'].map(name => {
  const start = code.indexOf(`function ${name}(`);
  const end = code.indexOf('\n', start);
  return code.slice(start, end);
}).join('\n');
const context = vm.createContext({sheetOrderSources, insertAdditionalSources, sourceActionChronologyKey: source => sourceActionKey(source, project.sources), activeProject: () => project, sourceTags: source => source.tags || [], sourceSortMode: 'catalog', importSheetPosition: () => null, chronologicalCompare: () => {throw Error('Catalog must use sheet rows');}});
vm.runInContext(functions, context);
for (const sheet of pack.sheets) {
  context.sourceTagFilter = sheet.tag;
  const actual = vm.runInContext('filteredSources().filter(source=>Number.isInteger(source._sheetRow)).sort(sourceCatalogCompare)', context);
  assert.deepEqual(JSON.parse(JSON.stringify(actual.map(source => [source._sheetRow, source.title.trim(), source.date]))), sheet.entries.map(entry => [entry.row, entry.title.trim(), entry.date]), `${sheet.tag}: every original sheet row, title and action date must retain live sheet order`);
  console.log(`${sheet.tag}: ${actual.length}/${sheet.entries.length} rows in exact order`);
}
context.sourceSortMode = 'action';
context.sourceTagFilter = 'MVO';
assert.ok(vm.runInContext('filteredSources().some(source => source.title.startsWith("Meet Spidey"))', context), 'Additional sources must remain available outside the exact sheet view');
const once = JSON.stringify(project);
applyVoSheetOrder(project, pack);
assert.equal(JSON.stringify(project), once, 'Migration must be idempotent');
console.log('VO sync: preserves source IDs, statuses, dates and event relations; repeated sheet appearances share one source');
