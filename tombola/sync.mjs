// Copies the shared look into both sites: each Vercel project only sees its own folder.
// Run after editing shared/: npm run sync
import fs from 'node:fs';

const from = new URL('./shared/style.css', import.meta.url);
for (const page of ['players', 'staff']) {
  fs.copyFileSync(from, new URL(`./${page}/style.css`, import.meta.url));
  console.log(`shared/style.css → ${page}/style.css`);
}
