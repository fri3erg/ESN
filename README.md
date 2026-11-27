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
| [`limoncello/`](limoncello/) | Need more limoncello: type your name, tap a giant yellow button, a Telegram message tells the organiser you need more limoncello (sound, flash, raining lemons) | https://esn-limoncello.vercel.app (not deployed yet) |
| [`side-quest/`](side-quest/) | Side Quest: one random social challenge per person, proof shown to a volunteer for a prize | Live: https://esn-side-quest.vercel.app |
| [`taboo/`](taboo/) | Taboo Night: describe the word without the forbidden ones, guess 5 in 2 minutes for a prize | Live: https://esn-taboo.vercel.app |
| [`tombola/`](tombola/) | Tombola on the bus, two sites with one look: players get a random card on their phone, cross numbers out with an X and get a full-screen flash for ambo… tombola ("first one shouts it"); the staff page draws the numbers with a rolling ball, the number in words and the Smorfia, plus the 1–90 board (IT/EN/ES) | Players https://esn-tombola.vercel.app · staff https://esn-tombola-staff.vercel.app (not deployed yet) |
| [`tandem-passport/`](tandem-passport/) | Tandem Passport: 6 missions to fill a passport with stickers, finishers sent to Telegram for the draw | Live: https://esn-tandem-passport.vercel.app |
| [`undercover/`](undercover/) | Undercover: secret targets by post-it number, make them say a word or do an action; eliminations sent to Telegram for the draw | https://esn-undercover.vercel.app |

## Deploying a project on Vercel

This repo is a monorepo, so each project needs **its own Vercel project** pointed at its folder:

1. Vercel dashboard → **Add New… → Project** → import `fri3erg/ESN` from GitHub.
2. Set **Root Directory** to the project folder (e.g. `crime-night`). A project with two sites uses a subfolder for
   each, as `tombola/players` and `tombola/staff` do (see its README).
3. Framework preset: **Other** (unless that project's README says otherwise). Leave the build command empty for static sites.
4. Deploy. Every push to `main` that touches the folder redeploys it.
5. Open the project's **Analytics** tab, press **Enable**, then **Redeploy** the latest deployment (the script route only exists in deployments made after enabling). The pages already load `/_vercel/insights/script.js`
   (visits, countries, devices; no cookies); until Analytics is enabled that request just fails, harmlessly.

Every deployed folder also has a `robots.txt` and a `noindex` meta in its pages: the games are reached from QR codes
at the venue and stay out of search engines and AI crawlers.

Optional: under the project's *Settings → Git → Ignored Build Step*, use
`git diff --quiet HEAD^ HEAD -- .` so a project only rebuilds when its own folder changes.

## Adding a new project

1. Create a new folder at the root with a short kebab-case name.
2. Add a `README.md` inside it (what it is, the event, how to run it, how to deploy it).
3. Add a row to the table above.
4. Create a new Vercel project for it (see above), and type the Project Name `esn-<folder>` by hand: Vercel
   suggests `esnstuff-…`, and the URL comes from that name.
