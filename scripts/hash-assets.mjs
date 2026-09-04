// Content-hash the cacheable assets in a built dist/ tree and rewrite every
// reference to them, so hashed files can be served immutable for a year while a
// new deploy always ships a fresh filename.
//
// Usage: node scripts/hash-assets.mjs [distDir]   (default: dist)
//
// What gets hashed: CSS, JS, fonts, and content images under dist/assets/.
// What is deliberately left alone (stable, externally-referenced URLs):
//   favicon.*, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png,
//   og-card.* (social scrapers cache by URL), and LICENSE.txt. The deploy
//   workflow serves everything under assets/ immutable, then downgrades just
//   those stable files to a short TTL.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, renameSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname, basename, dirname } from 'node:path';

const distDir = process.argv[2] || 'dist';
const assetsDir = join(distDir, 'assets');

const HASHABLE_EXT = new Set(['.css', '.js', '.woff2', '.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif']);
const KEEP_STABLE = [/^favicon(\.|-)/, /^apple-touch-icon\./, /^og-card\./, /^LICENSE\.txt$/i];
const ALREADY_HASHED = /\.[0-9a-f]{8}\.[0-9a-z]+$/i;
const TEXT_EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.webmanifest', '.xml', '.txt']);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

// 1. Rename each hashable asset to name.<hash>.ext and collect old -> new maps.
const replacements = []; // { from, to } — plain-string swaps, longest `from` first

for (const file of walk(assetsDir)) {
  const ext = extname(file).toLowerCase();
  const name = basename(file);
  if (!HASHABLE_EXT.has(ext)) continue;
  if (ALREADY_HASHED.test(name)) continue;
  if (KEEP_STABLE.some((re) => re.test(name))) continue;

  const hash = createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8);
  const hashedName = `${basename(name, ext)}.${hash}${ext}`;
  renameSync(file, join(dirname(file), hashedName));

  const oldRel = relative(distDir, file).split('\\').join('/'); // e.g. assets/css/main.css
  const newRel = oldRel.replace(new RegExp(`${name.replace(/[.]/g, '\\.')}$`), hashedName);
  const dirRel = oldRel.slice('assets/'.length); // css/main.css  -> matches ../css/main.css in CSS

  replacements.push({ from: `/${oldRel}`, to: `/${newRel}` });
  replacements.push({ from: oldRel, to: newRel });
  replacements.push({ from: `../${dirRel}`, to: `../${dirRel.replace(name, hashedName)}` });
}

replacements.sort((a, b) => b.from.length - a.from.length);

// 2. Rewrite references across every text file in dist/.
for (const file of walk(distDir)) {
  if (!TEXT_EXT.has(extname(file).toLowerCase())) continue;
  let text = readFileSync(file, 'utf8');
  let changed = false;
  for (const { from, to } of replacements) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) writeFileSync(file, text);
}

// 3. Log the map.
const hashedList = replacements
  .filter((r) => !r.from.startsWith('/') && !r.from.startsWith('../'))
  .map((r) => `${r.from}  ->  ${r.to}`);

console.log(`Hashed ${hashedList.length} asset(s):`);
for (const line of hashedList) console.log(`  ${line}`);
