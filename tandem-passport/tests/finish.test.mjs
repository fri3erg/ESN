import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/finish.js';

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

test('a finished passport is sent to the Telegram chat', async () => {
  const { res, sent } = await call({ name: 'Anna Rossi', drawNo: 4271, finishedAt: '2026-11-05T21:41:00.000Z' });
  assert.equal(res.code, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, 'https://api.telegram.org/botT0K/sendMessage');
  assert.equal(sent[0].body.chat_id, '-100');
  assert.match(sent[0].body.text, /Anna Rossi/);
  assert.match(sent[0].body.text, /4271/);
});

test('bad requests are refused without calling Telegram', async () => {
  for (const body of [null, {}, { name: '', drawNo: 1234 }, { name: 'A', drawNo: 12 }, { name: 'A', drawNo: 'x' }, { name: 'x'.repeat(200), drawNo: 1234 }]) {
    const { res, sent } = await call(body);
    assert.equal(res.code, 400, JSON.stringify(body));
    assert.equal(sent.length, 0);
  }
  const { res } = await call({ name: 'A', drawNo: 1234 }, { method: 'GET' });
  assert.equal(res.code, 405);
});

test('missing settings or a Telegram error give a server error', async () => {
  assert.equal((await call({ name: 'A', drawNo: 1234 }, { env: {} })).res.code, 500);
  assert.equal((await call({ name: 'A', drawNo: 1234 }, { telegramOk: false })).res.code, 502);
});

test('the name cannot inject Telegram formatting', async () => {
  const { sent } = await call({ name: '<b>*Anna*</b>', drawNo: 1234 });
  assert.equal(sent[0].body.parse_mode, undefined);
});
