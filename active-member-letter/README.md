# Lettera: diventare membro attivo

My letter to ESN Bologna asking to become an active member, as a small slideshow: one paragraph per slide,
each with a piece of ASCII art next to it (beside the text on a PC, above it on a phone).

- Tap, or swipe left, to go forward; swipe right or tap the ESN star in the bottom-left to go back.
  On a PC the arrow keys, space, Home and End work too.
- `#5` at the end of the address opens slide 5.

## Files

- `slides.js`: the text of every slide and which art goes with it. Edit the words here.
- `nav.js`: the tap, swipe and slide-number rules (tested in `tests/`, run `npm test`).
- `art/<name>/index.html`: one art page per folder, shown in a frame beside the text. Each restarts
  its animation when its slide opens.
  - `art/esn`: the turning ESN star, copied from `fri3erg/ascii_art` (`projects/esn`). Used on the cover and the last slide.
  - `art/placeholder`: a cloud of letters in ESN colours, shown on slides that don't have their art yet.

## Adding the art for a slide

The art is made in the `ascii_art` repo. When a piece is ready, copy its `index.html` (and any photo it
reads) into `art/<name>/`, then set `art: "art/<name>/index.html"` on that slide in `slides.js`.
If a piece uses a photo, remember it ends up on a public URL.

## Running and deploying

Open it through a local server, not as a file (the page uses JS modules): `npx serve .`

Vercel: a project with **Root Directory** `active-member-letter`, framework **Other**, no build settings.
