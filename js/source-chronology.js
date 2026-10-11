const months = {jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
const calendarKey = (year, month = 1, day = 1) => Number(year) + (Number(month) - 1) / 12 + (Number(day) - 1) / 372;
const collator = new Intl.Collator('pl', {sensitivity:'base', numeric:true});
export const compareSourceTitles = (a, b) => collator.compare(a.title || '', b.title || '');

export function chronologyKey(value = '') {
  const text = String(value).trim();
  if (!text) return Infinity;
  const before = text.match(/^Przed\s+(.+)$/i);
  if (before) return chronologyKey(before[1]) - 0.0001;
  if (/^(beginning of time|początek czasu)$/i.test(text)) return -Infinity;
  let match = text.match(/^(\d+(?:\.\d+)?)\s*(BC|BCE|p\.n\.e\.)$/i);
  if (match) return -Number(match[1]);
  match = text.match(/^(-?\d+(?:\.\d+)?)\s*(AD|CE|n\.e\.)?$/i);
  if (match) return Number(match[1]);
  match = text.match(/^(-?\d{1,6})-(\d{2})-(\d{2})$/);
  if (match) return calendarKey(match[1], match[2], match[3]);
  match = text.match(/^(\d{4})-(\d{4})$/);
  if (match) return Number(match[1]);
  match = text.match(/^([A-Za-z]{3})(?:\/[A-Za-z]{3})?(?:\s+(\d{1,2}))?,?\s+(\d{4})$/);
  if (match && months[match[1].toLowerCase()]) return calendarKey(match[3], months[match[1].toLowerCase()], match[2] || 1);
  match = text.match(/^(\d{4})-(\d{2})$/);
  return match ? calendarKey(match[1], match[2]) : Infinity;
}

export function sourceActionKey(source, sources = [], visited = new Set()) {
  if (visited.has(source.id)) return Infinity;
  visited.add(source.id);
  const action = String(source.date || '').trim();
  if (/^(outside of time|outside time|-tva-|tva)$/i.test(action)) return chronologyKey(source.releaseDate);
  const own = chronologyKey(action);
  if (own !== Infinity) return own;
  const related = (source.relatedSourceIds || []).map(id => sources.find(item => item.id === id)).filter(Boolean);
  const dates = related.map(item => sourceActionKey(item, sources, new Set(visited))).filter(Number.isFinite);
  if (dates.length) return Math.min(...dates) + (source.relationType === 'prequel' ? -0.0001 : 0);
  return chronologyKey(source.releaseDate);
}
