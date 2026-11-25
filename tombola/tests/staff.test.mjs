import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as S from '../staff/draw.js';
import { words } from '../staff/words.js';
import { SMORFIA } from '../staff/smorfia.js';

test('drawing gives every number 1–90 once, then stops', () => {
  let s = S.fresh('it');
  for (let i = 0; i < 90; i++) s = S.draw(s);
  assert.deepEqual([...s.drawn].sort((a, b) => a - b), Array.from({ length: 90 }, (_, i) => i + 1));
  assert.equal(S.remaining(s).length, 0);
  assert.equal(S.draw(s), s, 'nothing left to draw');
});

test('numbers come out shuffled', () => {
  const firsts = new Set(Array.from({ length: 40 }, () => S.draw(S.fresh('it')).drawn[0]));
  assert.ok(firsts.size > 15);
});

test('undo takes back the last number, which can come out again', () => {
  let s = S.draw(S.draw(S.fresh('it'), () => 0), () => 0);
  assert.deepEqual(s.drawn, [1, 2]);
  s = S.undo(s);
  assert.deepEqual(s.drawn, [1]);
  assert.ok(S.remaining(s).includes(2));
  assert.equal(S.undo(S.fresh('it')).drawn.length, 0);
});

test('a new game clears the draw and keeps the language', () => {
  const s = S.reset(S.draw(S.fresh('es')));
  assert.deepEqual(s.drawn, []);
  assert.equal(s.lang, 'es');
  assert.equal(S.fresh('de').lang, 'it');
});

test('numbers in words, in Italian, English and Spanish', () => {
  const cases = {
    it: [[1, 'uno'], [11, 'undici'], [17, 'diciassette'], [21, 'ventuno'], [23, 'ventitré'], [28, 'ventotto'], [47, 'quarantasette'], [83, 'ottantatré'], [90, 'novanta']],
    en: [[1, 'one'], [15, 'fifteen'], [40, 'forty'], [47, 'forty-seven'], [80, 'eighty']],
    es: [[1, 'uno'], [15, 'quince'], [16, 'dieciséis'], [20, 'veinte'], [22, 'veintidós'], [26, 'veintiséis'], [30, 'treinta'], [47, 'cuarenta y siete']],
  };
  for (const [lang, list] of Object.entries(cases)) for (const [n, w] of list) assert.equal(words(n, lang), w, `${n} ${lang}`);
  for (let n = 1; n <= 90; n++) for (const l of ['it', 'en', 'es']) assert.ok(words(n, l), `${n} ${l}`);
});

test('the Smorfia has a Neapolitan and an Italian meaning for every number', () => {
  for (let n = 1; n <= 90; n++) assert.ok(SMORFIA[n] && SMORFIA[n].nap && SMORFIA[n].it, `smorfia ${n}`);
  assert.equal(SMORFIA[47].nap, "'o muorto");
  assert.equal(SMORFIA[90].nap, "'a paura");
});

test('saved draws survive a reload, broken ones are dropped', () => {
  const store = S.memoryStorage();
  const s = S.draw(S.draw(S.fresh('en')));
  S.save(store, s);
  assert.deepEqual(S.load(store), s);
  for (const bad of ['x', '{}', JSON.stringify({ ...s, drawn: [5, 5] }), JSON.stringify({ ...s, drawn: [91] })]) {
    store.setItem(S.KEY, bad);
    assert.equal(S.load(store), null, bad);
  }
});
