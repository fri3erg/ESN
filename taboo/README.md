# Taboo Night 🎭

One-page party game for the ESN Bologna Taboo Tandem Night (Irish Pub, 10 PM): scan the QR, read the rules,
one person describes the word on the phone without saying the 4 forbidden words, the others guess.
2 minutes per round; guess 5 or more and show the screen to a volunteer to win a prize 🎁 (max 3 skips per round).

Live: https://esn-taboo.vercel.app

- Design decisions: [docs/specs/2026-11-01-taboo-design.md](docs/specs/2026-11-01-taboo-design.md)
- Theme mockups sent around to choose the look (we picked A, Game night): [docs/mockups/taboo-themes.html](docs/mockups/taboo-themes.html)

## Editing the words

All the cards are in [`words.js`](words.js): the word, its category (`job`, `animal`, `object`) and exactly 4 forbidden words.
Change them there, nothing else. The tests check every card still has 4 forbidden words and no duplicates.

Round length, the prize threshold and the skips per round are `ROUND_MS`, `CANDY_AT` and `MAX_SKIPS` at the top of [`game.js`](game.js)
(the rules text and the end screen use them, but the "2 minutes" wording in the rules and print material is written out by hand).

## Print

[`print/`](print/) has A4 PDFs ready to print at 100%, each in colour and black & white:

- `taboo-banner-A4` – poster with the big QR code and the 3 steps
- `taboo-qr-cards-A4` – 20 small QR cards (4 × 5) to cut along the dashed lines and hand out

All the QR codes point to https://esn-taboo.vercel.app.

## Run locally

    npx serve -l 5175 .

Open http://localhost:5175. Add `?reset=1` to the URL to start over on a phone.

## Tests

    node --test "tests/*.test.mjs"

## Deploy

Vercel project **esn-taboo** (type the Project Name by hand at import), Root Directory `taboo`, framework preset Other, no build command.
`tests/`, `docs/`, `print/` and this README are kept off the site by [`.vercelignore`](.vercelignore).
