// Puts screenshots side by side: node contact.mjs <dir> <out.png> name1 name2 ...
import puppeteer from 'puppeteer-core';
const [dir, out, ...names] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage();
await p.setViewport({ width: 1800, height: 900 });
const base = 'file:///' + dir.replace(/\\/g, '/') + '/';
await p.goto(base);
await p.setContent(`<body style="margin:0;display:flex;gap:6px;background:#888">${names.map(n => `<img style="height:880px" src="${base}${n}.png">`).join('')}</body>`);
await new Promise(r => setTimeout(r, 600));
await p.screenshot({ path: out });
await b.close();
