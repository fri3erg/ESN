import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as G from '../game.js';
import { CARDS, CATEGORIES } from '../deck.js';

const T = new Date(2026, 10, 24, 21, 47, 0);
const first = () => 0;
const meet = s => G.ready(s, T, first);
const tie = s => G.tieKnot(s, T, first);

test('the deck: unique ids, both languages, known categories, no easy 11–20', () => {
  const ids = CARDS.map(c => c.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const c of CARDS) {
    assert.ok(c.it.trim() && c.en.trim(), `card ${c.id}`);
    assert.ok(CATEGORIES[c.cat], `card ${c.id} category`);
    assert.ok(c.id < 11 || c.id > 20, `card ${c.id} is one of the easy ones`);
  }
});

test('a fresh game starts on the rules, in the chosen language', () => {
  const s = G.fresh('it');
  assert.equal(s.phase, 'rules');
  assert.equal(s.lang, 'it');
  assert.equal(G.fresh('de').lang, 'en');
  assert.equal(G.knots(s), 0);
});

test('start → look around → ready shows a card', () => {
  let s = G.start(G.fresh('en'));
  assert.equal(s.phase, 'look');
  s = meet(s);
  assert.equal(s.phase, 'card');
  assert.ok(G.card(s));
  assert.equal(s.cardAt, T.toISOString());
});

test('"another question" never repeats a card until the deck is used up', () => {
  let s = meet(G.start(G.fresh('en')));
  const seen = [s.card];
  for (let i = 1; i < CARDS.length; i++) { s = G.another(s, T); seen.push(s.card); }
  assert.equal(new Set(seen).size, CARDS.length);
  s = G.another(s, T);
  assert.notEqual(s.card, seen[seen.length - 1], 'a reshuffled deck does not start with the card just shown');
});

test('cards come out shuffled', () => {
  const firsts = new Set(Array.from({ length: 40 }, () => G.ready(G.start(G.fresh('en')), T).card));
  assert.ok(firsts.size > 10);
});

test('a knot closes the card and asks to switch person', () => {
  let s = tie(meet(G.start(G.fresh('en'))));
  assert.equal(G.knots(s), 1);
  assert.equal(s.phase, 'switch');
  assert.equal(s.card, null);
});

test('a second tap or a stale screen cannot tie two knots', () => {
  const s = tie(meet(G.start(G.fresh('en'))));
  assert.equal(tie(s), s);
  assert.equal(G.knots(G.tieKnot(G.fresh('en'), T)), 0, 'no knot without a card on screen');
});

test('three knots complete the ball of yarn', () => {
  let s = G.start(G.fresh('en'));
  for (let i = 0; i < G.GOAL; i++) s = tie(meet(s));
  assert.equal(G.knots(s), G.GOAL);
  assert.equal(s.phase, 'done');
  assert.equal(s.completedAt, T.toISOString());
  assert.equal(G.isComplete(s), true);
});

test('after the ball of yarn is complete, playing on comes back to it', () => {
  let s = G.start(G.fresh('en'));
  for (let i = 0; i < G.GOAL; i++) s = tie(meet(s));
  s = tie(meet(G.playOn(s)));
  assert.equal(G.knots(s), G.GOAL + 1);
  assert.equal(s.phase, 'done', 'every new knot comes back to the finished ball');
  assert.equal(s.completedAt, T.toISOString());
});

test('language can change at any time', () => {
  let s = meet(G.start(G.fresh('en')));
  s = G.setLang(s, 'it');
  assert.equal(s.lang, 'it');
  assert.equal(G.setLang(s, 'xx'), s);
});

test('the secret combination: five quick taps', () => {
  let taps = [];
  let hit = false;
  for (let i = 0; i < 5; i++) ({ taps, hit } = G.secretTap(taps, 1000 + i * 300));
  assert.equal(hit, true);
  assert.deepEqual(taps, [], 'resets after firing');
  taps = [];
  for (let i = 0; i < 5; i++) ({ taps, hit } = G.secretTap(taps, 1000 + i * 900));
  assert.equal(hit, false, 'too slow does not count');
});

test('the secret mission needs ten very quick taps, so it never fires by accident', () => {
  const run = (count, gap) => {
    let taps = [];
    let hit = false;
    for (let i = 0; i < count; i++) ({ taps, hit } = G.secretTap(taps, 1000 + i * gap, G.MISSION));
    return hit;
  };
  assert.equal(run(10, 250), true);
  assert.equal(run(9, 250), false, 'nine taps are not enough');
  assert.equal(run(10, 500), false, 'too slow does not count');
  assert.equal(run(5, 250), false, 'the ladybug combination does not open it');
});

test('saved games survive a reload, broken ones are dropped', () => {
  const store = G.memoryStorage();
  const s = tie(meet(G.start(G.fresh('it'))));
  G.save(store, s);
  assert.deepEqual(G.load(store), s);
  for (const bad of ['nope', '{"phase":"card"}', JSON.stringify({ ...s, knots: 'x' }), JSON.stringify({ ...s, phase: 'card', card: 999 })]) {
    store.setItem(G.KEY, bad);
    assert.equal(G.load(store), null, bad.slice(0, 40));
  }
});
