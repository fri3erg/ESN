// Tandem Passport state: pure functions over a small JSON object kept in localStorage.
// state = { name, slots: [missionId|null x SLOTS], stamps: { missionId: iso }, word: {word, meaning}|null,
//           completedAt: iso|null, drawNo: int|null, sent: bool (the finish reached the organisers' Telegram) }
import { MISSIONS } from './missions.js';

export const KEY = 'tandempassport.v1';
export const SLOTS = MISSIONS.length;
export const NAME_MAX = 40;
const IDS = MISSIONS.map(m => m.id);

export function mission(id) {
  return MISSIONS.find(m => m.id === id) || null;
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

export function fresh() {
  return { name: '', slots: Array(SLOTS).fill(null), stamps: {}, word: null, completedAt: null, drawNo: null, sent: false };
}

// The name goes to the prize draw: control characters out, spaces squashed, capped.
export function setName(state, name) {
  const clean = String(name ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, NAME_MAX).trim();
  return { ...state, name: clean };
}
export const hasName = state => state.name.length > 0;

export const needsSending = state => isComplete(state) && !state.sent;
export const markSent = state => (isComplete(state) ? { ...state, sent: true } : state);

// Play again: a blank passport for the same person.
export const restart = state => ({ ...fresh(), name: state.name });

// Tapping a "?" slot puts a random mission that isn't in the passport yet behind it.
export function reveal(state, slot, rng = secureRandomInt) {
  if (!Number.isInteger(slot) || slot < 0 || slot >= SLOTS || state.slots[slot] !== null) return state;
  const pool = IDS.filter(id => !state.slots.includes(id));
  if (!pool.length) return state;
  const slots = [...state.slots];
  slots[slot] = pool[rng(pool.length)];
  return { ...state, slots };
}

export const isStamped = (state, id) => !!state.stamps[id];
export const stampCount = state => Object.keys(state.stamps).length;
export const isComplete = state => stampCount(state) === SLOTS;

// note: { word, meaning } for the mission with input: true (the word is required).
export function stamp(state, id, now = new Date(), rng = secureRandomInt, note) {
  const m = mission(id);
  if (!m || !state.slots.includes(id) || isStamped(state, id)) return state;
  let word = state.word;
  if (m.input) {
    const w = String(note?.word ?? '').trim();
    if (!w) return state;
    word = { word: w, meaning: String(note?.meaning ?? '').trim() };
  }
  const next = { ...state, word, stamps: { ...state.stamps, [id]: now.toISOString() } };
  if (isComplete(next)) {
    next.completedAt = now.toISOString();
    next.drawNo = 1000 + rng(9000);
  }
  return next;
}

const isIso = v => typeof v === 'string' && !Number.isNaN(Date.parse(v));

export function isValid(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
  if (typeof s.name !== 'string' || s.name.length > NAME_MAX || typeof s.sent !== 'boolean') return false;
  if (!Array.isArray(s.slots) || s.slots.length !== SLOTS) return false;
  const shown = s.slots.filter(x => x !== null);
  if (!shown.every(id => IDS.includes(id)) || new Set(shown).size !== shown.length) return false;
  if (!s.stamps || typeof s.stamps !== 'object' || Array.isArray(s.stamps)) return false;
  if (!Object.entries(s.stamps).every(([id, t]) => shown.includes(id) && isIso(t))) return false;
  if (s.word !== null && !(s.word && typeof s.word.word === 'string' && typeof s.word.meaning === 'string')) return false;
  if (isComplete(s)) return isIso(s.completedAt) && Number.isInteger(s.drawNo) && s.drawNo >= 1000 && s.drawNo <= 9999;
  return s.completedAt === null && s.drawNo === null;
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
    ls.setItem('__tp_test', '1');
    ls.removeItem('__tp_test');
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

export function formatTime(iso) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export const formatDraw = n => String(n).padStart(4, '0');
