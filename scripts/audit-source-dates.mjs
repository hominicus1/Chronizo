import fs from 'node:fs';
import assert from 'node:assert/strict';

const packFiles=['data/extended-vo.sources.json','data/multiversal-vo.sources.json'];
const acceptedDate=/^(?:[A-Z][a-z]{2}(?:\/[A-Z][a-z]{2})?(?: \d{1,2})?, \d{4}|\d{4}|\d{4}-\d{4}|\d+(?:\.\d+)? (?:BC|AD)|Outside(?: of)? Time(?: and Space)?|Concurrent|-TVA-|-)$/;
let total=0;

for(const file of packFiles){
  const pack=JSON.parse(fs.readFileSync(file,'utf8'));
  assert.equal(pack.format,'chronizo-source-pack',`${file}: invalid format`);
  assert.ok(pack.version>=3,`${file}: stale pack version`);
  assert.equal(pack.sources.length,pack.rowCount,`${file}: rowCount mismatch`);
  assert.equal(new Set(pack.sources.map(source=>source.importKey)).size,pack.sources.length,`${file}: duplicate import key`);
  let previous=Number.NEGATIVE_INFINITY;
  for(const source of pack.sources){
    const order=Number(source.orderRow??source.row);
    assert.ok(Number.isFinite(order),`${file}: missing order for ${source.title}`);
    assert.ok(order>=previous,`${file}: order inversion at ${source.title}`);
    previous=order;
    assert.ok(acceptedDate.test(String(source.date||'')),`${file}: unsupported date “${source.date}” at ${source.title}`);
  }
  total+=pack.sources.length;
}

const metadata=JSON.parse(fs.readFileSync('data/source-metadata.json','utf8'));
for(const release of metadata.releases||[])
  assert.match(release.date,/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/,`invalid release date for ${release.title}`);

const mvo=JSON.parse(fs.readFileSync('data/multiversal-vo.sources.json','utf8'));
const meetSpidey=mvo.sources.filter(source=>/^Meet Spidey and His Amazing Friends Season 1 Episode [1-9]:/.test(source.title));
assert.equal(meetSpidey.length,9,'Meet Spidey season 1 repair must contain nine episodes');
assert.ok(meetSpidey.every(source=>source.orderRow>2418&&source.orderRow<2419),'Meet Spidey order rows are outside their intended MVO slot');
assert.ok(mvo.sources.indexOf(meetSpidey[0])>2000,'Meet Spidey records leaked to the beginning of the MVO pack');

console.log(`Source date audit: OK · ${total} sources · ${metadata.releases.length} release dates`);
