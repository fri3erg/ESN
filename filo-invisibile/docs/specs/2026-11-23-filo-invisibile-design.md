# Il filo invisibile: design

Tandem night game from the organisers' guide (`Il_filo_invisibile_ESN_Bologna-2.pdf`, `…_70_situazioni.pdf`).
Meet three different people; with each, read one question together, both answer, and find one *specific* thing you have
in common ("We both…", one real example each). Both tap **Thread found** → one knot. Three knots → the ball of yarn is
complete → show it at the ESN desk for a prize. Live at `https://esn-filo-invisibile.vercel.app`.

## Flow (one phone each, progress saved on the phone)

1. **Rules**: mission + 3 steps, IT / EN switch (starts in the browser language). **Start**.
2. **Look around**: "Want to play with someone nearby?" → **We're ready**.
3. **Card**: knots so far (● ○ ○), category, question in the chosen language with the other language small underneath,
   the "be specific" rule. **Thread found** → "Does it count for both of you?" → **Yes, tie a knot** / back to the
   question. **Another question**. After ~2 minutes on a card a gentle nudge: "Keep going, change question or say goodbye"
   (never a countdown).
4. **Switch**: "Time to switch! Say goodbye and find someone new." → **I found someone**.
5. **Done** (3rd knot): "Ball of yarn complete! Show this at the ESN desk 🎁", completed time, alive background.
   Volunteer taps **Prize collected** (with confirm) → "Prize collected". After that, more cards just for fun.

A **Rules** button stays visible. Double taps and reloads never give two knots or two prizes (`game.js`, tested).

## Secret

Five quick taps on the thread, the title, the knots at the top or the ball of yarn: ladybugs (Joana's animal) climb out of the thread and crawl off the screen. Reduced motion: they just fade in and out.

## Content

`deck.js`: the 70-card deck minus 11–20 (the guide says 51–70 replace the easier social ones), IT + EN.
Prize wording: "prize", per the ESN rules.

## Look

A+ "red thread" from `docs/mockups/filo-invisibile-themes.html`: theme A (picked by the organisers) recoloured in white and red (#c8102e, dark #8a0b20, pale pink #fdecef), a red thread with the knots and a red ball of yarn.
