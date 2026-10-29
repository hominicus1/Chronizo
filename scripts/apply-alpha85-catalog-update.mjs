import fs from 'node:fs';

const generatedAt = '2026-10-29';
const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const write = (path, value) => fs.writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’‘]/g, "'").replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();

const vision = [
  {episode: 1, title: 'VisionQuest Season 1 Episode 1: No Strings', row: 835, strictRow: 424, releaseDate: '2026-10-13'},
  {episode: 2, title: 'VisionQuest Season 1 Episode 2: Theseus', row: 836, strictRow: 425, releaseDate: '2026-10-13'},
  {episode: 3, title: 'VisionQuest Season 1 Episode 3: Reboot', row: 837, strictRow: 426, releaseDate: '2026-10-20'},
  {episode: 4, title: 'VisionQuest Season 1 Episode 4: Malware', row: 838, strictRow: 427, releaseDate: '2026-10-20'},
  {episode: 5, title: 'VisionQuest Season 1 Episode 5: Firewall', row: 839, strictRow: 428, releaseDate: '2026-10-27'},
  {episode: 6, title: 'VisionQuest Season 1 Episode 6: Deadlock', row: 840, strictRow: 429, releaseDate: '2026-10-27'},
  {episode: 7, title: 'VisionQuest Season 1 Episode 7', row: 841, strictRow: 430, releaseDate: '2026-11-03'},
  {episode: 8, title: 'VisionQuest Season 1 Episode 8', row: 842, strictRow: 431, releaseDate: '2026-11-10'}
];

const extended = read('data/extended-vo.sources.json');
extended.generatedAt = generatedAt;
extended.version = 5;
const byTitle = new Map(extended.sources.map(source => [normalize(source.title), source]));
for (const item of vision) {
  let source = byTitle.get(normalize(item.title));
  if (!source) {
    source = {
      importKey: `extended-vo-visionquest-s1e${item.episode}`,
      row: item.row,
      title: item.title,
      type: 'Serial',
      status: 'Nierozpoczęte',
      date: 'May, 2028',
      dateApprox: false,
      releaseDate: item.releaseDate,
      universe: '199999',
      tags: ['EMCU']
    };
    extended.sources.push(source);
    byTitle.set(normalize(item.title), source);
  }
  source.row = item.row;
  source.date = 'May, 2028';
  source.dateApprox = false;
  source.releaseDate = item.releaseDate;
}
for (const source of extended.sources) {
  if (source.title === 'Wonderman Season 1 Episode 8: Yucca Valley') Object.assign(source, {row: 843, date: 'Sep, 2028', dateApprox: false});
  if (source.title === 'Spider-Man: Brand New Day') source.row = 844;
  if (source.title === 'Logan') source.row = 845;
}
extended.sources.sort((a, b) => Number(a.row) - Number(b.row));
extended.rowCount = extended.sources.length;
write('data/extended-vo.sources.json', extended);

const strict = read('data/strict-vo.sources.json');
strict.retrievedAt = generatedAt;
strict.version = 3;
strict.sources = strict.sources.filter(source => !/^VisionQuest Season 1 Episode [1-8]/.test(source.title));
for (const item of vision) strict.sources.push({row: item.strictRow, date: 'May, 2028', title: item.title, universe: '199999', tag: 'SMU'});
for (const source of strict.sources) {
  if (source.title === 'Wonderman Season 1 Episode 8: Yucca Valley') Object.assign(source, {row: 432, date: 'Sep, 2028'});
  if (source.title === 'Spider-Man: Brand New Day') source.row = 433;
}
strict.sources.sort((a, b) => Number(a.row) - Number(b.row));
write('data/strict-vo.sources.json', strict);

const metadata = read('data/source-metadata.json');
metadata.generatedAt = generatedAt;
const releases = [
  {row: 3262, date: 'Oct 20, 2026', title: vision[2].title, type: 'Disney+', length: '54', where: 'Disney+'},
  {row: 3263, date: 'Oct 20, 2026', title: vision[3].title, type: 'Disney+', length: '51', where: 'Disney+'},
  {row: 3264, date: 'Oct 27, 2026', title: vision[4].title, type: 'Disney+', length: '48', where: 'Disney+'},
  {row: 3265, date: 'Oct 27, 2026', title: vision[5].title, type: 'Disney+', length: '57', where: 'Disney+'}
];
for (const release of releases) {
  const index = metadata.releases.findIndex(item => normalize(item.title) === normalize(release.title));
  if (index >= 0) metadata.releases[index] = release;
  else metadata.releases.push(release);
}
metadata.releases.sort((a, b) => Number(a.row) - Number(b.row));
write('data/source-metadata.json', metadata);

const membership = read('data/extended-mcu.membership.json');
membership.retrievedAt = generatedAt;
membership.version = 2;
const newMemberships = [
  [2533, 'Outside of Time', 'What If...? Season 2 Episode 7: What If... Hela Found the Ten Rings?', 'TRN-1092'],
  [2534, 'Outside of Time', 'What If...? Season 2 Episode 8: What If... The Avengers Assembled in 1602?', 'TRN-1093'],
  [2535, 'Nexus of Realities', 'What If...? Season 2 Episode 9: What If... Supreme Strange Intervened?', 'Nexus'],
  [2536, 'Outside of Time', 'What If...? Season 3 Episode 1: What If... The Hulk Fought the Mech Avengers', 'TRN-1491'],
  [2537, 'Outside of Time', 'What If...? Season 3 Episode 2: What If... Agatha Went to Hollywood', 'TRN-1492'],
  [2538, 'Outside of Time', 'What If...? Season 3 Episode 3: What If... Red Guardian Stopped the Winter Soldier?', 'TRN-1493'],
  [2539, 'Outside of Time', 'What If...? Season 3 Episode 4: What If... Howard the Duck Got Hitched?', '72124'],
  [2540, 'Outside of Time', 'What If...? Season 3 Episode 5: What If... The Emergence Destroyed the Earth?', 'TRN-1494'],
  [2541, 'Outside of Time', 'What If...? Season 3 Episode 6: What If... 1872?', 'TRN-1495'],
  [2542, 'Outside of Time', 'What If...? Season 3 Episode 7: What If... The Watcher Disappeared?', 'Various'],
  [2543, 'Observational Plane', 'What If...? Season 3 Episode 8: What If... What If?', 'Observational']
].map(([row, date, title, universe]) => ({row, date, title, universe, tag: 'EMCU'}));
const membershipKeys = new Set(membership.sources.map(source => `${normalize(source.title)}|${normalize(source.universe)}`));
for (const source of newMemberships) {
  const key = `${normalize(source.title)}|${normalize(source.universe)}`;
  if (!membershipKeys.has(key)) membership.sources.push(source);
}
write('data/extended-mcu.membership.json', membership);

const order = read('data/vo-sheet-order.json');
order.generatedAt = generatedAt;
order.version = 3;
const replaceSheet = (name, entries) => {
  const sheet = order.sheets.find(item => item.name === name);
  sheet.entries = entries;
};
replaceSheet('Extended VO', extended.sources.map(({row, date, title, universe}) => ({row, date, title, universe})));
replaceSheet('Strict VO', strict.sources.map(({row, date, title, universe, tag}) => ({row, date, title, universe, tag})));
write('data/vo-sheet-order.json', order);

console.log(JSON.stringify({
  extendedVo: extended.sources.length,
  strictVo: strict.sources.length,
  releaseRows: metadata.releases.length,
  emcuMembershipRows: membership.sources.length,
  newVisionQuestSources: vision.slice(2).length,
  newEmcuMemberships: newMemberships.length
}, null, 2));
