import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CASES } from '../data/cases.js';
import { normaliseCode, codeKey, lookupCode } from '../lib/codes.js';

test('all codes are unique after normalisation', () => {
  const keys = CASES.flatMap(c => c.clues.map(x => codeKey(x.code)));
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.every(k => k.length >= 3));
});

test('every code resolves to its own case and letter', () => {
  for (const c of CASES) for (const clue of c.clues) {
    assert.deepEqual(lookupCode(clue.code), { caseId: c.id, letter: clue.letter });
  }
});

test('sloppy input still matches', () => {
  assert.equal(normaliseCode(' Hello-Kitty! '), 'hellokitty');
  assert.deepEqual(lookupCode('photo shoot'), { caseId: 2, letter: 'A' });
  assert.deepEqual(lookupCode('PHOTOSHOOT'), { caseId: 2, letter: 'A' });
  assert.deepEqual(lookupCode('Menus'), { caseId: 1, letter: 'A' });
  assert.deepEqual(lookupCode('dishe'), { caseId: 2, letter: 'D' });
  assert.deepEqual(lookupCode(' taxi '), { caseId: 3, letter: 'D' });
  assert.deepEqual(lookupCode('PÁELLA'), { caseId: 2, letter: 'C' });
});

test('garbage does not match', () => {
  for (const s of ['', '   ', 's', 'S', 'taxii', 'paela', 'case 1', null, undefined]) {
    assert.equal(lookupCode(s), null, String(s));
  }
});
