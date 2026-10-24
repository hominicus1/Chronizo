import assert from 'node:assert/strict';
import fs from 'node:fs';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../js/workbench-alpha84.js',import.meta.url),'utf8');
assert.match(html,/id="load-marvel-project"/);
assert.match(html,/Otwórz projekt Marvel/);
assert.match(html,/workbench-alpha84\.js/);
for(const value of ['openMarvelProject','Road-to-Doomsday-Biblia-Chronizo-alpha83.chronizo.json','chronizo-marvel-alpha83','project-road-to-doomsday-complete'])assert.ok(js.includes(value),`missing ${value}`);
assert.match(js,/\$\('#load-marvel-project'\)\.addEventListener\('click',openMarvelProject\)/);
console.log('Marvel project loader: OK');
