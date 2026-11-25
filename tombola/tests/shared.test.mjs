import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = p => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

test('players and staff carry the current shared style (run `npm run sync` after editing shared/)', () => {
  const shared = read('shared/style.css');
  for (const page of ['players', 'staff']) assert.equal(read(`${page}/style.css`), shared, `${page}/style.css is out of date`);
});
