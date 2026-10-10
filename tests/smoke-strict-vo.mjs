import assert from 'node:assert/strict';
import fs from 'node:fs';

const pack=JSON.parse(fs.readFileSync(new URL('../data/strict-vo.sources.json',import.meta.url),'utf8'));
assert.equal(pack.format,'chronizo-strict-vo-membership');
assert.equal(pack.tag,'SMU');
assert.equal(pack.sourceSheet,'Strict VO');
assert.equal(pack.sources.length,422);
assert.ok(pack.sources.every(source=>source.row>=4&&source.title&&source.universe));
assert.equal(pack.sources[0].title,"Eyes of Wakanda Season 1 Episode 1: Into the Lion's Den");
assert.equal(pack.sources.at(-1).title,'Spider-Man: Brand New Day');
console.log(`Strict VO smoke: ${pack.sources.length} SMU memberships`);
