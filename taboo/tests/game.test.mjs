import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../game.js';
import { WORDS } from '../words.js';

const first = () => 0;                 // rng that always picks index 0
const T0 = Date.UTC(2026, 10, 1, 21, 0, 0);
const started = (rng = first) => G.start(G.fresh(rng), T0, rng);

test('round is 2 minutes and a candy needs 5', () => {
  assert.equal(G.ROUND_MS, 120000);
  assert.equal(G.CANDY_AT, 5);
  assert.equal(G.earnsCandy(4), false);
  assert.equal(G.earnsCandy(5), true);
});

test('shuffle keeps every card exactly once and is uniform-ish', () => {
  const s = G.shuffle(WORDS.map(w => w.word));
  assert.deepEqual([...s].sort(), WORDS.map(w => w.word).sort());
  const firstCounts = new Map(), N = 6000;
  for (let i = 0; i < N; i++) { const k = G.shuffle(['a', 'b', 'c'])[0]; firstCounts.set(k, (firstCounts.get(k) || 0) + 1); }
  for (const c of firstCounts.values()) assert.ok(c > N / 3 * 0.85 && c < N / 3 * 1.15, String(c));
});

test('secureRandomInt stays in range', () => {
  for (let i = 0; i < 2000; i++) { const v = G.secureRandomInt(7); assert.ok(v >= 0 && v < 7 && Number.isInteger(v)); }
});

test('a whole deck goes by before any card repeats, then it reshuffles without repeating the last card', () => {
  let s = started(G.secureRandomInt);
  const seen = [s.round.current];
  for (let i = 1; i < WORDS.length; i++) { s = G.answer(s, 'taboo', T0 + i); seen.push(s.round.current); }
  assert.equal(new Set(seen).size, WORDS.length);
  for (let k = 0; k < 50; k++) {
    const last = s.round.current;
    s = G.answer(s, 'taboo', T0 + 100);
    assert.notEqual(s.round.current, last);
  }
});

test('the next round continues the same deck, so cards are not repeated across rounds', () => {
  let s = started(G.secureRandomInt);
  const r1 = [s.round.current];
  for (let i = 0; i < 9; i++) { s = G.answer(s, 'got', T0 + i); r1.push(s.round.current); }
  s = G.finish(s, T0 + G.ROUND_MS);
  s = G.start(s, T0 + 200000);
  const r2 = [s.round.current];
  for (let i = 0; i < 9; i++) { s = G.answer(s, 'got', T0 + 200001 + i); r2.push(s.round.current); }
  assert.equal(r1.filter(w => r2.includes(w)).length, 0);
});

test('only ✓ scores; ✗ and skip just move on', () => {
  let s = started();
  const a = s.round.current;
  s = G.answer(s, 'got', T0 + 1000);
  const b = s.round.current;
  s = G.answer(s, 'taboo', T0 + 2000);
  s = G.answer(s, 'skip', T0 + 3000);
  s = G.answer(s, 'got', T0 + 4000);
  assert.equal(G.score(s.round), 2);
  assert.deepEqual(s.round.results.map(r => r.result), ['got', 'taboo', 'skip', 'got']);
  assert.equal(s.round.results[0].word, a);
  assert.equal(s.round.results[1].word, b);
  assert.equal(G.guessed(s.round).length, 2);
  assert.equal(G.guessed(s.round)[0], a);
});

test('unknown answers, answers after time is up and answers while paused are ignored', () => {
  let s = started();
  assert.deepEqual(G.answer(s, 'cheat', T0 + 1), s);
  assert.deepEqual(G.answer(s, 'got', T0 + G.ROUND_MS), s);
  const p = G.pause(s, T0 + 5000);
  assert.deepEqual(G.answer(p, 'got', T0 + 6000), p);
});

test('timeLeft counts down by wall clock and never goes below 0', () => {
  const s = started();
  assert.equal(G.timeLeft(s.round, T0), G.ROUND_MS);
  assert.equal(G.timeLeft(s.round, T0 + 30000), 90000);
  assert.equal(G.timeLeft(s.round, T0 + 999999), 0);
});

test('pause freezes the clock and resume picks up where it was', () => {
  let s = G.pause(started(), T0 + 20000);
  assert.equal(G.timeLeft(s.round, T0 + 80000), 100000);
  assert.deepEqual(G.pause(s, T0 + 90000), s);          // pausing twice is harmless
  s = G.resume(s, T0 + 80000);
  assert.equal(G.timeLeft(s.round, T0 + 80000), 100000);
  assert.equal(G.timeLeft(s.round, T0 + 90000), 90000);
  assert.deepEqual(G.resume(s, T0 + 95000), s);          // resuming twice is harmless
});

test('finish only once and only when the time is up', () => {
  const s = started();
  assert.deepEqual(G.finish(s, T0 + 1000), s);
  const done = G.finish(s, T0 + G.ROUND_MS + 5);
  assert.equal(done.round.finishedAt, new Date(T0 + G.ROUND_MS + 5).toISOString());
  assert.deepEqual(G.finish(done, T0 + G.ROUND_MS + 9000), done);
  assert.deepEqual(G.answer(done, 'got', T0 + 1), done);
});

test('formatClock shows m:ss rounded up, so the round starts at 2:00 and ends at 0:00', () => {
  assert.equal(G.formatClock(120000), '2:00');
  assert.equal(G.formatClock(119001), '2:00');
  assert.equal(G.formatClock(59000), '0:59');
  assert.equal(G.formatClock(1), '0:01');
  assert.equal(G.formatClock(0), '0:00');
});

test('formatTime shows local HH:MM', () => {
  assert.equal(G.formatTime(new Date(2026, 10, 1, 22, 41, 59).toISOString()), '22:41');
  assert.equal(G.formatTime(new Date(2026, 10, 1, 7, 5).toISOString()), '07:05');
});

test('save/load round-trips, clear removes', () => {
  const st = G.memoryStorage();
  const s = G.answer(started(G.secureRandomInt), 'got', T0 + 10);
  G.save(st, s);
  assert.deepEqual(G.load(st), s);
  G.clear(st);
  assert.equal(G.load(st), null);
});

test('load treats corrupt or outdated data as no state', () => {
  const st = G.memoryStorage();
  const good = started();
  const bad = [
    '{nope', 'null', '42', '[]',
    JSON.stringify({ ...good, deck: { order: ['Unicorn'], next: 0 } }),                        // word list changed
    JSON.stringify({ ...good, deck: { ...good.deck, next: 999 } }),
    JSON.stringify({ ...good, round: { ...good.round, current: 'Unicorn' } }),
    JSON.stringify({ ...good, round: { ...good.round, results: [{ word: 'Owl', result: 'win' }] } }),
    JSON.stringify({ ...good, round: { ...good.round, endAt: 'soon' } }),
  ];
  for (const raw of bad) { st.setItem(G.KEY, raw); assert.equal(G.load(st), null, raw); }
  st.setItem(G.KEY, JSON.stringify({ deck: good.deck, round: null }));
  assert.deepEqual(G.load(st), { deck: good.deck, round: null });
});

test('a throwing storage never throws out of load/save/clear', () => {
  const boom = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); }, removeItem() { throw new Error('x'); } };
  assert.equal(G.load(boom), null);
  assert.doesNotThrow(() => G.save(boom, started()));
  assert.doesNotThrow(() => G.clear(boom));
});

test('safeStorage falls back to memory when localStorage is missing', () => {
  const st = G.safeStorage();
  st.setItem('a', '1');
  assert.equal(st.getItem('a'), '1');
});

test('card looks a word up', () => {
  assert.deepEqual(G.card('Owl').taboo, ['Hoot', 'Wisdom', 'Night', 'Feathers']);
  assert.equal(G.card('Unicorn'), null);
});

test('only 3 skips per round; a new round gets 3 again', () => {
  let s = started();
  assert.equal(G.MAX_SKIPS, 3);
  assert.equal(G.skipsLeft(s.round), 3);
  for (let i = 0; i < 3; i++) s = G.answer(s, 'skip', T0 + i);
  assert.equal(G.skipsLeft(s.round), 0);
  assert.deepEqual(G.answer(s, 'skip', T0 + 10), s);
  assert.notDeepEqual(G.answer(s, 'taboo', T0 + 10), s);
  s = G.start(G.finish(s, T0 + G.ROUND_MS), T0 + 200000);
  assert.equal(G.skipsLeft(s.round), 3);
});
