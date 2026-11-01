# Tandem Passport 🛂

One-page game for the ESN Bologna Tandem night: scan the QR, open your passport, tap a "?" visa to get a random
mission, talk to someone new to complete it, stamp it. Everyone gets the same 6 missions in a random order;
with every stamp, show the screen to a volunteer and enter the prize draw 🎁.

Live: https://esn-tandem-passport.vercel.app

- Brief from the organisers (Italian PDF "Guida Operativa Digitale"), adapted in [docs/specs/2026-11-05-tandem-passport-design.md](docs/specs/2026-11-05-tandem-passport-design.md)
- Mockups to share: [docs/mockups/tandem-passport-flow.html](docs/mockups/tandem-passport-flow.html) (the real screens, step by step) and the earlier theme choice [docs/mockups/tandem-passport-themes.html](docs/mockups/tandem-passport-themes.html)

## Editing the missions

All the missions are in [`missions.js`](missions.js): title, emoji, text, conversation starter, the text and ink colour of the stamp.
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
