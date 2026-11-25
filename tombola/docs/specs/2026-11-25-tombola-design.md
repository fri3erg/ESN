# Tombola ESN: design

Tombola on the bus. The staff draw the numbers on a phone and shout them; every Erasmus plays a card on their own phone
(from a QR code) and crosses the numbers out. Two separate sites, same look:

| Page | Folder (Vercel Root Directory) | URL |
|---|---|---|
| Players | `tombola/players/` | `https://esn-tombola.vercel.app` |
| Staff | `tombola/staff/` | `https://esn-tombola-staff.vercel.app` |

The two pages don't talk to each other (no server). A player can mark any number; the staff check a winning card against
their "Numbers drawn" board.

## Approaches (for the shared part)

1. **Shared style copied into each folder** (picked). `tombola/shared/style.css` is the only shared file: colours,
   fonts, buttons, overlays, flash. `node sync.mjs` copies it into `players/` and `staff/`; a test fails if a copy
   differs. Vercel needs only the Root Directory, no build. The logic is not shared: each page has its own.
2. Build script on Vercel (`node ../build.mjs`): nothing duplicated, but a Build Command per project and a Vercel
   option to keep on.
3. Two fully independent pages: simplest, but the style drifts apart.

## Players (IT / EN / ES, starts in the browser language)

1. **Rules**: title, 4 numbered steps (listen to the numbers, tap to cross out, ambo… cinquina on one row, tombola =
   the whole card → show it to the staff for a prize 🎁), **Get my card**.
2. **Card**: a random real cartella: 3 rows × 9 columns, 5 numbers per row, 15 in all, column 1 = 1–9, column 2 =
   10–19 … column 9 = 80–90, every column used, numbers going down in order. Tap to cross out (a bean covers it), tap
   again to remove. Chips Ambo · Terno · Quaterna · Cinquina · Tombola light up as they are reached.
3. **Flash** the first time each win is reached (best row: 2 ambo, 3 terno, 4 quaterna, 5 cinquina): full screen
   "AMBO!" + "2 numbers on one row · Shout it!" in the chosen language. Win names stay Italian.
4. **Tombola** (all 15): the card stays on screen (the staff check it) under a live banner "TOMBOLA! Show this to the
   staff 🎁" with "FINISHED AT HH:MM", drifting background, shine, confetti.
5. **New game** (in Rules): "Same card, clear the marks" or "New card", with a confirmation.

A Rules button and the IT/EN/ES switch stay visible. Card and marks survive reloads.

## Staff (IT / EN / ES)

- Huge **Draw** button: the ball shakes and spins with numbers flickering (~1.3 s), then lands on the number with a
  bounce. Under it, the number in words in IT · EN · ES (to shout it in any language) and, small, its meaning in the
  Neapolitan Smorfia with the Italian ("'o muorto · il morto").
- The last 5 drawn numbers in a row.
- **Numbers drawn**: a full-screen 1–90 board with the drawn ones lit up, the last one highlighted, and how many are out.
- **Undo last** (for a mistaken tap) and **New game**, both confirmed. 90 drawn → "All numbers are out".
- No repeats (crypto random); the game survives reloads and a locked phone; Wake Lock keeps the screen on.

The Smorfia list is the traditional one (some entries are rude, kept on purpose), in `staff/smorfia.js` to edit.

## Look

Theme A "Cartella napoletana" from `docs/mockups/tombola-themes.html`: cream paper (#f6ecd6 with dots), red
(#b3261e, dark #7a1610), brown ink (#3a1d10), a brown bean on crossed-out numbers, italic serif titles, a cream ball
with a red rim and red number.
