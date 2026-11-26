import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as L from '../limoncello.js';
import handler from '../api/more.js';

test('names are trimmed, squashed and cut; empty or junk is not a name', () => {
  assert.equal(L.cleanName('  Maria   José  '), 'Maria José');
  assert.equal(L.cleanName('a'.repeat(80)).length, L.MAX_NAME);
  assert.equal(L.cleanName('Tom\u0000\n\tmy'), 'Tom my');
  assert.equal(L.cleanName('   '), '');
  assert.equal(L.cleanName(42), '');
});

test('after a request the button rests for a short while', () => {
  const t0 = 1_000_000;
  assert.equal(L.waitLeft(null, t0), 0);
  assert.equal(L.waitLeft(t0, t0), L.COOLDOWN_MS);
  assert.equal(L.waitLeft(t0, t0 + 5000), L.COOLDOWN_MS - 5000);
  assert.equal(L.waitLeft(t0, t0 + L.COOLDOWN_MS + 1), 0);
  assert.equal(L.waitLeft(t0 + 60_000, t0), 0, 'a clock that went backwards never locks the button');
});

test('the message for Telegram', () => {
  assert.equal(L.message('Giulia', 1, '22:14'), '🍋 Giulia needs more limoncello! · 22:14');
  assert.equal(L.message('Giulia', 3, ''), '🍋 Giulia needs more limoncello! (3rd time tonight)');
  assert.equal(L.ordinal(1), '1st');
  assert.equal(L.ordinal(2), '2nd');
  assert.equal(L.ordinal(3), '3rd');
  assert.equal(L.ordinal(4), '4th');
  assert.equal(L.ordinal(11), '11th');
  assert.equal(L.ordinal(12), '12th');
  assert.equal(L.ordinal(22), '22nd');
});

// A fake Vercel response and fetch.
function call(body, { env = { TELEGRAM_BOT_TOKEN: 'tok', TELEGRAM_CHAT_ID: '7' }, ok = true, method = 'POST' } = {}) {
  const sent = [];
  const res = { code: 0, json: null, status(c) { this.code = c; return this; }, json(j) { this.body = j; return this; } };
  const fetch = async (url, init) => { sent.push({ url, body: JSON.parse(init.body) }); if (ok === 'throw') throw new Error('down'); return { ok }; };
  return handler({ method, body }, res, { env, fetch }).then(() => ({ res, sent }));
}

test('the function sends one plain-text message to the chat', async () => {
  const { res, sent } = await call({ name: '  Giulia ', n: 2, at: '2026-11-27T21:14:00Z' });
  assert.equal(res.code, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, 'https://api.telegram.org/bottok/sendMessage');
  assert.equal(sent[0].body.chat_id, '7');
  assert.equal(sent[0].body.text, '🍋 Giulia needs more limoncello! (2nd time tonight) · 22:14');
  assert.equal(sent[0].body.parse_mode, undefined, 'plain text: a name cannot inject formatting');
});

test('the function refuses bad requests and reports Telegram problems', async () => {
  assert.equal((await call({ name: 'Giulia', n: 1 }, { method: 'GET' })).res.code, 405);
  assert.equal((await call({ name: '  ', n: 1 })).res.code, 400);
  assert.equal((await call({ name: 'Giulia', n: 0 })).res.code, 400);
  assert.equal((await call({ name: 'Giulia', n: 'x' })).res.code, 400);
  assert.equal((await call(null)).res.code, 400);
  assert.equal((await call({ name: 'Giulia', n: 1 }, { env: {} })).res.code, 500);
  assert.equal((await call({ name: 'Giulia', n: 1 }, { ok: false })).res.code, 502);
  assert.equal((await call({ name: 'Giulia', n: 1 }, { ok: 'throw' })).res.code, 502);
});
