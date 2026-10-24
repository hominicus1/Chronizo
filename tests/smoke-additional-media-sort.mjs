import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {chronologyKey, sourceActionKey, compareSourceTitles} from '../js/source-chronology.js';
import {insertAdditionalSources} from '../js/vo-sheet-order.js';

assert.equal(chronologyKey('May 2, 2020'), chronologyKey('2020-05-02'));
assert.ok(chronologyKey('May 2, 2020') < chronologyKey('May 10, 2020'));
const sources = [1, 10, 11, 2, 3].map(number => ({id:`episode-${number}`, title:`Series Season 1 Episode ${number}`, date:'May, 2020', releaseDate:'2020-05-01'}));
const code = fs.readFileSync(new URL('../js/workbench-alpha83.js', import.meta.url), 'utf8');
const start = code.indexOf('function sourceCatalogCompare(');
const comparator = code.slice(start, code.indexOf('\n', start));
const context = vm.createContext({chronologyKey, compareSourceTitles, sourceActionChronologyKey: source => sourceActionKey(source, sources)});
vm.runInContext(comparator, context);
for (const mode of ['action', 'release', 'title-asc']) {
  context.sourceSortMode = mode;
  const ordered = sources.slice().sort(context.sourceCatalogCompare);
  assert.deepEqual(ordered.map(source => source.id), [1,2,3,10,11].map(number=>`episode-${number}`), mode);
}
context.sourceSortMode = 'title-desc';
assert.deepEqual(sources.slice().sort(context.sourceCatalogCompare).map(source=>source.id), [11,10,3,2,1].map(number=>`episode-${number}`));
const film = {id:'film',title:'Film',date:'2020-05-01',_sheetRow:20};
const sequel = {id:'sequel',title:'Sequel',date:'2021',_sheetRow:30};
const prequel = {id:'comic',title:'Prequel',date:'Przed źródłem ekranowym',relatedSourceIds:['film'],relationType:'prequel'};
const tiein = {id:'game',title:'Tie-in game',date:'Wokół źródła ekranowego',relatedSourceIds:['film']};
const standalone = {id:'standalone',title:'Standalone',date:'Własna ciągłość gry',releaseDate:'2020-09-01'};
const items = [film,sequel,prequel,tiein,standalone];
const key = source=>sourceActionKey(source,items);
assert.ok(key(prequel)<key(film));
assert.equal(key(tiein),key(film));
assert.equal(key(standalone),chronologyKey('2020-09-01'));
assert.deepEqual(insertAdditionalSources([film,sequel],items,key).sort((a,b)=>a._sheetRow-b._sheetRow).map(source=>source.id), ['comic','film','game','standalone','sequel']);
const cycle = [{id:'a',relatedSourceIds:['b']},{id:'b',relatedSourceIds:['a']}];
assert.equal(sourceActionKey(cycle[0],cycle),Infinity);
console.log('Additional media chronology and natural episode sorting: OK');
