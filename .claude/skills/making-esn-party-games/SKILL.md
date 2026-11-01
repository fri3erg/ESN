---
name: making-esn-party-games
description: Use when building a new ESN Bologna event game or activity web page in the ESN_Stuff repo (Side Quest, Taboo, Tandem Passport style) - a phone page opened from a QR code at a party night, with mockups to choose a theme, posters and cut-out QR cards to print.
---

# Making ESN party games

## Overview

Each event is one folder in this repo (`side-quest/`, `taboo/`, ...), deployed as its own Vercel project at `https://esn-<folder>.vercel.app`. Players scan a QR code at the venue, play on their phone, then show the screen to a volunteer for a prize. Reference builds: `side-quest/` (missions, reveal animation, swap) and `taboo/` (timer game, decks, full-screen feedback).

**The point is always to make strangers talk to each other.** Every quest, card or mission involves another person (ask, teach, find someone who…, get a group to…). Never a solo task.

## Fixed rules from the organiser

| Rule | Detail |
|---|---|
| "Prize", never "candy" | "Show this screen to a volunteer and win a prize 🎁". Prizes vary per night. |
| Never state how many quests/missions exist | No "1 of 23", no totals on screen or posters. Thresholds ("guess 5", "complete 5") are fine. |
| Commit, then push to `main` straight away | No need to ask. Pushes auto-deploy. |
| Content the organiser sends is used as given | Fix typos, ask about real ambiguities (e.g. "howl" → Owl?), never invent replacements silently. |
| URL is `esn-<folder>.vercel.app` | Vercel suggests `esnstuff-…`; the Project Name must be typed by hand. Hashed deploy URLs are login-protected: never put them in a QR. |

## Workflow

1. **Read the brief** (often an Italian PDF/message). List the mechanics, the content (quests, words…) and open questions; ask only what changes the build.
2. **Theme mockups first.** One standalone HTML in `<folder>/docs/mockups/<folder>-themes.html`, 3 themes side by side as phone frames (260×540), each showing the real main screen with real content. Self-contained (no external requests), no sideways scroll on a phone, a "pick A, B or C" header: the organiser forwards it to friends to vote. Expect "these colours are ugly" → recolour fast.
3. **Spec** in `<folder>/docs/specs/YYYY-MM-DD-<folder>-design.md`: flow screen by screen, look (palette), content. Short.
4. **Build** (no build step): `index.html` (UI + CSS, inline `<script type="module">`), `<content>.js` (the organiser's list, the only file to edit), `game.js`/`quest.js` (pure state functions), `tests/*.test.mjs` (`node --test`), `package.json` (`"type": "module"`), `.vercelignore` (`tests docs package.json README.md print`), `README.md`. Logic test-first.
5. **Headless walkthrough** with puppeteer-core on 390×844 and 360×640: every screen, reloads, no sideways scroll, main screens fit without scrolling, no external requests, no JS errors. Look at the screenshots yourself.
6. **Print material** (`<folder>/print/`, colour + B&W each): A4 poster with a big QR + 3 steps, and an A4 sheet of 20 cut-out QR cards (4×5, 35 mm QR, dashed cut lines, 8 mm margin). Decode every QR from the PNGs before committing.
7. **README**: what it is, live URL, how to edit the content, print files, run/test/deploy.

## Look and feel

- Colourful and playful, made for a dark pub: big type (titles 50–90 px), chunky buttons with a 5–6 px bottom shadow that presses down, cards on a coloured background, system fonts only.
- Start screen = rules as 3–4 numbered cards + one big button. A Rules button stays visible on every later screen.
- Animate the moments that matter: reveal, every answer (full-screen flash ~1 s), the win screen (count-up number, confetti).
- Win screen must look alive (drifting background + shine sweep + "FINISHED AT HH:MM") so a screenshot reads as fake; this is a deterrent, not security.
- "Play again" is big; ask for confirmation only when it would erase a prize-winning screen.
- `@media (max-height: 700px)` compaction; `prefers-reduced-motion` turns animations off.

## Implementation patterns (copy from the reference builds)

- State: one JSON object in localStorage via `safeStorage()` (memory fallback), `load()` validates and drops corrupt or outdated data, `?reset=1` clears.
- Randomness: `secureRandomInt` (crypto + rejection sampling); shuffled deck with no repeats until exhausted, carried across rounds.
- Timers: wall-clock `endAt`, not counting ticks, so locking the phone doesn't cheat the clock; Wake Lock while playing.
- `esc()` every piece of content put into HTML.

## Print scripts

`scripts/` here holds `print-qr.mjs` (poster + card sheet from a JSON config), `qr-check.mjs` (decodes the QRs in PNGs) and `contact.mjs` (screenshots side by side for review). Node resolves their imports from the script's folder, so copy them into a scratch folder first:

    npm i puppeteer-core@23 qrcode@1 jsqr pngjs
    node print-qr.mjs config.json        # see the example config at the top of the script
    node qr-check.mjs <folder>/print/*.png

Chrome is at `C:/Program Files/Google/Chrome/Application/chrome.exe`.

## Common mistakes

- Writing "candy", or showing a quest total, anywhere, posters included.
- A solo task in the content (it must involve talking to someone).
- Building before the organiser has picked a theme.
- Forgetting the B&W versions or not decoding the QR codes.
- Checking only a big phone: 360×640 is where things overflow.
