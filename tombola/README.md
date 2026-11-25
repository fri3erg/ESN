# Tombola ESN

Tombola on the bus. The staff draw the numbers on a phone and shout them; every player gets a random card on their own
phone (from a QR code) and taps the numbers to cross them out with an X. Ambo, terno, quaterna and cinquina flash full screen
("First? Shout it!": the rules say the first one to get it shouts it); tombola (the whole card) shows a live "Show this to the staff 🎁" screen with the time. IT / EN / ES.

Two separate sites with the same look:

| Page | Folder | Live |
|---|---|---|
| Players (the QR code) | [`players/`](players/) | https://esn-tombola.vercel.app |
| Staff (drawing) | [`staff/`](staff/) | https://esn-tombola-staff.vercel.app |

The two pages don't talk to each other: a player can mark any number. To check a tombola, compare the card with the
staff's **Numbers out** board.

## Staff page

- **Draw**: the ball spins, then lands on the number. Under it: the number in words in IT · EN · ES (to shout it in any
  language) and, small, its meaning in the Neapolitan Smorfia.
- The last 5 numbers, **Numbers out** (the 1–90 board), **Undo last** and **New game** (both ask first).
- The draw survives a reload or a locked phone, and the screen stays on while the page is open.

## Edit

- Texts: the `T` object at the top of the script in `players/index.html` and `staff/index.html`.
- The Smorfia meanings: [`staff/smorfia.js`](staff/smorfia.js) (traditional list, a few rude ones kept on purpose).
- The look: [`shared/style.css`](shared/style.css), then `npm run sync` to copy it into `players/` and `staff/`
  (each Vercel project only sees its own folder). A test fails if a copy is out of date.

## Print

[`print/`](print/) has A4 PDFs ready to print at 100%, each in colour and black & white:

- `tombola-banner-A4` – poster with the big QR code and the 3 steps
- `tombola-qr-cards-A4` – 20 small QR cards (4 × 5) to cut along the dashed lines

All the QR codes point to the players' page, https://esn-tombola.vercel.app.

## Run locally

    npx serve -l 5181 players
    npx serve -l 5182 staff

Add `?reset=1` to the URL to start over on a phone.

## Tests

    node --test "tests/*.test.mjs"

## Deploy

Two Vercel projects from this repo, no build step:

| Project Name (type it by hand) | Root Directory |
|---|---|
| `esn-tombola` | `tombola/players` |
| `esn-tombola-staff` | `tombola/staff` |

Every push to `main` deploys both.
