import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORDS, CATEGORIES } from '../words.js';

test('every card has a known category and exactly 4 forbidden words', () => {
  for (const w of WORDS) {
    assert.ok(CATEGORIES[w.cat], `${w.word}: category ${w.cat}`);
    assert.equal(w.taboo.length, 4, w.word);
    assert.equal(new Set(w.taboo.map(t => t.toLowerCase())).size, 4, `${w.word}: duplicate forbidden word`);
    for (const t of w.taboo) assert.ok(typeof t === 'string' && t.trim() === t && t.length > 0, `${w.word}: "${t}"`);
  }
});

test('no word appears twice and no card forbids its own word', () => {
  assert.equal(new Set(WORDS.map(w => w.word.toLowerCase())).size, WORDS.length);
  for (const w of WORDS) assert.ok(!w.taboo.some(t => t.toLowerCase() === w.word.toLowerCase()), w.word);
});

test('all three categories are in the mix', () => {
  for (const c of Object.keys(CATEGORIES)) assert.ok(WORDS.some(w => w.cat === c), c);
});
