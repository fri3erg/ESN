# Lettera: diventare membro attivo

My letter to ESN Bologna asking to become an active member, as a small slideshow: one paragraph per slide,
written in handwriting in the top part of the screen, with a piece of ASCII art below it (or behind it, on the
rain and cobweb slides).

- Tap, or swipe left, to go forward; swipe right or tap the ESN star in the bottom-left to go back.
  On a PC the arrow keys, space, Home and End work too.
- `#5` at the end of the address opens slide 5.

## Files

- `slides.js`: the text of every slide, its colour and its art. Edit the words here.
- `nav.js`: the tap, swipe and slide-number rules (tested in `tests/`, run `npm test`).
- `art/<name>/index.html`: one art page per folder, shown in a frame under the text. Each restarts
  its animation when its slide opens. All of them are copied from the `fri3erg/ascii_art` repo:
  `art/esn` from `projects/esn`, `art/02-pioggia` … `art/11-bacio` from `projects/lettera`. To change a
  piece, change it there and copy it over again. Two copies were changed here afterwards, so copy these
  changes back to ascii_art too, or they'll be lost on the next copy:
  `04-sezione` takes `?top=` / `?wide=` to start the photo lower (phones / wide screens), and
  `10-ragnatele` has bigger webs that fan a full quarter turn, edge to edge. Also tweaked here: the
  sunrise's longer rays, the flag's lower and stronger cross, confetti across the whole width, more stars
  over the lighthouse, stronger police tape.
- `art/placeholder`: a cloud of letters in ESN colours, for a slide whose `art` is left empty.

## Photos

Slides 4, 5 and 11 draw photos: `art/04-sezione/sezione.jpg`, `art/05-bologna/1-bologna.jpg`,
`art/11-bacio/5-bacio.jpg`. They are committed (on purpose), so a Vercel deploy from GitHub has them;
anyone with the link, or with access to this repo, can see them.

## Running and deploying

Open it through a local server, not as a file (the page uses JS modules and reads photo pixels): `npx serve .`

Vercel: a project with **Root Directory** `active-member-letter`, framework **Other**, no build settings.
Every push to `main` redeploys it.
