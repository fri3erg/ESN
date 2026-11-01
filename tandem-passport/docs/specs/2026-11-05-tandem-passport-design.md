# Tandem Passport: design

Brief: "ESN Tandem Passport – Guida Operativa Digitale" (ESN Bologna). Goal: break the ice between Erasmus and local students
and get them practising languages, as a phone game opened from a QR code.

Changes from the brief, agreed with the organisers:
- everyone does **all 6 missions** (not 5 of 6), the same ones for everybody, **revealed in a random order**;
- **no secret missions** and no volunteer unlock (too much hassle on the night).

## Flow

1. **Cover** (the page the QR opens): "TANDEM PASSPORT" with a row of stickers, 3 rules, "OPEN MY PASSPORT".
2. **Passport page**: 6 slots, each a "?" until tapped. Tapping one flips it and puts a random mission that isn't in the passport yet behind it.
   Revealed-but-not-done slots show the mission in its colour and wiggle; done ones show the round sticker.
3. **Mission**: mission number, emoji, title, what to do, "Try asking" conversation starter, big "STAMP IT ✓".
   Word Exchange also asks for the word they learned (required) and its meaning (optional), shown again at the end.
4. **Stamp**: the mission sticker slaps down full screen with a shake and confetti bits (~1.7 s), then back to the passport with the sticker in its slot.
5. **Complete** (after the last stamp): "Passport complete! Show this screen to a volunteer to enter the prize draw", a 4-digit draw number,
   the six stickers, the saved word, "FINISHED AT HH:MM"; drifting background and a light sweep so a screenshot looks dead.
   "My passport" shows the full passport; a big "PLAY AGAIN" starts a new passport after a confirmation ("Show it to a volunteer first!").

A Rules button is on every screen after the cover. State lives in localStorage (memory fallback); `?reset=1` starts over.


## Look

Theme C "Sticker book" from the mockups (chosen by the organisers): sunny yellow #ffd23f, brown text #2b1d0e, pink #ff5d73 buttons,
purple #7b4fd6 completion screen, one bright colour per mission sticker. System fonts only, no external requests.

## Prize draw

The cover asks for the player's name (required). A full passport is sent to the organisers' Telegram chat through the Vercel
function `api/finish.js` (bot token and chat id as environment variables); the finish screen shows the name and whether it got through.
The winner proves it with the finish screen on their phone (same name and draw number).
