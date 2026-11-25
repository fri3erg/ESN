// Tombola, the player's card: pure functions over one small JSON object kept in localStorage.
// state = { lang: 'it'|'en'|'es', phase: 'rules'|'card', card: [[9 numbers, 0 = empty] × 3] | null,
//           marked: [n], best: 0..5 (index in WINS, the highest win reached), tombolaAt: iso|null }

export const KEY = 'tombola.player.v1';
export const LANGS = ['it', 'en', 'es'];
// best/level: 0 nothing yet, 1 ambo (2 on a row), 2 terno, 3 quaterna, 4 cinquina (5), 5 tombola (all 15).
export const WINS = ['', 'ambo', 'terno', 'quaterna', 'cinquina', 'tombola'];
const TOMBOLA = 5;

// Uniform integer in 0..n-1. crypto with rejection sampling (no modulo bias), else Math.random.
export function secureRandomInt(n) {
  const c = globalThis.crypto;
  if (c && typeof c.getRandomValues === 'function') {
    const limit = Math.floor(0x100000000 / n) * n;
    const buf = new Uint32Array(1);
    do { c.getRandomValues(buf); } while (buf[0] >= limit);
    return buf[0] % n;
  }
  return Math.floor(Math.random() * n);
}

function shuffle(list, rng) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = rng(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Column of a number on the card: 1–9 → 0, 10–19 → 1 … 80–90 → 8.
export const column = n => Math.min(8, Math.floor(n / 10));
const range = c => {
  const lo = c === 0 ? 1 : c * 10, hi = c === 8 ? 90 : c * 10 + 9;
  return Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
};

// A real cartella: 3 rows × 9 columns, 5 numbers a row, every column used (1 to 3 numbers), sorted going down.
export function makeCard(rng = secureRandomInt) {
  const counts = Array(9).fill(1);
  for (let extra = 6; extra > 0;) {
    const c = rng(9);
    if (counts[c] < 3) { counts[c]++; extra--; }
  }
  // Fill the fullest columns first, each into the rows with the most room left (random among equals).
  const left = [5, 5, 5];
  const rowsOf = Array(9);
  for (const c of shuffle([...Array(9).keys()], rng).sort((a, b) => counts[b] - counts[a])) {
    const rows = shuffle([0, 1, 2], rng).sort((a, b) => left[b] - left[a]).slice(0, counts[c]).sort();
    for (const r of rows) left[r]--;
    rowsOf[c] = rows;
  }
  const card = [Array(9).fill(0), Array(9).fill(0), Array(9).fill(0)];
  for (let c = 0; c < 9; c++) {
    const picked = shuffle(range(c), rng).slice(0, counts[c]).sort((a, b) => a - b);
    rowsOf[c].forEach((r, i) => { card[r][c] = picked[i]; });
  }
  return card;
}

export const numbers = s => (s.card ? s.card.flat().filter(Boolean) : []);

export const fresh = (lang = 'en') => ({
  lang: LANGS.includes(lang) ? lang : 'en', phase: 'rules', card: null, marked: [], best: 0, tombolaAt: null,
});

export const setLang = (s, lang) => (LANGS.includes(lang) && lang !== s.lang ? { ...s, lang } : s);

// "Get my card" / "New card".
export const deal = (s, rng = secureRandomInt) => ({ ...s, phase: 'card', card: makeCard(rng), marked: [], best: 0, tombolaAt: null });

// "Same card, clear the marks".
export const clearMarks = s => ({ ...s, marked: [], best: 0, tombolaAt: null });

// The win the marks show right now.
export function level(s) {
  if (!s.card) return 0;
  if (numbers(s).every(n => s.marked.includes(n))) return TOMBOLA;
  const bestRow = Math.max(...s.card.map(row => row.filter(n => n && s.marked.includes(n)).length));
  return bestRow >= 2 ? bestRow - 1 : 0;
}

// Tap a number: cross it out, or take the mark away. best only goes up, so a win flashes once.
export function toggle(s, n, now = new Date()) {
  if (s.phase !== 'card' || !numbers(s).includes(n)) return s;
  const marked = s.marked.includes(n) ? s.marked.filter(m => m !== n) : [...s.marked, n];
  const next = { ...s, marked };
  const best = Math.max(s.best, level(next));
  return { ...next, best, tombolaAt: s.tombolaAt || (best === TOMBOLA ? now.toISOString() : null) };
}

const isIso = v => typeof v === 'string' && !Number.isNaN(Date.parse(v));

export function isValid(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
  if (!LANGS.includes(s.lang) || !['rules', 'card'].includes(s.phase)) return false;
  if (!Number.isInteger(s.best) || s.best < 0 || s.best > TOMBOLA) return false;
  if (!(s.tombolaAt === null || isIso(s.tombolaAt))) return false;
  if (!Array.isArray(s.marked)) return false;
  if (s.card === null) return s.phase === 'rules' && s.marked.length === 0;
  if (!Array.isArray(s.card) || s.card.length !== 3) return false;
  if (!s.card.every(row => Array.isArray(row) && row.length === 9 && row.every((n, c) => n === 0 || (Number.isInteger(n) && n >= 1 && n <= 90 && column(n) === c)))) return false;
  const all = numbers(s);
  return all.length === 15 && s.marked.every(n => all.includes(n));
}

export function memoryStorage() {
  const m = new Map();
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: k => { m.delete(k); },
  };
}

// localStorage when it works; in private mode (or anywhere it throws) an in-memory store for this visit.
export function safeStorage() {
  try {
    const ls = globalThis.localStorage;
    ls.setItem('__tb_test', '1');
    ls.removeItem('__tb_test');
    return ls;
  } catch {
    return memoryStorage();
  }
}

export function load(storage) {
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return isValid(s) ? s : null;
  } catch {
    return null;
  }
}

export function save(storage, s) {
  try { storage.setItem(KEY, JSON.stringify(s)); } catch { /* full or blocked: keep going in memory */ }
}

export function clear(storage) {
  try { storage.removeItem(KEY); } catch { /* ignore */ }
}

export function formatTime(iso) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
