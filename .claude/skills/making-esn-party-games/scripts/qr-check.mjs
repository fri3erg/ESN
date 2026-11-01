// Decodes every QR code found in the given PNGs (scans a grid of tiles) and prints what they point to.
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import { readFileSync } from 'node:fs';

for (const f of process.argv.slice(2)) {
  const png = PNG.sync.read(readFileSync(f));
  const found = [];
  const tiles = f.includes('cards') ? [4, 5] : [1, 1];
  const tw = Math.floor(png.width / tiles[0]), th = Math.floor(png.height / tiles[1]);
  for (let ty = 0; ty < tiles[1]; ty++) for (let tx = 0; tx < tiles[0]; tx++) {
    const d = new Uint8ClampedArray(tw * th * 4);
    for (let y = 0; y < th; y++) png.data.copy(Buffer.from(d.buffer), y * tw * 4, ((ty * th + y) * png.width + tx * tw) * 4, ((ty * th + y) * png.width + tx * tw + tw) * 4);
    const r = jsQR(d, tw, th);
    found.push(r ? r.data : null);
  }
  console.log(f.split(/[\\/]/).pop(), `${found.filter(Boolean).length}/${found.length} decoded`, [...new Set(found)].join(', '));
}
