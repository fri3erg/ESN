import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../game.js';
import { CHAIN } from '../chain.js';
import { MISSIONS } from '../missions.js';

const T = new Date(2026, 10, 20, 22, 41, 7);
const first = () => 0;
const after = n => CHAIN[(CHAIN.indexOf(n) + 1) % CHAIN.length];

test('the chain is one circle over every post-it number', () => {
  assert.equal(CHAIN.length, G.MAX_NUMBER);
  assert.deepEqual([...CHAIN].sort((a, b) => a - b), Array.from({ length: G.MAX_NUMBER }, (_, i) => i + 1));
});

test('your first target is the next number in the circle, with a mission', () => {
  const s = G.start(G.fresh(), 12, first);
  assert.equal(s.me, 12);
  assert.equal(s.target, after(12));
  assert.ok(G.mission(s.mission));
});

test('only numbers 1 to 200 can play', () => {
  for (const bad of [0, 201, -3, 1.5, NaN, '12', null]) assert.equal(G.start(G.fresh(), bad).me, null, String(bad));
  assert.equal(G.start(G.fresh(), 200).me, 200);
});

test('eliminating your target gives you the one they were hunting', () => {
  let s = G.start(G.fresh(), 12, first);
  const t1 = s.target;
  s = G.eliminate(s, T, first);
  assert.equal(s.target, after(t1));
  assert.deepEqual(s.kills.map(k => k.target), [t1]);
  assert.equal(s.kills[0].at, T.toISOString());
  assert.equal(s.kills[0].sent, false);
});

test('"already out" moves on to the next one in the circle, without counting a kill', () => {
  let s = G.start(G.fresh(), 12, first);
  const t1 = s.target;
  s = G.skip(s, first);
  assert.equal(s.target, after(t1));
  assert.equal(s.kills.length, 0);
});

test('people you eliminated or skipped never come back as a target', () => {
  let s = G.start(G.fresh(), 12, first);
  const seen = new Set();
  for (let i = 0; i < 50; i++) { seen.add(s.target); s = i % 2 ? G.skip(s, first) : G.eliminate(s, T, first); }
  assert.ok(!seen.has(s.target));
});

test('going all the way round the circle back to yourself means nobody is left: you win', () => {
  let s = G.start(G.fresh(), 12, first);
  while (s.target !== null) s = G.eliminate(s, T, first);
  assert.equal(s.kills.length, G.MAX_NUMBER - 1);
  assert.equal(G.isLastStanding(s), true);
  assert.equal(G.eliminate(s, T, first), s);
});

test('missions don\'t repeat until all of them have been used', () => {
  let s = G.start(G.fresh(), 12);
  const ids = [s.mission];
  for (let i = 1; i < MISSIONS.length; i++) { s = G.eliminate(s, T); ids.push(s.mission); }
  assert.deepEqual([...ids].sort(), MISSIONS.map(m => m.id).sort());
});

test('getting eliminated ends your game but keeps your eliminations', () => {
  let s = G.eliminate(G.start(G.fresh(), 12, first), T, first);
  s = G.gotOut(s, T);
  assert.equal(s.out, T.toISOString());
  assert.equal(s.kills.length, 1);
  assert.equal(G.eliminate(s, T, first), s);
  assert.equal(G.skip(s, first), s);
});

test('each elimination is sent once to the prize draw', () => {
  let s = G.start(G.fresh(), 12, first);
  s = G.eliminate(G.eliminate(s, T, first), T, first);
  assert.deepEqual(G.unsent(s).map(k => k.n), [1, 2]);
  s = G.markSent(s, 1);
  assert.deepEqual(G.unsent(s).map(k => k.n), [2]);
});

test('saved games survive a reload, broken ones are dropped', () => {
  const store = G.memoryStorage();
  let s = G.eliminate(G.start(G.fresh(), 12, first), T, first);
  G.save(store, s);
  assert.deepEqual(G.load(store), s);
  store.setItem(G.KEY, '{"me": 999}');
  assert.equal(G.load(store), null);
  store.setItem(G.KEY, 'not json');
  assert.equal(G.load(store), null);
});
