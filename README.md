# ESN Stuff

Websites and small tools made for **ESN Bologna** events.

Each project lives in its own folder and is deployed separately on Vercel.

## Projects

| Folder | What it is | Status |
| --- | --- | --- |
| [`active-member-letter/`](active-member-letter/) | My letter asking to become an active member: a slideshow with ASCII art beside each paragraph | Work in progress: art still to come |
| [`crime-night/`](crime-night/) | ESN Mystery Night: detective game web app for the Tandem Night at the Cluricaune Irish Pub | Archived: the event ran on 2026-10-13. Kept as is for reference. |
| [`crime-night-2/`](crime-night-2/) | ESN Mystery Night · Second Edition: same detective game for the International Dinner, new suspects and cases | Live: https://esn-zdaura-detective-night.vercel.app |
| [`filo-invisibile/`](filo-invisibile/) | Il filo invisibile: meet three people, find one specific thing in common with each, three knots for a prize (IT/EN) | https://esn-filo-invisibile.vercel.app |
| [`side-quest/`](side-quest/) | Side Quest: one random social challenge per person, proof shown to a volunteer for a prize | Live: https://esn-side-quest.vercel.app |
| [`tombola/`](tombola/) | Tombola on the bus: a random card on each player's phone with ambo… tombola flashes, and a staff page that draws the numbers with the Smorfia (IT/EN/ES) | Players https://esn-tombola.vercel.app · staff https://esn-tombola-staff.vercel.app (not deployed yet) |
| [`taboo/`](taboo/) | Taboo Night: describe the word without the forbidden ones, guess 5 in 2 minutes for a prize | Live: https://esn-taboo.vercel.app |
| [`tandem-passport/`](tandem-passport/) | Tandem Passport: 6 missions to fill a passport with stickers, finishers sent to Telegram for the draw | Live: https://esn-tandem-passport.vercel.app |
| [`undercover/`](undercover/) | Undercover: secret targets by post-it number, make them say a word or do an action; eliminations sent to Telegram for the draw | https://esn-undercover.vercel.app |

## Deploying a project on Vercel

This repo is a monorepo, so each project needs **its own Vercel project** pointed at its folder:

1. Vercel dashboard → **Add New… → Project** → import `fri3erg/ESN_Stuff` from GitHub.
2. Set **Root Directory** to the project folder (e.g. `crime-night`).
3. Framework preset: **Other** (unless that project's README says otherwise). Leave the build command empty for static sites.
4. Deploy. Every push to `main` that touches the folder redeploys it.

Optional: under the project's *Settings → Git → Ignored Build Step*, use
`git diff --quiet HEAD^ HEAD -- .` so a project only rebuilds when its own folder changes.

## Adding a new project

1. Create a new folder at the root with a short kebab-case name.
2. Add a `README.md` inside it (what it is, the event, how to run it, how to deploy it).
3. Add a row to the table above.
4. Create a new Vercel project for it (see above).
