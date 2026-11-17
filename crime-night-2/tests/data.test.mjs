import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from '../data/cases.js';
import { SUSPECTS } from '../data/suspects.js';

const LANGS = ['en', 'it', 'es'];
const names = SUSPECTS.map(s => s.name);

function assertTranslated(obj, where) {
  for (const l of LANGS) assert.ok(typeof obj?.[l] === 'string' && obj[l].trim(), `${where} missing ${l}`);
}

test('unique suspects with captions in all languages', () => {
  assert.ok(SUSPECTS.length >= 3);
  assert.equal(new Set(names).size, names.length);
  for (const s of SUSPECTS) assertTranslated(s.caption, `caption ${s.name}`);
});

test('cases are numbered 1..n and have 1 culprit or 2 accomplices', () => {
  assert.ok(CASES.length >= 1);
  assert.deepEqual(CASES.map(c => c.id), CASES.map((_, i) => i + 1));
  for (const c of CASES) assert.ok([1, 2].includes(c.culprits), `case ${c.id}`);
});

test('every case is fully translated and has clues lettered A, B, C… in order', () => {
  for (const c of CASES) {
    assertTranslated(c.title, `case ${c.id} title`);
    assertTranslated(c.short, `case ${c.id} short`);
    assertTranslated(c.crime, `case ${c.id} crime`);
    assert.ok(c.clues.length >= 2);
    assert.deepEqual(c.clues.map(x => x.letter), c.clues.map((_, i) => 'ABCDEFGH'[i]));
    for (const clue of c.clues) {
      assertTranslated(clue.text, `case ${c.id} clue ${clue.letter}`);
      assert.ok(clue.code.trim(), `case ${c.id} clue ${clue.letter} code`);
      assert.ok(clue.clears.length >= 1 && clue.clears.length <= 2);
      for (const n of clue.clears) assert.ok(names.includes(n), `unknown suspect ${n}`);
    }
  }
});

test('collecting all the clues leaves exactly the culprit count', () => {
  for (const c of CASES) {
    const cleared = new Set(c.clues.flatMap(x => x.clears));
    const left = names.filter(n => !cleared.has(n));
    assert.equal(left.length, c.culprits, `case ${c.id}: left ${left}`);
  }
});

test('no single clue is redundant (each clears someone no other clue clears)', () => {
  for (const c of CASES) {
    for (const clue of c.clues) {
      const others = new Set(c.clues.filter(x => x !== clue).flatMap(x => x.clears));
      assert.ok(clue.clears.some(n => !others.has(n)), `case ${c.id} clue ${clue.letter} is redundant`);
    }
  }
});

test('code words are all different, even after loose matching', () => {
  const key = s => s.normalize('NFKD').replace(/\p{M}+/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/s$/, '');
  const keys = CASES.flatMap(c => c.clues.map(x => key(x.code)));
  assert.equal(new Set(keys).size, keys.length);
});
