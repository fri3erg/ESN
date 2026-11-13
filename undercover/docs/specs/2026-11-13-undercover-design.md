# Undercover (nobody is safe): design

A secret-assassin game for a tandem night. Every player wears a post-it with a number (1–200, written by the
organisers). Each player has a secret target (another number) and a secret mission: make the target **say** a word,
or **do** an action, without them realising. Rules: you can never say the word yourself first, and if the target
guesses your mission it does not count. Live at `https://esn-undercover.vercel.app` (Vercel project `esn-undercover`).

## The circle

`chain.js` holds one random circle over all 200 numbers, generated once (2026-11-13): each number hunts the next one,
the last hunts the first. Everyone who plays is in it; numbers nobody wears are simply skipped.

- **Start**: type your post-it number → your target is the next number after you in the circle.
- **Eliminated ☠**: your target fell for it → the kill is saved and your new target is the one *they* were hunting
  (the next in the circle).
- **Already out / not here?**: the target was eliminated by someone else, or nobody wears that number → move on to
  the next in the circle, no kill counted.
- Numbers you eliminated or skipped never come back. If the circle brings you back to yourself, nobody is left: you win.
- **I got eliminated**: the player taps it themselves; the game ends, their eliminations stay on the screen.
- Each target comes with a random mission from `missions.js`, no repeats until all are used.

## Prize draw

Every elimination is sent to the organisers' Telegram chat (same bot as Tandem Passport, `api/eliminate.js`):
`☠ #12 eliminated #25 · MAKE THEM SAY: Dog · 🎟 Draw ticket…`. One message = one ticket: at the end the organisers draw
a prize among the tickets. On screen: "We draw a prize 🎁 · every elimination is one ticket". Unsent kills retry.

## Screens

1. Start: rules (4 cards) + "your number" + big button.
2. Hunting: your number, eliminations so far, target number big, mission (SAY / DO), "don't get caught" hint,
   big ELIMINATED button, small "Already out?" and "I got eliminated" (with confirm).
3. Elimination: full-screen flash, count-up of your eliminations, "tickets in the draw", time; NEXT TARGET.
4. Out: "You're out", your eliminations and tickets, time. Last standing: a winner screen.

## Look

Theme to be picked from `docs/mockups/undercover-themes.html`: A masquerade, B night vision, C incognito (secret / undercover, not detective).

## Content

`missions.js`: the organisers' list (undercover.pdf), minus the ones cut as too easy (Pizza, high five, native language)
and "dance for 5 s" (same as the dance move); "Ex-boyfriend" became "Ex".
