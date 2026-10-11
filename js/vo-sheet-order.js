const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’‘]/g, "'").replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
const universe = value => normalize(value).replace(/^framework$/, 'fw').replace(/^earth-/, '').replace(/[✩★*]+$/, '').replace(/\s+/g, '');
const identity = (title, worlds) => [normalize(title), worlds.map(universe).sort().join('/')].join('|');

export function applyVoSheetOrder(project, pack) {
  const worlds = new Map((project.worlds || []).map(world => [world.id, world.designation || (world.number ? `Earth-${world.number}` : world.name)]));
  const entries = new Map();
  for (const sheet of pack.sheets) for (const entry of sheet.entries) {
    const key = identity(entry.title, entry.universe.split('/').map(value => value.trim()).filter(Boolean));
    if (!entries.has(key)) entries.set(key, {});
    const membership = entries.get(key);
    (membership[sheet.tag] ||= []).push({row: entry.row, date: entry.date});
  }
  for (const source of project.sources || []) {
    const imported = [source.importKey, ...(source.importKeys || [])].some(key => /^(extended|multiversal)-vo-|^mini-verse-vo-/.test(key || ''));
    source.sheetEntries = imported ? entries.get(identity(source.title, (source.worldIds || []).map(id => worlds.get(id)).filter(Boolean))) || {} : {};
    source.sheetOrderSynced = true;
  }
  project.catalogMigrations = [...new Set([...(project.catalogMigrations || []), 'vo-sheet-order-2026-10-11'])];
}

export function sheetOrderSources(sources, tag) {
  return sources.flatMap(source => (source.sheetEntries?.[tag] || []).map(entry => ({...source, date: entry.date, _sheetRow: entry.row})));
}

export function insertAdditionalSources(rows, sources, dateKey) {
  const ordered = rows.slice().sort((a, b) => a._sheetRow - b._sheetRow);
  const represented = new Set(ordered.map(source => source.id));
  const positions = new Map();
  for (const row of ordered) if (!positions.has(row.id)) positions.set(row.id, row._sheetRow);
  const dated = ordered.map(source => ({row: source._sheetRow, date: dateKey(source)})).filter(item => Number.isFinite(item.date)).sort((a, b) => a.date - b.date || a.row - b.row);
  for (const source of sources) {
    if (represented.has(source.id)) continue;
    const related = (source.relatedSourceIds || []).map(id => positions.get(id)).filter(Number.isFinite);
    let row;
    if (related.length) row = Math.min(...related) + (source.relationType === 'prequel' ? -0.25 : 0.25);
    else {
      const date = dateKey(source), next = Number.isFinite(date) ? dated.find(item => item.date > date) : null;
      row = next ? next.row - 0.5 : Number.isFinite(date) && dated.length ? dated.at(-1).row + 0.5 : Number.POSITIVE_INFINITY;
    }
    ordered.push({...source, _sheetRow: row});
  }
  return ordered;
}
