# Undercover 🕶️

Secret-assassin game for the ESN Bologna Tandem night. Everyone wears a post-it with a number (1–200), scans the QR
and types their number. They get a secret target (another number) and a secret mission: make the target **say** a word or
**do** an action, without saying the word themselves and without the target guessing. When the target falls for it, tap
**Eliminated** and the next target appears. Every elimination is a ticket for the prize draw 🎁.

Live: https://esn-undercover.vercel.app

- Design: [docs/specs/2026-11-13-undercover-design.md](docs/specs/2026-11-13-undercover-design.md)
- Theme choice (they picked B, night vision): [docs/mockups/undercover-themes.html](docs/mockups/undercover-themes.html)
- Missions used at the earlier events, sent to the organisers to choose from: [docs/missioni-eventi-precedenti.pdf](docs/missioni-eventi-precedenti.pdf)

## How the targets work

[`chain.js`](chain.js) is one random circle over all 200 numbers, generated once: each number hunts the next one.
Eliminate your target and you get the one *they* were hunting. "Target already out?" (someone else got them, or nobody wears
that number) moves on to the next in the circle without counting. Coming all the way round to yourself means you're the
last agent standing. Players who get eliminated tap "I got eliminated" themselves. Don't edit `chain.js` by hand:
the tests check that every number is in it exactly once.

## Editing the missions

All the missions are in [`missions.js`](missions.js): `kind: 'say'` (a word to make them say) or `kind: 'do'`
(an action, written to follow "Make them…"), the text and an emoji. Each target gets a random mission, no repeats until
all have been used.

## Eliminations on Telegram (the prize draw)

Each elimination calls [`api/eliminate.js`](api/eliminate.js) (a Vercel function), which sends
`☠ #12 eliminated #25 · Make your target say "Shrek" · 🎟 Draw ticket…` to the same Telegram chat as Tandem Passport.
One message = one ticket. Without a connection the phone retries every 15 s and on the next visit.

Vercel → project → Settings → Environment Variables: the same `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as
esn-tandem-passport, then redeploy.

## Print

[`print/`](print/) has A4 PDFs ready to print at 100%, each in colour and black & white:

- `undercover-banner-A4` – poster with the big QR code and the 3 steps
- `undercover-qr-cards-A4` – 20 small QR cards (4 × 5) to cut along the dashed lines

All the QR codes point to https://esn-undercover.vercel.app. The numbered post-its are made by the organisers.

## Run locally

    npx serve -l 5177 .

Open http://localhost:5177 (the Telegram call only works on Vercel). Add `?reset=1` to the URL to start over on a phone.

## Tests

    node --test "tests/*.test.mjs"

## Deploy

Vercel project **esn-undercover** (type the Project Name by hand at import), Root Directory `undercover`, framework preset
Other, no build command. `tests/`, `docs/`, `print/` and this README are kept off the site by [`.vercelignore`](.vercelignore).
