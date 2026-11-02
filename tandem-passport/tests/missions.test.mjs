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

test('every mission asks for at least one answer, the first one required', () => {
  for (const m of MISSIONS) {
    assert.ok(Array.isArray(m.fields) && m.fields.length >= 1, m.id);
    assert.equal(m.fields[0].required, true, `${m.id}: first field must be required`);
    assert.equal(new Set(m.fields.map(f => f.key)).size, m.fields.length, `${m.id}: duplicate field key`);
    for (const f of m.fields) assert.ok(/^[a-z]+$/.test(f.key) && typeof f.label === 'string' && f.label.trim(), `${m.id}.${f.key}`);
  }
});

test('no wording promises candy', () => {
  assert.ok(!JSON.stringify(MISSIONS).toLowerCase().includes('candy'));
});
