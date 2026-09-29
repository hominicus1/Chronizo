import fs from 'node:fs';
import assert from 'node:assert/strict';

const pack=JSON.parse(fs.readFileSync(new URL('../data/extended-vo.sources.json',import.meta.url),'utf8'));

assert.equal(pack.format,'chronizo-source-pack');
assert.equal(pack.name,'Extended VO');
assert.equal(pack.rowCount,834);
assert.equal(pack.sources.length,834);
assert.equal(new Set(pack.sources.map(source=>source.importKey)).size,834);
assert.ok(pack.sources.every(source=>source.title&&source.date&&source.universe));
assert.ok(pack.sources.every(source=>source.status==='Nierozpoczęte'));
assert.ok(pack.sources.every(source=>source.tags.includes('EMCU')));
assert.ok(pack.sources.every(source=>['Film','Serial'].includes(source.type)));
assert.equal(pack.sources[0].title,"Eyes of Wakanda Season 1 Episode 1: Into the Lion's Den");
assert.equal(pack.sources[0].date,'1260 BC');
assert.equal(pack.sources[0].universe,'199999');

console.log('Chronizo Extended VO source pack: OK');
