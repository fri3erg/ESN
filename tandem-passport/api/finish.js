// Vercel function: a finished passport tells the organisers' Telegram chat who to put in the prize draw.
// Settings (Vercel → Project → Settings → Environment Variables): TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
const NAME_MAX = 40;

export default async function handler(req, res, deps = { env: process.env, fetch: globalThis.fetch }) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const name = typeof b.name === 'string' ? b.name.replace(/[\u0000-\u001f\u007f]/g, ' ').trim() : '';
  const drawNo = Number(b.drawNo);
  if (!name || name.length > NAME_MAX || !Number.isInteger(drawNo) || drawNo < 1000 || drawNo > 9999) return res.status(400).json({ ok: false });

  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chat } = deps.env;
  if (!token || !chat) return res.status(500).json({ ok: false, error: 'not configured' });

  const at = Date.parse(b.finishedAt);
  const time = Number.isNaN(at) ? '' : ` · ${new Date(at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' })}`;
  // Plain text (no parse_mode), so a name can't inject formatting or links.
  const text = `🛂 Passport complete!\n${name}\nDraw Nº ${String(drawNo).padStart(4, '0')}${time}`;
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

