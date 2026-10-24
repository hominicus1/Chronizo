import assert from 'node:assert/strict';
import fs from 'node:fs';

const payload=JSON.parse(fs.readFileSync('Road-to-Doomsday-Biblia-Chronizo-alpha83.chronizo.json','utf8'));
const sources=payload.project.sources;
const firstClass=sources.filter(source=>source.title==='X-Men: First Class'&&source.worldIds.some(id=>payload.project.worlds.find(world=>world.id===id)?.designation==='Earth-10005'));
assert.equal(firstClass.length,1,'X-Men: First Class should be a single Earth-10005 source');
for(const tag of ['MVO','EMCU','FOX-MEN'])assert.ok(firstClass[0].tags.includes(tag),`X-Men: First Class missing ${tag}`);
assert.equal(firstClass[0].date,'Oct, 1962');
const vision=sources.filter(source=>source.title==='VisionQuest Season 1 Episode 1: No Strings');
assert.equal(vision.length,1,'latest VisionQuest episode should be present once');
assert.ok(vision[0].releaseDate,'latest source should receive release metadata');
console.log(`membership smoke ok: ${sources.length} sources`);
