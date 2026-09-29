import fs from 'node:fs';
import assert from 'node:assert/strict';

const pack=JSON.parse(fs.readFileSync(new URL('../data/multiversal-vo.sources.json',import.meta.url),'utf8'));
const extended=JSON.parse(fs.readFileSync(new URL('../data/extended-vo.sources.json',import.meta.url),'utf8'));

assert.equal(pack.format,'chronizo-source-pack');
assert.equal(pack.name,'Multiversal VO');
assert.equal(pack.rowCount,3273);
assert.equal(pack.sources.length,3273);
assert.equal(new Set(pack.sources.map(source=>source.importKey)).size,3273);
assert.ok(pack.sources.every(source=>source.title&&source.date&&source.universe));
assert.ok(pack.sources.every(source=>source.status==='Nierozpoczęte'));
assert.ok(pack.sources.every(source=>source.tags.includes('MVO')));
assert.equal(pack.sources[0].title,"Eyes of Wakanda Season 1 Episode 1: Into the Lion's Den");
assert.equal(pack.sources[0].date,'1260 BC');
assert.equal(pack.sources[0].universe,'199999');
const normalize=value=>String(value||'').toLowerCase().replace(/\s+/g,' ').trim();
const identity=source=>[normalize(source.title),normalize(source.date),normalize(source.universe)].join('|');
const extendedKeys=new Set(extended.sources.map(identity));
assert.equal(pack.sources.filter(source=>extendedKeys.has(identity(source))).length,831);

console.log('Chronizo Multiversal VO source pack: OK');
