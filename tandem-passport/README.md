# Tandem Passport 🛂

One-page game for the ESN Bologna Tandem night: scan the QR, open your passport, tap a "?" to get a random
mission, talk to someone new to complete it, stamp it with a sticker. Everyone gets the same 6 missions in a random order;
with a full passport, show the screen to a volunteer and enter the prize draw 🎁.

Live: https://esn-tandem-passport.vercel.app

- Brief from the organisers (Italian PDF "Guida Operativa Digitale"), adapted in [docs/specs/2026-11-05-tandem-passport-design.md](docs/specs/2026-11-05-tandem-passport-design.md)
- Mockups to share: [docs/mockups/tandem-passport-flow.html](docs/mockups/tandem-passport-flow.html) (the real screens, step by step) and the earlier theme choice [docs/mockups/tandem-passport-themes.html](docs/mockups/tandem-passport-themes.html)

## Editing the missions

All the missions are in [`missions.js`](missions.js): title, emoji, text, conversation starter, the text and colour of the sticker.
`input: true` makes the mission ask for what they learned (Word Exchange: the word and its meaning) before it can be stamped.

## Print

[`print/`](print/) has A4 PDFs ready to print at 100%, each in colour and black & white:

- `tandem-passport-banner-A4` – poster with the big QR code and the 3 steps
- `tandem-passport-qr-cards-A4` – 20 small QR cards (4 × 5) to cut along the dashed lines

All the QR codes point to https://esn-tandem-passport.vercel.app.

## Run locally

    npx serve -l 5176 .

Open http://localhost:5176. Add `?reset=1` to the URL to start a new passport on a phone.

## Tests

    node --test "tests/*.test.mjs"

## Deploy

Vercel project **esn-tandem-passport** (type the Project Name by hand at import), Root Directory `tandem-passport`, framework preset Other, no build command.
`tests/`, `docs/`, `print/` and this README are kept off the site by [`.vercelignore`](.vercelignore).

## Finishers on Telegram (for the prize draw)

Players type their name on the cover. When a passport is full, the page calls [`api/finish.js`](api/finish.js) (a Vercel function),
which sends "🛂 Passport complete! · name · Draw Nº · time" to a Telegram chat. If the phone has no connection it retries
while the screen is open and on the next visit; the screen says "✓ Your name is in the draw" once it got through.

1. In Telegram, message **@BotFather** → `/newbot` → copy the token.
2. Send any message to the new bot (or add it to the volunteers' group and write something there).
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser and copy `"chat":{"id": ...}` (group ids start with `-`).
4. Vercel → project → Settings → Environment Variables: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`, then redeploy.

The token only lives in Vercel, never in the code. Playing again counts as a new entry with a new draw number.
