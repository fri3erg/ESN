# Taboo Night: design

Event: ESN Bologna Taboo Tandem Night, Irish Pub, 10 PM. Players scan a QR code (banner or cut-out card) and play on one phone per group.

## Flow

1. **Rules** (the page the QR opens): 4 short rules. "GOT IT" → Ready.
2. **Ready**: "READY?" and a big START button showing 2:00. START → 3-2-1 countdown → round.
3. **Round** (2 minutes, wall-clock based so locking the phone doesn't stop it):
   - card: category (JOBS / ANIMALS / OBJECTS), the word, "DON'T SAY" and 4 forbidden words;
   - ✓ GOT IT = +1, ✗ TABOO! and Skip just move to the next card, no penalty; max 3 skips per round;
   - every answer flashes a full-screen animation for 1 s (green +1, red shaking ✗, sliding ↷ with skips left), which also swallows double taps;
   - cards from all three categories are mixed in one shuffled deck; no card repeats until the whole deck has gone by,
     and the deck carries over to the next round on the same phone;
   - clock turns red and pulses in the last 10 seconds; the screen is kept awake (Wake Lock) where supported.
4. **End**: "You guessed **X** words!" (number counts up), the guessed words, taboo/skip tally and "FINISHED AT HH:MM".
   - 5 or more: confetti and "Show this screen to a volunteer and win a prize!";
   - fewer: "So close! Guess 5 to win a prize. Try again".
   - The background drifts and the score card shines so a screenshot looks dead (same idea as Side Quest).
   - 🔁 Play again → Ready. After a prize round it asks first ("Show it to a volunteer first!").

A **📖 Rules** button is in the top bar of every screen after the first. During a round it pauses the clock and hides the card until "Back to the game".

State lives in localStorage (memory fallback in private mode); a reload resumes the round or keeps the end screen.
Reloading between rounds goes back to the rules page.

## Look

Theme A "Game night" from the mockups: petrol #0e3b43 background, cream #fbf1dc card, tomato #e5533d word band and main buttons,
green #3fbf8a for ✓, gold #ffc94a for the prize message. System fonts only, no external requests.

## Words

Organiser's lists (Jobs, Animals, Objects), "howl" read as Owl. 4 forbidden words each (cut down from 5 after review), in [`words.js`](../../words.js).
