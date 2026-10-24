import fs from 'node:fs';
import assert from 'node:assert/strict';

const metadata=JSON.parse(fs.readFileSync(new URL('../data/source-metadata.json',import.meta.url),'utf8'));
const extended=JSON.parse(fs.readFileSync(new URL('../data/extended-vo.sources.json',import.meta.url),'utf8'));
const multiversal=JSON.parse(fs.readFileSync(new URL('../data/multiversal-vo.sources.json',import.meta.url),'utf8'));
const normalize=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’‘]/g,"'").replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
const releaseTitles=new Set(metadata.releases.map(item=>normalize(item.title)));
const matched=pack=>pack.sources.filter(source=>releaseTitles.has(normalize(source.title))).length;

assert.equal(metadata.format,'chronizo-source-metadata');
assert.equal(metadata.universes.length,289,'Universe Index row count changed');
assert.equal(metadata.releases.length,3258,'Release Order row count changed');
assert.equal(extended.sources.length,836,'Extended VO must include every titled row');
assert.equal(multiversal.sources.length,3294,'MVO catalog must include the main sheet and nine Mini-Verse additions');
assert.equal(matched(extended),824,'unexpected Extended VO release match coverage');
assert.equal(matched(multiversal),3187,'unexpected Multiversal VO release match coverage');
assert.equal(multiversal.sources.filter(source=>source.sourceSheet==='Mini-Verse VOs').length,9,'unique Mini-Verse VO titles missing');
assert.ok(metadata.universes.some(item=>item.designation==='199999 (AKA 616)'),'main MCU universe name missing');
console.log('Chronizo source metadata: OK');
