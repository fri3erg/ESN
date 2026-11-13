// Vercel function: every elimination tells the organisers' Telegram chat, one message = one ticket in the prize draw.
// Same bot as Tandem Passport. Settings (Vercel → Project → Settings → Environment Variables):
// TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
import { MISSIONS, sentence } from '../missions.js';
import { MAX_NUMBER } from '../game.js';

const isNumber = n => Number.isInteger(n) && n >= 1 && n <= MAX_NUMBER;

export default async function handler(req, res, deps = { env: process.env, fetch: globalThis.fetch }) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const me = Number(b.me), target = Number(b.target), n = Number(b.n);
  const m = MISSIONS.find(x => x.id === b.mission);
  if (!isNumber(me) || !isNumber(target) || me === target || !Number.isInteger(n) || n < 1 || n > MAX_NUMBER || !m) {
    return res.status(400).json({ ok: false });
  }

  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chat } = deps.env;
  if (!token || !chat) return res.status(500).json({ ok: false, error: 'not configured' });

  const at = Date.parse(b.at);
  const time = Number.isNaN(at) ? '' : ` · ${new Date(at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' })}`;
  // Plain text (no parse_mode): only numbers and our own mission text go in.
  const text = `☠ #${me} eliminated #${target}\n${sentence(m)}\n🎟 Draw ticket · elimination nº ${n} for #${me}${time}`;
  try {
    const r = await deps.fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text }),
    });
    if (!r.ok) return res.status(502).json({ ok: false });
  } catch {
    return res.status(502).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}
