// Taboo state: pure functions over a small JSON object kept in localStorage.
// state = { deck: { order: [word...], next }, round: null | { endAt, pausedLeft, current, results, finishedAt } }
import { WORDS } from './words.js';

export const KEY = 'taboo.v1';
export const ROUND_MS = 120000;
export const CANDY_AT = 5;
export const RESULTS = ['got', 'taboo', 'skip'];
const ALL = WORDS.map(w => w.word);

export function card(word) {
  return WORDS.find(w => w.word === word) || null;
}

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

export function shuffle(arr, rng = secureRandomInt) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rng(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function fresh(rng = secureRandomInt) {
  return { deck: { order: shuffle(ALL, rng), next: 0 }, round: null };
}

// Next card from the deck. When it runs out, reshuffle, never opening with the card just shown.
function draw(deck, last, rng) {
  let { order, next } = deck;
  if (next >= order.length) {
    order = shuffle(ALL, rng);
    if (order.length > 1 && order[0] === last) {
      const j = 1 + rng(order.length - 1);
      [order[0], order[j]] = [order[j], order[0]];
    }
    next = 0;
  }
  return { word: order[next], deck: { order, next: next + 1 } };
}

export function start(state, now = Date.now(), rng = secureRandomInt) {
  const { word, deck } = draw(state.deck, state.round?.current ?? null, rng);
  return { deck, round: { endAt: now + ROUND_MS, pausedLeft: null, current: word, results: [], finishedAt: null } };
}

export function timeLeft(round, now = Date.now()) {
  if (round.pausedLeft != null) return round.pausedLeft;
  return Math.max(0, round.endAt - now);
}

const live = (round, now) => !!round && !round.finishedAt && round.pausedLeft == null && timeLeft(round, now) > 0;

export function answer(state, result, now = Date.now(), rng = secureRandomInt) {
  if (!RESULTS.includes(result) || !live(state.round, now)) return state;
  const { word, deck } = draw(state.deck, state.round.current, rng);
  const results = [...state.round.results, { word: state.round.current, result }];
  return { deck, round: { ...state.round, current: word, results } };
}

export function pause(state, now = Date.now()) {
  if (!live(state.round, now)) return state;
  return { ...state, round: { ...state.round, pausedLeft: timeLeft(state.round, now) } };
}

export function resume(state, now = Date.now()) {
  const r = state.round;
  if (!r || r.finishedAt || r.pausedLeft == null) return state;
  return { ...state, round: { ...r, endAt: now + r.pausedLeft, pausedLeft: null } };
}

export function finish(state, now = Date.now()) {
  const r = state.round;
  if (!r || r.finishedAt || timeLeft(r, now) > 0) return state;
  return { ...state, round: { ...r, finishedAt: new Date(now).toISOString() } };
}

export const guessed = round => round.results.filter(r => r.result === 'got').map(r => r.word);
export const score = round => guessed(round).length;
export const earnsCandy = n => n >= CANDY_AT;

function isValidRound(r) {
  if (r === null) return true;
  if (!r || typeof r !== 'object' || Array.isArray(r)) return false;
  if (!Number.isFinite(r.endAt)) return false;
  if (r.pausedLeft !== null && !(Number.isFinite(r.pausedLeft) && r.pausedLeft >= 0 && r.pausedLeft <= ROUND_MS)) return false;
  if (!ALL.includes(r.current)) return false;
  if (!Array.isArray(r.results) || !r.results.every(x => x && ALL.includes(x.word) && RESULTS.includes(x.result))) return false;
  return r.finishedAt === null || (typeof r.finishedAt === 'string' && !Number.isNaN(Date.parse(r.finishedAt)));
}

export function isValid(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
  const d = s.deck;
  if (!d || !Array.isArray(d.order) || d.order.length !== ALL.length) return false;
  if (new Set(d.order).size !== ALL.length || !d.order.every(w => ALL.includes(w))) return false;
  if (!Number.isInteger(d.next) || d.next < 0 || d.next > ALL.length) return false;
  return isValidRound(s.round);
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

export function save(storage, state) {
  try { storage.setItem(KEY, JSON.stringify(state)); } catch { /* full or blocked: keep going in memory */ }
}

export function clear(storage) {
  try { storage.removeItem(KEY); } catch { /* ignore */ }
}

// m:ss, rounded up so the clock reads 2:00 at the start and only shows 0:00 when time is really up.
export function formatClock(ms) {
  const s = Math.ceil(Math.max(0, ms) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function formatTime(iso) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
