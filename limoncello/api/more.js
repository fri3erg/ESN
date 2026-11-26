// Vercel function: "Need more limoncello" → one message to the organiser's Telegram chat.
// Same bot as Tandem Passport and Undercover. Settings (Vercel → Project → Settings → Environment Variables):
// TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
import { cleanName, message } from '../limoncello.js';

export default async function handler(req, res, deps = { env: process.env, fetch: globalThis.fetch }) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const name = cleanName(b.name);
  const n = Number(b.n);
  if (!name || !Number.isInteger(n) || n < 1 || n > 999) return res.status(400).json({ ok: false });

  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chat } = deps.env;
  if (!token || !chat) return res.status(500).json({ ok: false, error: 'not configured' });

  const at = Date.parse(b.at);
  const time = Number.isNaN(at) ? '' : new Date(at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' });
  try {
    // Plain text (no parse_mode), so a name can't add links or formatting.
    const r = await deps.fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: message(name, n, time) }),
    });
    if (!r.ok) return res.status(502).json({ ok: false });
  } catch {
    return res.status(502).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}
