// A4 QR poster + A4 sheet of 20 cut-out QR cards (4 x 5), each in colour and B&W, as HTML/PDF/PNG.
// Usage: node print-qr.mjs config.json      Example config:
// {
//   "url": "https://esn-taboo.vercel.app", "outDir": "D:/git/ESN_Stuff/taboo/print", "slug": "taboo",
//   "kicker": "ESN BOLOGNA · TANDEM NIGHT", "title": "TABOO", "subtitle": "NIGHT",
//   "tagline": "Describe the word. Don't say the forbidden ones! 🤐", "scan": "SCAN TO PLAY",
//   "steps": ["Scan and read the rules", "Describe, your friends guess", "Guess 5 in 2 minutes, win a prize 🎁"],
//   "colors": { "bg": "#0e3b43", "text": "#f6e7c8", "band": "#e5533d", "bandText": "#ffffff", "bandShadow": "#a8331f",
//               "card": "#fbf1dc", "ink": "#0e3b43", "accent": "#ffc94a" }
// }
import QRCode from 'qrcode';
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const cfg = JSON.parse(readFileSync(process.argv[2], 'utf8'));
mkdirSync(cfg.outDir, { recursive: true });
const host = cfg.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const qr = await QRCode.toString(cfg.url, { type: 'svg', errorCorrectionLevel: 'H', margin: 0, color: { dark: '#0a0a0a', light: '#ffffff' } });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const SANS = `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
const MONO = `ui-monospace, Consolas, "Courier New", monospace`;
const pal = bw => bw
  ? { bg: '#ffffff', text: '#0a0a0a', band: '#0a0a0a', bandText: '#ffffff', bandShadow: '#0a0a0a', card: '#ffffff', ink: '#0a0a0a', accent: '#0a0a0a' }
  : cfg.colors;

function poster(bw) {
  const C = pal(bw);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; } html, body { margin: 0; }
  body { width: 210mm; height: 297mm; background: ${C.bg}; color: ${C.text}; font-family: ${SANS}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { height: 297mm; padding: 14mm 15mm 13mm; display: flex; flex-direction: column; align-items: center; text-align: center; ${bw ? 'border: 2.5mm solid #0a0a0a;' : ''} }
  .kick { font: 800 5mm ${MONO}; letter-spacing: .22em; margin: 0; }
  .t { display: inline-block; background: ${C.band}; color: ${C.bandText}; font-size: 28mm; font-weight: 900; line-height: 1; padding: 2mm 8mm 4mm; border-radius: 7mm; transform: rotate(-2deg); box-shadow: 0 2.5mm 0 ${C.bandShadow}; margin: 7mm 0 0; }
  .n { font-size: 14mm; font-weight: 900; letter-spacing: .12em; margin: 4mm 0 2mm; }
  .tag { font-size: 6.4mm; font-weight: 800; margin: 0 0 6mm; }
  .scan { font: 900 7mm ${SANS}; letter-spacing: .04em; color: ${C.accent}; margin: 0 0 4mm; }
  .qr { background: #fff; padding: 6mm; width: 88mm; height: 88mm; border-radius: 6mm; border: 1.6mm solid ${C.band}; }
  .qr svg { width: 100%; height: 100%; display: block; }
  .url { font: 800 4.8mm ${MONO}; margin: 4mm 0 0; }
  .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; width: 100%; margin-top: auto; }
  .step { background: ${C.card}; color: ${C.ink}; border: ${bw ? '.8mm solid #0a0a0a' : '0'}; border-radius: 5mm; padding: 4.5mm 3mm; display: grid; justify-items: center; gap: 2.5mm; }
  .num { width: 11mm; height: 11mm; border-radius: 3mm; background: ${C.band}; color: ${C.bandText}; display: grid; place-items: center; font: 900 6mm ${SANS}; }
  .step span { font-size: 5.2mm; font-weight: 800; line-height: 1.2; }
  </style></head><body><div class="page">
    <p class="kick">${esc(cfg.kicker)}</p>
    <div class="t">${esc(cfg.title)}</div>
    ${cfg.subtitle ? `<div class="n">${esc(cfg.subtitle)}</div>` : '<div style="height:6mm"></div>'}
    <p class="tag">${esc(cfg.tagline)}</p>
    <p class="scan">▼ ${esc(cfg.scan)} ▼</p>
    <div class="qr">${qr}</div>
    <p class="url">${esc(host)}</p>
    <div class="steps">${cfg.steps.map((s, i) => `<div class="step"><div class="num">${i + 1}</div><span>${esc(s)}</span></div>`).join('')}</div>
  </div></body></html>`;
}

function cards(bw) {
  const C = pal(bw);
  const card = `<div class="card"><p class="kick">ESN BOLOGNA</p><div class="t">${esc(cfg.title)}</div><div class="qr">${qr}</div>
    <p class="scan">${esc(cfg.scan)}</p><p class="url">${esc(host)}</p></div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; } html, body { margin: 0; }
    body { width: 210mm; height: 297mm; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    /* 8 mm page margin keeps every card inside the printable area of home printers */
    .grid { position: absolute; left: 8mm; top: 8mm; width: 194mm; height: 281mm; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(5, 1fr); outline: .3mm dashed #9a9a9a; }
    .card { background: ${C.bg}; color: ${C.text}; font-family: ${SANS}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
      border-right: .3mm dashed #9a9a9a; border-bottom: .3mm dashed #9a9a9a; padding: 1.5mm; }
    .card:nth-child(4n) { border-right: 0; }
    .card:nth-last-child(-n+4) { border-bottom: 0; }
    .kick { margin: 0; font: 800 2.1mm ${MONO}; letter-spacing: .18em; }
    .t { background: ${C.band}; color: ${C.bandText}; font: 900 4.6mm/1 ${SANS}; padding: .6mm 2.4mm 1mm; border-radius: 1.6mm; transform: rotate(-2deg); margin: .8mm 0 1.4mm; max-width: 44mm; }
    .qr { width: 35mm; height: 35mm; background: #fff; padding: 1.8mm; border: .6mm solid ${C.band}; border-radius: 2mm; }
    .qr svg { width: 100%; height: 100%; display: block; }
    .scan { margin: 1.3mm 0 .4mm; font: 900 2.6mm ${SANS}; letter-spacing: .05em; color: ${C.accent}; }
    .url { margin: 0; font: 700 2mm ${MONO}; }
    .note { position: absolute; left: 8mm; bottom: 2.5mm; margin: 0; font: 600 2.4mm ${MONO}; color: #777; }
  </style></head><body><div class="grid">${card.repeat(20)}</div><p class="note">Cut along the dashed lines · print at 100%</p></body></html>`;
}

const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const p = await b.newPage();
for (const [name, html] of [
  [`${cfg.slug}-banner-A4`, poster(false)], [`${cfg.slug}-banner-A4-bw`, poster(true)],
  [`${cfg.slug}-qr-cards-A4`, cards(false)], [`${cfg.slug}-qr-cards-A4-bw`, cards(true)],
]) {
  const file = `${cfg.outDir}/${name}.html`;
  writeFileSync(file, html);
  await p.setViewport({ width: 794, height: 1123, deviceScaleFactor: 3.125 });
  await p.goto('file:///' + file.replace(/\\/g, '/'), { waitUntil: 'load' });
  await p.pdf({ path: `${cfg.outDir}/${name}.pdf`, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await p.screenshot({ path: `${cfg.outDir}/${name}.png`, clip: { x: 0, y: 0, width: 794, height: 1123 } });
  const fit = await p.evaluate(() => [...document.querySelectorAll('.page, .card')].every(c => c.scrollHeight <= c.clientHeight + 1 && c.scrollWidth <= c.clientWidth + 1));
  console.log(name, 'fits:', fit);
}
await b.close();
