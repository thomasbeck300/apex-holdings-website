import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const genDir = resolve(__dirname, 'public/imgs/generated');

function getAllPngs(dir) {
  const results = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...getAllPngs(full));
    } else if (extname(entry).toLowerCase() === '.png') {
      results.push(full);
    }
  }
  return results;
}

const pngFiles = getAllPngs(genDir);
console.log(`Found ${pngFiles.length} PNG files to convert...`);

let converted = 0;
for (const pngPath of pngFiles) {
  const webpPath = pngPath.slice(0, -4) + '.webp';
  try {
    await sharp(pngPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    unlinkSync(pngPath);
    converted++;
    console.log(`✓ ${basename(pngPath)} → ${basename(webpPath)}`);
  } catch (err) {
    console.error(`✗ Error converting ${basename(pngPath)}: ${err.message}`);
  }
}

console.log(`\nDone! Converted ${converted}/${pngFiles.length} files.`);
