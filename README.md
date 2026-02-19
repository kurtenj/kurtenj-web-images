# kurtenj-web-images

Portfolio images for the homepage grid, served via raw GitHub URLs.

## Manifest

The site loads images from `manifest.json`. Generate or update it from current image filenames:

```bash
npm run generate-manifest
```

Or without npm:

```bash
node scripts/generate-manifest.js
```

Run from the repo root. The script scans the repo (including subfolders), finds image files (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.avif`), sorts them by path in reverse natural order (highest number first), and writes `manifest.json` with `id` (1-based) and `file` (path relative to repo root).

## Filename conventions

- **Order** is determined by reverse natural sort of the relative path — highest number first. Use numeric prefixes for explicit order, e.g. `10.png` appears before `02.png`.
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

Raw base URL: `https://raw.githubusercontent.com/kurtenj/kurtenj-web-images/main/`
