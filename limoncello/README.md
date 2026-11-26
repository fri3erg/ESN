# Need more limoncello 🍋

A joke page for the party: type your name once, then a giant yellow button **NEED MORE LIMONCELLO**. Every tap sends
a Telegram message to the organiser ("🍋 Giulia needs more limoncello! (3rd time tonight) · 22:14"), plays a
glug-glug-ding, and flashes "ON ITS WAY!" with lemons raining down. After each tap the button rests for 20 seconds
(a ring counts down), so one happy thumb can't flood the chat.

Live at https://esn-limoncello.vercel.app (not deployed yet).

- The name and the count stay on the phone (localStorage). "Not Giulia? Change name" under the button.
- 🔊 / 🔇 at the top turns the sound off. Add `?reset=1` to the URL to start over.
- If Telegram doesn't answer, the button shakes and says "The bar didn't hear you 😢 Try again!", and nothing is counted.

## Files

- `index.html` – the page (texts, look, sound, flash)
- `limoncello.js` – name cleaning, the 20 s rest (`COOLDOWN_MS`), the message text
- `api/more.js` – the Vercel function that sends the message (plain text, so a name can't add links or formatting)

## Tests

    node --test "tests/*.test.mjs"

## Deploy

Vercel project **`esn-limoncello`** (type the name by hand), Root Directory `limoncello`, Framework preset Other, no
build command. Environment variables, the same bot as Tandem Passport and Undercover:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

`package.json` is deployed on purpose: it makes the function an ES module.
