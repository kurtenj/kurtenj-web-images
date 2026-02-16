#!/usr/bin/env node
/**
 * Generates manifest.json from image filenames in the repo.
 * Run from repo root: node scripts/generate-manifest.js
 *
 * Images are discovered recursively from the repo root. Order is determined by
 * natural sort of relative path (e.g. 01.png, 02.png, 10.png). id = 1-based index.
 */

const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"]);
const SKIP_DIRS = new Set([".git", "node_modules", "scripts"]);

const repoRoot = path.resolve(__dirname, "..");

function isImage(filePath) {
  return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function collectImages(dir, baseDir, list) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    const relative = path.relative(baseDir, full).replace(/\\/g, "/");
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) {
        collectImages(full, baseDir, list);
      }
    } else if (ent.isFile() && isImage(full)) {
      list.push(relative);
    }
  }
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true });
}

function main() {
  const images = [];
  collectImages(repoRoot, repoRoot, images);
  images.sort(naturalSort);

  const manifest = images.map((file, index) => ({
    id: index + 1,
    file,
  }));

  const outPath = path.join(repoRoot, "manifest.json");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`Wrote ${outPath} with ${manifest.length} image(s).`);
}

main();
