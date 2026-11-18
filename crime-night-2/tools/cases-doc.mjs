// Writes docs/cases-and-alibis.html: every case, clue, alibi and the solution, for the organisers to review.
// Run from crime-night-2/:  node tools/cases-doc.mjs
// It reads data/cases.js and data/suspects.js, so run it again after every change to the cases.
import fs from 'node:fs';
import { CASES } from '../data/cases.js';
import { SUSPECTS } from '../data/suspects.js';

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const names = SUSPECTS.map(s => s.name);
const culpritsOf = c => { const cleared = new Set(c.clues.flatMap(x => x.clears)); return names.filter(n => !cleared.has(n)); };
const today = new Date().toISOString().slice(0, 10);

const grid = c => `<table class="grid"><tr><th></th>${names.map(n => `<th>${esc(n)}</th>`).join('')}</tr>
  ${c.clues.map(x => `<tr><th>${x.letter}</th>${names.map(n => `<td>${x.clears.includes(n) ? '✓' : ''}</td>`).join('')}</tr>`).join('')}
  <tr class="sol"><th>?</th>${names.map(n => `<td>${culpritsOf(c).includes(n) ? '☠' : ''}</td>`).join('')}</tr></table>`;

const caseHtml = c => `<section class="case">
  <h2><span>CASE ${String(c.id).padStart(2, '0')}</span> ${esc(c.title.en)} <small>${esc(c.title.it)}</small></h2>
  <p class="meta">${c.culprits === 1 ? '1 culprit' : '2 accomplices'} · ${c.clues.length} clues</p>
  <div class="crime"><b>The crime</b><p>${esc(c.crime.en)}</p><p class="it">${esc(c.crime.it)}</p></div>
  <table class="clues"><tr><th>Clue</th><th>Code word</th><th>Clears</th><th>Alibi</th></tr>
  ${c.clues.map(x => `<tr><td class="l">${x.letter}</td><td class="code">${esc(x.code)}</td><td class="who">${x.clears.map(esc).join(' + ')}</td>
    <td><p>${esc(x.text.en)}</p><p class="it">${esc(x.text.it)}</p></td></tr>`).join('')}</table>
  <div class="bottom">${grid(c)}<div class="solution"><b>Solution (for volunteers only)</b><span>${culpritsOf(c).map(esc).join(' + ')}</span></div></div>
</section>`;

// The case list: one line per case with its culprit(s).
const overview = `<table class="clues overview"><tr><th>Case</th><th>The crime</th><th>Culprit(s)</th></tr>
  ${CASES.map(c => `<tr><td class="l">${String(c.id).padStart(2, '0')}</td><td><b>${esc(c.title.en)}</b> <span class="it">${esc(c.title.it)}</span></td>
    <td class="who">${culpritsOf(c).map(esc).join(' + ')}</td></tr>`).join('')}</table>`;

// Each suspect's alibi in every case (or "no alibi" where they are guilty).
const bySuspect = SUSPECTS.map(s => `<div class="person"><h3>${esc(s.name)}</h3>
  ${CASES.map(c => {
    const clue = c.clues.find(x => x.clears.includes(s.name));
    const head = `<b>Case ${String(c.id).padStart(2, '0')} · ${esc(c.short.en)}</b>`;
    return clue
      ? `<p>${head} <span class="tag">clue ${clue.letter} · ${esc(clue.code)}</span><br>${esc(clue.text.en)}</p>`
      : `<p class="guilty">${head} <span class="tag">NO ALIBI · GUILTY</span></p>`;
  }).join('')}</div>`).join('');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Detective Night: cases and alibis</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; background: #ece6d2; color: #141414; font: 15px/1.5 "Courier New", ui-monospace, monospace; }
  main { max-width: 980px; margin: 0 auto; padding: 24px 16px 40px; }
  h1 { font-size: 30px; margin: 0; letter-spacing: .04em; }
  .draft { display: inline-block; border: 3px double #b3261e; color: #b3261e; padding: 1px 8px; transform: rotate(-3deg); font-weight: 700; margin: 8px 0; }
  .intro { color: #444; }
  .suspects { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin: 14px 0 6px; }
  .suspects div { background: #fffdf6; border-left: 4px solid #141414; padding: 8px 10px; font-size: 13.5px; }
  .suspects b { display: block; font-size: 16px; }
  .case { background: #f6edc6; border: 2px solid #141414; border-radius: 4px 14px 4px 4px; padding: 16px; margin: 26px 0 0; break-inside: avoid-page; }
  h2 { margin: 0; font-size: 22px; } h2 span { color: #b3261e; margin-right: 6px; } h2 small { display: block; font-size: 14px; color: #555; font-weight: 400; }
  .meta { margin: 2px 0 10px; color: #555; font-size: 13px; }
  .crime { background: #fffdf6; padding: 10px 12px; border-left: 4px solid #b3261e; }
  .crime p { margin: 4px 0; }
  .it { color: #666; font-size: 13px; font-style: italic; }
  table { border-collapse: collapse; width: 100%; }
  .clues { margin: 12px 0; background: #fffdf6; }
  .clues th, .clues td { border: 1px solid #c9bd8f; padding: 6px 8px; vertical-align: top; text-align: left; }
  .clues th { background: #141414; color: #f6edc6; font-size: 12px; letter-spacing: .1em; }
  .clues p { margin: 0 0 4px; }
  .l { font-weight: 700; font-size: 18px; color: #b3261e; text-align: center !important; }
  .code { font-weight: 700; white-space: nowrap; } .who { white-space: nowrap; font-weight: 700; }
  .bottom { display: flex; gap: 14px; flex-wrap: wrap; align-items: stretch; }
  .grid { width: auto; background: #fffdf6; font-size: 13px; }
  .grid th, .grid td { border: 1px solid #c9bd8f; padding: 3px 7px; text-align: center; min-width: 34px; }
  .grid tr.sol td { color: #b3261e; font-size: 16px; }
  .solution { flex: 1; min-width: 200px; border: 3px solid #b3261e; padding: 8px 12px; background: #fff; }
  .solution b { display: block; color: #b3261e; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; }
  .solution span { font-size: 22px; font-weight: 700; }
  h2.sec { margin: 30px 0 10px; font-size: 20px; border-bottom: 2px solid #141414; padding-bottom: 4px; }
  .overview td { vertical-align: middle; }
  .people { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 12px; }
  .person { background: #fffdf6; border: 2px solid #141414; padding: 10px 12px; break-inside: avoid; }
  .person h3 { margin: 0 0 6px; font-size: 19px; }
  .person p { margin: 0 0 8px; font-size: 13.5px; }
  .tag { display: inline-block; font-size: 11px; letter-spacing: .06em; border: 1px solid #141414; padding: 0 5px; margin-left: 4px; }
  .guilty { color: #b3261e; } .guilty .tag { border-color: #b3261e; font-weight: 700; }
  @media (max-width: 640px) { .clues td, .clues th { display: block; border-width: 0 0 1px; } .clues tr { display: block; border-bottom: 2px solid #141414; } .clues tr:first-child { display: none; } .code, .who { white-space: normal; } .grid { overflow-x: auto; display: block; } }
  @media print { body { background: #fff; } .case { break-inside: avoid; } }
</style></head><body><main>
<h1>ESN MYSTERY NIGHT · SECOND EDITION</h1>
<p class="intro"><b>International Dinner · Zadaura · 18.11.2026</b></p>
<div class="draft">DRAFT · ${today}</div>
<p class="intro">International dinner edition: ${CASES.length} cases, ${SUSPECTS.length} suspects, ${CASES[0].clues.length} clues per case.
Every player gets one clue per case; to solve a case they need to find people with the other clues.
Each clue gives an alibi to one or two suspects; whoever is left at the end is guilty. English is what players read; the Italian is underneath.</p>
<h2 class="sec">The cases</h2>
${overview}
<h2 class="sec">The suspects</h2>
<div class="suspects">${SUSPECTS.map(s => `<div><b>${esc(s.name)}</b>${esc(s.caption.en)}</div>`).join('')}</div>
<h2 class="sec">Alibis by suspect</h2>
<div class="people">${bySuspect}</div>
<h2 class="sec">Every case in detail</h2>
${CASES.map(caseHtml).join('')}
</main></body></html>`;

fs.mkdirSync(new URL('../docs/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../docs/cases-and-alibis.html', import.meta.url), html);
console.log('docs/cases-and-alibis.html written');
