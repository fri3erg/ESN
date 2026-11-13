import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/eliminate.js';

// Minimal stand-ins for Vercel's req/res.
const call = async (body, { method = 'POST', env = { TELEGRAM_BOT_TOKEN: 'T0K', TELEGRAM_CHAT_ID: '-100' }, telegramOk = true } = {}) => {
  const sent = [];
  const res = { code: 0, body: null, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; } };
  await handler({ method, body }, res, {
    env,
    fetch: async (url, opts) => { sent.push({ url, body: JSON.parse(opts.body) }); return { ok: telegramOk }; },
  });
  return { res, sent };
};
const ok = { me: 12, target: 25, n: 2, mission: 'shrek', at: '2026-11-20T21:41:00.000Z' };

test('an elimination is sent to the Telegram chat as a draw ticket', async () => {
  const { res, sent } = await call(ok);
  assert.equal(res.code, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, 'https://api.telegram.org/botT0K/sendMessage');
  assert.equal(sent[0].body.chat_id, '-100');
  assert.match(sent[0].body.text, /#12 eliminated #25/);
  assert.match(sent[0].body.text, /Make your target say "Shrek"/);
  assert.match(sent[0].body.text, /22:41/);
  assert.equal(sent[0].body.parse_mode, undefined);
});

test('bad requests are refused without calling Telegram', async () => {
  for (const body of [null, {}, { ...ok, me: 0 }, { ...ok, target: 201 }, { ...ok, target: 12 }, { ...ok, n: 0 },
    { ...ok, mission: 'nope' }, { ...ok, me: 'abc' }]) {
    const { res, sent } = await call(body);
    assert.equal(res.code, 400, JSON.stringify(body));
    assert.equal(sent.length, 0);
  }
  assert.equal((await call(ok, { method: 'GET' })).res.code, 405);
});

test('missing settings or a Telegram error give a server error', async () => {
  assert.equal((await call(ok, { env: {} })).res.code, 500);
  assert.equal((await call(ok, { telegramOk: false })).res.code, 502);
});
