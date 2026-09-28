import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../js/workbench.js', import.meta.url), 'utf8');

for (const fragment of [
  'source-release-date',
  'releaseDate:',
  'premiera:',
  'Data premiery / wydania'
]) {
  if (!app.includes(fragment)) {
    console.error(`Missing source release-date support: ${fragment}`);
    process.exit(1);
  }
}

console.log('Chronizo smoke-source-release-date OK');
