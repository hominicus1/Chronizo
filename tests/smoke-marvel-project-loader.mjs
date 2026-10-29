import assert from 'node:assert/strict';
import fs from 'node:fs';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../js/workbench-alpha85.js',import.meta.url),'utf8');
assert.match(html,/id="load-marvel-project"/);
assert.match(html,/Otwórz projekt Marvel/);
assert.match(html,/workbench-alpha85\.js/);
for(const value of ['openMarvelProject','data/chronizo-marvel-alpha85.json.gz?v=1','DecompressionStream','Road-to-Doomsday-Biblia-Chronizo-alpha83.chronizo.json?v=85','chronizo-marvel-alpha85','project-road-to-doomsday-complete'])assert.ok(js.includes(value),`missing ${value}`);
assert.match(js,/\$\('#load-marvel-project'\)\.addEventListener\('click',openMarvelProject\)/);
console.log('Marvel project loader: OK');
