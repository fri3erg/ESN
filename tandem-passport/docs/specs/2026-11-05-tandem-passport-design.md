# Tandem Passport: design

Brief: "ESN Tandem Passport – Guida Operativa Digitale" (ESN Bologna). Goal: break the ice between Erasmus and local students
and get them practising languages, as a phone game opened from a QR code.

Changes from the brief, agreed with the organisers:
- everyone does **all 6 missions** (not 5 of 6), the same ones for everybody, **revealed in a random order**;
- **no secret missions** and no volunteer unlock (too much hassle on the night).

## Flow

1. **Cover** (the page the QR opens): navy passport cover with a gold crest, 3 rules, "OPEN MY PASSPORT".
2. **Passport page**: 6 visa slots, each a "?" until tapped. Tapping one flips it and puts a random mission that isn't in the passport yet behind it.
   Revealed-but-not-done slots show the mission and pulse; done ones show the ink stamp.
3. **Mission**: visa number, emoji, title, what to do, "Try asking" conversation starter, big "STAMP IT ✓".
   Word Exchange also asks for the word they learned (required) and its meaning (optional), shown again at the end.
4. **Stamp**: the mission's ink stamp slams down full screen with a shake and ink splats (~1.7 s), then back to the passport with the stamp in its slot.
5. **Complete** (after the last stamp): "Passport complete! Show this screen to a volunteer to enter the prize draw", a 4-digit draw number,
   the six stamps, the saved word, "FINISHED AT HH:MM"; drifting background and a light sweep so a screenshot looks dead.
   "See my passport" goes back to the full passport.

A Rules button is on every screen after the cover. State lives in localStorage (memory fallback); `?reset=1` starts over.
No "play again": one passport per person.

## Look

Theme A "Real passport" from the mockups: navy #1d2a4a, gold #e8c872, cream paper #f5ecd7 with a fine security pattern,
serif titles (Georgia), one ink colour per mission stamp. System fonts only, no external requests.

## Open

- Prize draw: how volunteers collect the finishers (names via a Telegram bot was proposed) or whether it becomes a direct prize.
