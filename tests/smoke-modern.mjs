import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../js/modern.js',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/modern.css',import.meta.url),'utf8');
for(const id of ['world-tabs','story-map','tag-filters','inspector','add-dialog'])assert.match(html,new RegExp('id=["\\\']'+id+'["\\\']'));
for(const concept of ['earth-616','travel-segment','WORLD SHIFT','mentioned-line'])assert.ok(js.includes(concept),'missing '+concept);
assert.ok(css.includes('@media(max-width:720px)'));
console.log('modern UI smoke: OK');
