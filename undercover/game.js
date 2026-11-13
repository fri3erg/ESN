// Undercover state: pure functions over a small JSON object kept in localStorage.
// state = { me: number|null, target: number|null, mission: missionId|null,
//           used: [missionId] (missions already given in this round of the deck),
//           gone: [number] (people you eliminated or skipped as already out: never your target again),
//           kills: [{ n, target, mission, at: iso, sent: bool }], out: iso|null }
// target null after start means you went all the way round the circle: nobody left to hunt.
import { CHAIN } from './chain.js';
import { MISSIONS } from './missions.js';

export const KEY = 'undercover.v1';
export const MAX_NUMBER = CHAIN.length;
const IDS = MISSIONS.map(m => m.id);

export const mission = id => MISSIONS.find(m => m.id === id) || null;

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

export const fresh = () => ({ me: null, target: null, mission: null, used: [], gone: [], kills: [], out: null });

const isNumber = n => Number.isInteger(n) && n >= 1 && n <= MAX_NUMBER;
const after = n => CHAIN[(CHAIN.indexOf(n) + 1) % CHAIN.length];

// A random mission from the deck; when the deck is used up it starts again (not with the one just given).
function drawMission(state, rng) {
  let used = state.used;
  let pool = IDS.filter(id => !used.includes(id));
  if (!pool.length) {
    used = [];
    pool = IDS.length > 1 ? IDS.filter(id => id !== state.mission) : IDS;
  }
  const id = pool[rng(pool.length)];
  return { ...state, mission: id, used: [...used, id] };
}

// Next person round the circle after `from` who isn't out for you; back to yourself = nobody left.
function nextTarget(state, from, rng) {
  let t = after(from);
  while (t !== state.me && state.gone.includes(t)) t = after(t);
  if (t === state.me) return { ...state, target: null, mission: null };
  return drawMission({ ...state, target: t }, rng);
}

export function start(state, me, rng = secureRandomInt) {
  if (!isNumber(me)) return state;
  return nextTarget({ ...fresh(), me }, me, rng);
}

const hunting = s => s.me !== null && s.target !== null && s.out === null;

export function eliminate(state, now = new Date(), rng = secureRandomInt) {
  if (!hunting(state)) return state;
  const kill = { n: state.kills.length + 1, target: state.target, mission: state.mission, at: now.toISOString(), sent: false };
  return nextTarget({ ...state, kills: [...state.kills, kill], gone: [...state.gone, state.target] }, state.target, rng);
}

// "Already out / not here": go on to the next one without counting a kill.
export function skip(state, rng = secureRandomInt) {
  if (!hunting(state)) return state;
  return nextTarget({ ...state, gone: [...state.gone, state.target] }, state.target, rng);
}

export function gotOut(state, now = new Date()) {
  if (state.me === null || state.out !== null) return state;
  return { ...state, out: now.toISOString() };
}

export const isLastStanding = s => s.me !== null && s.target === null && s.out === null;

export const unsent = s => s.kills.filter(k => !k.sent);
export const markSent = (s, n) => ({ ...s, kills: s.kills.map(k => (k.n === n ? { ...k, sent: true } : k)) });

const isIso = v => typeof v === 'string' && !Number.isNaN(Date.parse(v));

export function isValid(s) {
  if (!s || typeof s !== 'object' || Array.isArray(s)) return false;
  if (!(s.me === null || isNumber(s.me))) return false;
  if (!(s.out === null || isIso(s.out))) return false;
  if (!Array.isArray(s.used) || !s.used.every(id => IDS.includes(id))) return false;
  if (!Array.isArray(s.gone) || !s.gone.every(isNumber)) return false;
  if (!Array.isArray(s.kills) || !s.kills.every((k, i) => k && k.n === i + 1 && isNumber(k.target) && typeof k.mission === 'string'
    && isIso(k.at) && typeof k.sent === 'boolean')) return false;
  if (s.me === null) return s.target === null && s.mission === null && !s.kills.length;
  if (s.target === null) return s.mission === null;
  return isNumber(s.target) && s.target !== s.me && IDS.includes(s.mission);
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
    ls.setItem('__uc_test', '1');
    ls.removeItem('__uc_test');
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
