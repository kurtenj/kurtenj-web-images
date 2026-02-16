# kurtenj-web-images

Portfolio images for the homepage grid, served via [jsDelivr](https://www.jsdelivr.com/).

## Manifest

The site loads images from `manifest.json`. Generate or update it from current image filenames:

```bash
npm run generate-manifest
```

Or without npm:

```bash
node scripts/generate-manifest.js
```

Run from the repo root. The script scans the repo (including subfolders), finds image files (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.avif`), sorts them by path (natural order), and writes `manifest.json` with `id` (1-based) and `file` (path relative to repo root).

## Filename conventions

- **Order** is determined by natural sort of the relative path. Use numeric prefixes for explicit order, e.g. `01.png`, `02.png`, `10.png`.
- **Paths** can be at root (`01.png`) or in a folder (`shots/01.png`); the manifest uses the path relative to the repo root.

## Repo layout

```
kurtenj-web-images/
├── README.md
├── manifest.json
├── package.json
├── scripts/
│   └── generate-manifest.js
├── 01.png
├── 02.png
└── 03.png
```

CDN base: `https://cdn.jsdelivr.net/gh/kurtenj/kurtenj-web-images@latest/`
