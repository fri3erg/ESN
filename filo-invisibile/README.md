# Il filo invisibile 🧶

Tandem night game from the ESN Bologna organisers' guide. Meet three different people: with each one, read a question
together, both answer, and find one **specific** thing you have in common (one real example each). Tap **Thread found**,
confirm, and a knot is tied. Three knots = the ball of yarn is complete: show it at the ESN desk for a prize 🎁.
Italian and English, switchable on every screen (starts in the phone's language).

Live: https://esn-filo-invisibile.vercel.app

- Design: [docs/specs/2026-11-23-filo-invisibile-design.md](docs/specs/2026-11-23-filo-invisibile-design.md)
- Theme choice (they picked A, then asked for it in white and red: "A+"): [docs/mockups/filo-invisibile-themes.html](docs/mockups/filo-invisibile-themes.html)

## Editing the questions

All the questions are in [`deck.js`](deck.js), Italian and English, with the number from the organisers' PDF.
Cards 11–20 (the easy social ones) are left out, as the guide says 51–70 replace them. A shuffled deck, no repeats
until all have been used.

## At the desk

The completed ball of yarn says "Show this at the ESN desk 🎁" with the time it was completed: the volunteer just looks
at it, nothing to tap. Players can keep drawing questions for fun afterwards.

## Secret 🐞

Five quick taps on the ball of yarn (or the title, or the knots at the top): a few ladybugs (Joana's animal) crawl out
from under the ball of yarn and wander off the screen.

## Print

[`print/`](print/) has A4 PDFs ready to print at 100%, each in colour and black & white:

- `filo-invisibile-banner-A4` – poster with the big QR code and the 3 steps
- `filo-invisibile-qr-cards-A4` – 20 small QR cards (4 × 5) to cut along the dashed lines

All the QR codes point to https://esn-filo-invisibile.vercel.app.

## Run locally

    npx serve -l 5177 .

Open http://localhost:5177. Add `?reset=1` to the URL to start over on a phone.

## Tests

    node --test "tests/*.test.mjs"

## Deploy

Vercel project **esn-filo-invisibile** (type the Project Name by hand at import), Root Directory `filo-invisibile`,
framework preset Other, no build command. `tests/`, `docs/`, `print/` and this README are kept off the site by
[`.vercelignore`](.vercelignore).
