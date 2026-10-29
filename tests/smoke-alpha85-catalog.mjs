import assert from 'node:assert/strict';
import fs from 'node:fs';
import zlib from 'node:zlib';

const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const extended = read('data/extended-vo.sources.json');
const strict = read('data/strict-vo.sources.json');
const metadata = read('data/source-metadata.json');
const master = read('Road-to-Doomsday-Biblia-Chronizo-alpha83.chronizo.json').project;
const hostedMaster = JSON.parse(zlib.gunzipSync(fs.readFileSync('data/chronizo-marvel-alpha85.json.gz')).toString()).project;

for (let episode = 1; episode <= 8; episode += 1) {
  const expected = `VisionQuest Season 1 Episode ${episode}`;
  const source = extended.sources.find(item => item.title.startsWith(expected));
  assert.ok(source, `missing ${expected}`);
  assert.equal(source.date, 'May, 2028');
  assert.ok(strict.sources.some(item => item.title === source.title), `${expected} missing from SMU`);
  assert.ok(master.sources.some(item => item.title === source.title && item.tags.includes('EMCU') && item.tags.includes('SMU')), `${expected} missing from master catalog`);
}

assert.ok(!extended.sources.some(item => item.title.includes('VisionQuestion')), 'spreadsheet typo leaked into Chronizo');
assert.equal(extended.sources.find(item => item.title === 'Wonderman Season 1 Episode 8: Yucca Valley').date, 'Sep, 2028');
for (const [title, releaseDate] of [
  ['VisionQuest Season 1 Episode 3: Reboot', 'Oct 20, 2026'],
  ['VisionQuest Season 1 Episode 4: Malware', 'Oct 20, 2026'],
  ['VisionQuest Season 1 Episode 5: Firewall', 'Oct 27, 2026'],
  ['VisionQuest Season 1 Episode 6: Deadlock', 'Oct 27, 2026']
]) assert.equal(metadata.releases.find(item => item.title === title)?.date, releaseDate);

assert.equal(master.sources.length, 3510);
assert.equal(hostedMaster.sources.length, 3510);
assert.equal(hostedMaster.description.includes('α85'), true);
console.log('α85 catalog: VisionQuest, release dates and canonical spelling verified');
