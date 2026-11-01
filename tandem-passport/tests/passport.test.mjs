import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../passport.js';
import { MISSIONS } from '../missions.js';

const first = () => 0;
const T = new Date(2026, 10, 5, 22, 41, 7);
const reveal = (s, slot) => P.reveal(s, slot, first);
const stampAll = (rng = P.secureRandomInt) => {
  let s = P.fresh();
  for (let i = 0; i < P.SLOTS; i++) {
    s = P.reveal(s, i, rng);
    const m = P.mission(s.slots[i]);
    s = P.stamp(s, m.id, T, rng, m.input ? { word: 'gezellig', meaning: 'cosy' } : undefined);
  }
  return s;
};

test('one slot per mission, all empty at the start', () => {
  const s = P.fresh();
  assert.equal(P.SLOTS, MISSIONS.length);
  assert.deepEqual(s.slots, Array(P.SLOTS).fill(null));
  assert.equal(P.stampCount(s), 0);
  assert.equal(P.isComplete(s), false);
});

test('revealing a slot gives a mission not already in the passport', () => {
  let s = P.fresh();
  for (let i = 0; i < P.SLOTS; i++) s = reveal(s, i);
  assert.deepEqual([...s.slots].sort(), MISSIONS.map(m => m.id).sort());
});

test('slots reveal in any order and the missions come out random', () => {
  const firsts = new Map(), N = 6000;
  for (let i = 0; i < N; i++) { const id = P.reveal(P.fresh(), 3).slots[3]; firsts.set(id, (firsts.get(id) || 0) + 1); }
  assert.equal(firsts.size, MISSIONS.length);
  for (const c of firsts.values()) assert.ok(c > N / MISSIONS.length * 0.8 && c < N / MISSIONS.length * 1.2, String(c));
});

test('revealing an already revealed slot or a bad slot changes nothing', () => {
  const s = reveal(P.fresh(), 2);
  assert.deepEqual(reveal(s, 2), s);
  assert.deepEqual(reveal(s, 6), s);
  assert.deepEqual(reveal(s, -1), s);
});

test('stamp marks the mission with the time; twice keeps the first time', () => {
  let s = reveal(P.fresh(), 0);
  const id = s.slots[0];
  const m = P.mission(id);
  s = P.stamp(s, id, T, first, m.input ? { word: 'x', meaning: '' } : undefined);
  assert.equal(s.stamps[id], T.toISOString());
  assert.equal(P.stampCount(s), 1);
  assert.deepEqual(P.stamp(s, id, new Date(2026, 10, 5, 23, 0)), s);
});

test('cannot stamp a mission that is not revealed yet', () => {
  const s = P.fresh();
  assert.deepEqual(P.stamp(s, 'bologna', T), s);
  assert.deepEqual(P.stamp(s, 'nope', T), s);
});

test('Word Exchange needs the word before it can be stamped, and saves it', () => {
  let s = P.fresh();
  let i = 0;
  while (s.slots.indexOf('word') === -1) s = P.reveal(s, i++);
  assert.deepEqual(P.stamp(s, 'word', T), s);
  assert.deepEqual(P.stamp(s, 'word', T, first, { word: '   ', meaning: 'x' }), s);
  s = P.stamp(s, 'word', T, first, { word: ' gezellig ', meaning: ' cosy, nice together ' });
  assert.deepEqual(s.word, { word: 'gezellig', meaning: 'cosy, nice together' });
  assert.ok(s.stamps.word);
});

test('the last stamp completes the passport with a time and a draw number', () => {
  const s = stampAll();
  assert.equal(P.isComplete(s), true);
  assert.equal(s.completedAt, T.toISOString());
  assert.ok(Number.isInteger(s.drawNo) && s.drawNo >= 1000 && s.drawNo <= 9999, String(s.drawNo));
  const s5 = (() => { let x = P.fresh(); for (let i = 0; i < 5; i++) { x = reveal(x, i); const m = P.mission(x.slots[i]); x = P.stamp(x, m.id, T, first, m.input ? { word: 'a', meaning: '' } : undefined); } return x; })();
  assert.equal(P.isComplete(s5), false);
  assert.equal(s5.completedAt, null);
  assert.equal(s5.drawNo, null);
});

test('the player name is trimmed, capped and required to start', () => {
  assert.equal(P.hasName(P.fresh()), false);
  const s = P.setName(P.fresh(), '   Anna   Rossi  ');
  assert.equal(s.name, 'Anna Rossi');
  assert.equal(P.hasName(s), true);
  assert.equal(P.setName(P.fresh(), 'x'.repeat(80)).name.length, P.NAME_MAX);
  assert.equal(P.hasName(P.setName(P.fresh(), '   ')), false);
  assert.equal(P.setName(P.fresh(), 'Ann\u0000a\n').name, 'Ann a');
});

test('the finish is reported once: markSent only after completing', () => {
  const s = stampAll();
  assert.equal(s.sent, false);
  assert.equal(P.needsSending(s), true);
  const done = P.markSent(s);
  assert.equal(done.sent, true);
  assert.equal(P.needsSending(done), false);
  assert.deepEqual(P.markSent(P.fresh()), P.fresh());
  assert.equal(P.needsSending(P.fresh()), false);
});

test('a new passport keeps the name', () => {
  const s = P.restart(P.markSent(P.setName(stampAll(), 'Anna')));
  assert.deepEqual(s, { ...P.fresh(), name: 'Anna' });
});

test('formatTime and formatDraw', () => {
  assert.equal(P.formatTime(new Date(2026, 10, 5, 7, 5).toISOString()), '07:05');
  assert.equal(P.formatDraw(427), '0427');
  assert.equal(P.formatDraw(9999), '9999');
});

test('save/load round-trips, clear removes', () => {
  const st = P.memoryStorage();
  const s = stampAll();
  P.save(st, s);
  assert.deepEqual(P.load(st), s);
  P.clear(st);
  assert.equal(P.load(st), null);
});

test('load treats corrupt or outdated data as no passport', () => {
  const st = P.memoryStorage();
  const good = stampAll();
  const bad = [
    '{nope', 'null', '42', '[]',
    JSON.stringify({ ...good, slots: good.slots.slice(1) }),
    JSON.stringify({ ...good, slots: ['word', 'word', null, null, null, null] }),
    JSON.stringify({ ...good, slots: ['ghost', null, null, null, null, null] }),
    JSON.stringify({ ...P.fresh(), stamps: { bologna: T.toISOString() } }),          // stamped but never revealed
    JSON.stringify({ ...good, stamps: { ...good.stamps, word: 'yesterday' } }),
    JSON.stringify({ ...good, drawNo: 12 }),
    JSON.stringify({ ...good, completedAt: null }),
    JSON.stringify({ ...good, name: 42 }),
    JSON.stringify({ ...good, sent: 'yes' }),
  ];
  for (const raw of bad) { st.setItem(P.KEY, raw); assert.equal(P.load(st), null, raw); }
});

test('a throwing storage never throws out of load/save/clear', () => {
  const boom = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); }, removeItem() { throw new Error('x'); } };
  assert.equal(P.load(boom), null);
  assert.doesNotThrow(() => P.save(boom, P.fresh()));
  assert.doesNotThrow(() => P.clear(boom));
});

test('safeStorage falls back to memory when localStorage is missing', () => {
  const st = P.safeStorage();
  st.setItem('a', '1');
  assert.equal(st.getItem('a'), '1');
});
