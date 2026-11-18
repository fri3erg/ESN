# ESN Mystery Night · Second Edition 🔍

Web app for the second **ESN Mystery Night**, played during the ESN Bologna **International Dinner** at the Zadaura restaurant on 18.11.2026 (~20:00).
Same game and same look as the first edition ([`../crime-night/`](../crime-night/), archived), new suspects and cases.

The crime is just an excuse. The real mission is meeting new people.

Website by **Elia**.

## How the game works

- A few fictional crimes hit the dinner. The suspects are ESN volunteers (see [`data/suspects.js`](data/suspects.js)).
- Each case has a few clues (A, B, C…). Every clue gives an alibi to one or two suspects.
- Every player gets **one clue per case**. To solve a case you need the people holding the other clues,
  so you have to talk to strangers.
- A case has either one culprit or two accomplices.
- **Locking in answers happens in person:** players find an ESN volunteer, show their verdict card and win a prize.

The number of cases, clues and suspects comes from the data: the texts ("3 crimes", "THE 6 SUSPECTS", "A–D")
and the clue assignment follow it.

## Cases and alibis

- [`data/cases.js`](data/cases.js): the cases, clues, code words and alibis (EN/IT/ES).
- [`data/suspects.js`](data/suspects.js): the suspects, photos and captions.
- [`docs/cases-and-alibis.html`](docs/cases-and-alibis.html): one page with every case, alibi and the solutions, to send
  to the organisers. Rebuild it after every change with `node tools/cases-doc.mjs`.

The tests check that every case leaves exactly its culprit count, no clue is useless and all code words differ.

## Run locally

    npx serve -l 5173 .

Open http://localhost:5173. To play as someone else, use a private window.

## Tests

    node --test "tests/*.test.mjs"

## Adding suspect photos

    python tools/prepare_photo.py "path/to/photo.jpeg" dario

makes `img/suspects/dario.jpg` (black and white, 3:4, ~40 KB). Without a photo a grey silhouette is shown.

## Deploy

Vercel project **zdaura-detective-night** (Zadaura is the restaurant), Root Directory `crime-night-2`, preset Other,
no build command. `tests/`, `docs/`, `tools/`, `print/` and this README are kept off the site by [`.vercelignore`](.vercelignore).

## Still needed

- [ ] Organisers' OK on the cases and alibis ([docs/cases-and-alibis.html](docs/cases-and-alibis.html)), and any more suspects
- [x] Date and venue on the poster (Zadaura, 18.11.2026)
- [ ] Exact time, if it should go on the poster
- [x] Photos of Dario, Sisto and Riccardo
- [x] Posters in `print/` (colour + B&W, QR to https://zdaura-detective-night.vercel.app). The tagline counts crimes and
      suspects: if suspects change, regenerate them.
