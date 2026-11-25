// Tombola, the staff's draw: pure functions over one small JSON object kept in localStorage.
// state = { lang: 'it'|'en'|'es', drawn: [n] (in the order they came out) }

export const KEY = 'tombola.staff.v1';
export const LANGS = ['it', 'en', 'es'];
export const ALL = Array.from({ length: 90 }, (_, i) => i + 1);

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

export const fresh = (lang = 'it') => ({ lang: LANGS.includes(lang) ? lang : 'it', drawn: [] });
export const setLang = (s, lang) => (LANGS.includes(lang) && lang !== s.lang ? { ...s, lang } : s);
export const remaining = s => ALL.filter(n => !s.drawn.includes(n));
export const last = s => s.drawn[s.drawn.length - 1] || null;

// "Draw": one of the numbers still in the bag.
export function draw(s, rng = secureRandomInt) {
  const left = remaining(s);
  if (!left.length) return s;
  return { ...s, drawn: [...s.drawn, left[rng(left.length)]] };
}

// "Undo last": the number goes back in the bag.
export const undo = s => (s.drawn.length ? { ...s, drawn: s.drawn.slice(0, -1) } : s);

// "New game".
export const reset = s => ({ ...s, drawn: [] });

export function isValid(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
  if (!LANGS.includes(s.lang) || !Array.isArray(s.drawn)) return false;
  return s.drawn.every(n => Number.isInteger(n) && n >= 1 && n <= 90) && new Set(s.drawn).size === s.drawn.length;
}

export function memoryStorage() {
  const m = new Map();
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: k => { m.delete(k); },
  };
}

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
