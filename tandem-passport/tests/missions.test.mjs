import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MISSIONS } from '../missions.js';

test('every mission is complete and ids are unique', () => {
  assert.equal(new Set(MISSIONS.map(m => m.id)).size, MISSIONS.length);
  for (const m of MISSIONS) {
    for (const k of ['id', 'emoji', 'title', 'stamp', 'ink', 'text', 'starter']) assert.ok(typeof m[k] === 'string' && m[k].trim(), `${m.id}.${k}`);
    assert.match(m.ink, /^#[0-9a-f]{6}$/i, m.id);
    assert.ok(m.stamp.length <= 14, `${m.id}: stamp text too long for the stamp`);
  }
});

test('no wording promises candy', () => {
  assert.ok(!JSON.stringify(MISSIONS).toLowerCase().includes('candy'));
});
