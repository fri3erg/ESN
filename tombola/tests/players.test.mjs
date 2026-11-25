import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../players/card.js';

const T = new Date(2026, 10, 27, 22, 14, 0);
const nums = card => card.flat().filter(Boolean);
const dealt = (lang = 'en') => P.deal(P.fresh(lang));
const rowOf = (s, r) => s.card[r].filter(Boolean);
const mark = (s, list) => list.reduce((acc, n) => P.toggle(acc, n, T), s);

test('a card is a real cartella: 3 rows of 5, 15 numbers, each column in its own ten, every column used, sorted down', () => {
  for (let k = 0; k < 300; k++) {
    const card = P.makeCard();
    assert.equal(card.length, 3);
    for (const row of card) {
      assert.equal(row.length, 9);
      assert.equal(row.filter(Boolean).length, 5);
    }
    assert.equal(new Set(nums(card)).size, 15);
    for (let c = 0; c < 9; c++) {
      const col = card.map(r => r[c]).filter(Boolean);
      assert.ok(col.length >= 1, `column ${c} used`);
      for (const n of col) assert.equal(P.column(n), c, `${n} in column ${c}`);
      assert.deepEqual(col, [...col].sort((a, b) => a - b), 'sorted top to bottom');
    }
  }
});

test('the column of a number: 1–9, 10–19 … 80–90', () => {
  assert.deepEqual([1, 9, 10, 19, 79, 80, 89, 90].map(P.column), [0, 0, 1, 1, 7, 8, 8, 8]);
});

test('cards come out different', () => {
  const seen = new Set(Array.from({ length: 30 }, () => nums(P.makeCard()).join()));
  assert.ok(seen.size > 25);
});

test('a fresh game starts on the rules in a known language, then deals a card', () => {
  assert.equal(P.fresh('es').phase, 'rules');
  assert.equal(P.fresh('es').lang, 'es');
  assert.equal(P.fresh('de').lang, 'en');
  const s = dealt();
  assert.equal(s.phase, 'card');
  assert.equal(nums(s.card).length, 15);
});

test('tap crosses a number out, tap again removes it; numbers not on the card do nothing', () => {
  let s = dealt();
  const n = nums(s.card)[0];
  s = P.toggle(s, n, T);
  assert.deepEqual(s.marked, [n]);
  s = P.toggle(s, n, T);
  assert.deepEqual(s.marked, []);
  assert.equal(P.toggle(s, 91, T), s);
  assert.equal(P.toggle(s, 0, T), s);
});

test('wins count the best row: ambo, terno, quaterna, cinquina; tombola is the whole card', () => {
  let s = dealt();
  const [a, b, c, d, e] = rowOf(s, 0);
  s = mark(s, [a, rowOf(s, 1)[0]]);
  assert.equal(P.level(s), 0, 'two numbers on different rows are not an ambo');
  s = mark(s, [b]); assert.equal(P.WINS[s.best], 'ambo');
  s = mark(s, [c]); assert.equal(P.WINS[s.best], 'terno');
  s = mark(s, [d]); assert.equal(P.WINS[s.best], 'quaterna');
  s = mark(s, [e]); assert.equal(P.WINS[s.best], 'cinquina');
  assert.equal(s.tombolaAt, null);
  s = mark(s, nums(s.card).filter(n => !s.marked.includes(n)));
  assert.equal(P.WINS[s.best], 'tombola');
  assert.equal(s.tombolaAt, T.toISOString());
});

test('removing a mark never flashes the same win twice', () => {
  let s = dealt();
  const [a, b] = rowOf(s, 0);
  s = mark(s, [a, b]);
  assert.equal(P.WINS[s.best], 'ambo');
  s = mark(s, [b]);
  assert.equal(P.level(s), 0);
  assert.equal(P.WINS[s.best], 'ambo', 'best stays, so marking it again does not flash ambo again');
});

test('a new game: same card with the marks cleared, or a new card', () => {
  const s = mark(dealt(), rowOf(dealt(), 0).concat(nums(dealt().card)));
  const won = mark(s, nums(s.card));
  const cleared = P.clearMarks(won);
  assert.deepEqual(cleared.card, won.card);
  assert.deepEqual(cleared.marked, []);
  assert.equal(cleared.best, 0);
  assert.equal(cleared.tombolaAt, null);
  const fresh = P.deal(won);
  assert.deepEqual(fresh.marked, []);
  assert.notDeepEqual(fresh.card, won.card);
});

test('language can change at any time', () => {
  const s = dealt('it');
  assert.equal(P.setLang(s, 'es').lang, 'es');
  assert.equal(P.setLang(s, 'xx'), s);
});

test('saved games survive a reload, broken ones are dropped', () => {
  const store = P.memoryStorage();
  let s = dealt('it');
  s = mark(s, rowOf(s, 0).slice(0, 2));
  P.save(store, s);
  assert.deepEqual(P.load(store), s);
  for (const bad of ['nope', '{"phase":"card"}', JSON.stringify({ ...s, card: [[1]] }), JSON.stringify({ ...s, marked: [999] })]) {
    store.setItem(P.KEY, bad);
    assert.equal(P.load(store), null, bad.slice(0, 40));
  }
});
