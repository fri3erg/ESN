// Il filo invisibile: pure functions over one small JSON object kept in localStorage.
// state = { lang: 'it'|'en', phase: 'rules'|'look'|'card'|'switch'|'done',
//           deck: [cardId] (still to draw), card: cardId|null, cardAt: iso|null,
//           knots: [iso], completedAt: iso|null }
import { CARDS } from './deck.js';

export const KEY = 'filoinvisibile.v1';
export const GOAL = 3;
export const LANGS = ['it', 'en'];
const IDS = CARDS.map(c => c.id);
const PHASES = ['rules', 'look', 'card', 'switch', 'done'];

export const card = s => CARDS.find(c => c.id === s.card) || null;
export const knots = s => s.knots.length;
export const isComplete = s => s.knots.length >= GOAL;

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

export const fresh = (lang = 'en') => ({
  lang: LANGS.includes(lang) ? lang : 'en', phase: 'rules', deck: [], card: null, cardAt: null,
  knots: [], completedAt: null,
});

export const setLang = (s, lang) => (LANGS.includes(lang) && lang !== s.lang ? { ...s, lang } : s);

// "Start" on the rules: look around for someone to play with.
export const start = s => (s.phase === 'rules' ? { ...s, phase: 'look' } : s);

// Next card from the shuffled deck; a used-up deck is reshuffled, not starting with the card just shown.
function draw(s, now, rng) {
  let deck = s.deck.filter(id => IDS.includes(id));
  if (!deck.length) {
    deck = IDS.filter(id => id !== s.card || IDS.length === 1);
    for (let i = deck.length - 1; i > 0; i--) { const j = rng(i + 1); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  }
  const [next, ...rest] = deck;
  return { ...s, phase: 'card', deck: rest, card: next, cardAt: now.toISOString() };
}

// "We're ready" / "I found someone": the two of them read one card.
export const ready = (s, now = new Date(), rng = secureRandomInt) =>
  (['look', 'switch', 'done'].includes(s.phase) ? draw(s, now, rng) : s);

export const another = (s, now = new Date(), rng = secureRandomInt) => (s.phase === 'card' ? draw(s, now, rng) : s);

// Both said yes: one knot, the card closes. Only from a card on screen, so a double tap counts once.
export function tieKnot(s, now = new Date()) {
  if (s.phase !== 'card') return s;
  const ks = [...s.knots, now.toISOString()];
  const done = ks.length >= GOAL;
  return {
    ...s, knots: ks, card: null, cardAt: null,
    phase: done ? 'done' : 'switch',
    completedAt: s.completedAt || (done ? now.toISOString() : null),
  };
}

// "Back to the question": nothing changes.
export const keepTalking = s => s;

// With the ball of yarn complete, more cards just for fun.
export const playOn = s => (s.phase === 'done' ? { ...s, phase: 'switch' } : s);

// Secret combinations: TAPS taps, each within GAP ms of the previous one.
// SECRET: the ladybugs. MISSION: the birthday mission, much harder so it never opens by accident.
export const SECRET = { TAPS: 5, GAP: 600 };
export const MISSION = { TAPS: 10, GAP: 400 };
export function secretTap(taps, now, rule = SECRET) {
  const kept = taps.length && now - taps[taps.length - 1] <= rule.GAP ? [...taps, now] : [now];
  return kept.length >= rule.TAPS ? { taps: [], hit: true } : { taps: kept, hit: false };
}

const isIso = v => typeof v === 'string' && !Number.isNaN(Date.parse(v));

export function isValid(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
  if (!LANGS.includes(s.lang) || !PHASES.includes(s.phase)) return false;
  if (!Array.isArray(s.deck) || !s.deck.every(id => IDS.includes(id))) return false;
  if (!Array.isArray(s.knots) || !s.knots.every(isIso)) return false;
  if (!(s.completedAt === null || isIso(s.completedAt))) return false;
  if (s.phase === 'card') return IDS.includes(s.card) && isIso(s.cardAt);
  return s.card === null;
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
    ls.setItem('__fi_test', '1');
    ls.removeItem('__fi_test');
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
