# MSK Upper Quadrant Clinical Reference

> Evidence-based clinical reference for physiotherapists and allied health professionals in **HSC Northern Ireland**.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com)

---

## Overview

This is a **static-export Next.js site** providing a structured clinical reference for MSK upper quadrant conditions across five anatomical regions:

- 🧠 Cervical Spine
- 🔲 Thoracic Spine
- 🔵 Shoulder
- 🌿 Elbow
- ✋ Wrist & Hand

Each condition has eight standardised sections, all authored as MDX files for easy content population.

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- npm or pnpm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
# 1. Generate search index
node scripts/build-search-index.mjs

# 2. Build static site
npm run build

# Output is in ./out/ — deploy to Vercel, Netlify, or any static host
```

---

## Adding Content

Content lives in `content/[region]/[condition]/[section].mdx`.

### Example path

```
content/shoulder/rotator-cuff-tendinopathy/overview.mdx
```

### Step-by-step

1. Find the condition slug in [`src/data/taxonomy.ts`](./src/data/taxonomy.ts)
2. Copy `content/_TEMPLATE/overview.mdx` to your target path
3. Edit the frontmatter (title, region, condition, section, dates, citations)
4. Write the content using MDX + custom components
5. Run `node scripts/build-search-index.mjs` to update search
6. Run `npm run dev` to preview

### Available MDX Components

| Component | Purpose |
|-----------|---------|
| `<Callout variant="info|warning|danger|tip|evidence">` | Highlighted clinical callout boxes |
| `<SpecialTestsTable tests={[...]} />` | Formatted special tests table with Sn/Sp data |
| `<OutcomeMeasuresTable measures={[...]} />` | Outcome measures table with MCID data |
| `<Cite id="key" />` | Inline citation reference |
| `<CitationList citations={[...]} />` | Rendered reference list at page bottom |
| `<EvidenceBadge grade="A|B|C|D|GPP" />` | Evidence grade badge |

### Adding a New Condition

1. Add the condition to the appropriate region in `src/data/taxonomy.ts`
2. Create the directory: `content/[region]/[condition]/`
3. Add MDX files for each section (copy from `_TEMPLATE/`)

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full technical design.

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

In `vercel.json` or Vercel dashboard, add a build command:
```
node scripts/build-search-index.mjs && next build
```

### Netlify

```toml
# netlify.toml
[build]
  command = "node scripts/build-search-index.mjs && next build"
  publish = "out"
```

---

## Project Structure

```
msk-reference-site/
├── content/                    # MDX content files
│   ├── _TEMPLATE/              # Copy these when authoring new content
│   ├── cervical/
│   │   └── cervical-radiculopathy/
│   │       ├── overview.mdx
│   │       └── ...
│   ├── shoulder/
│   │   └── rotator-cuff-tendinopathy/
│   │       ├── overview.mdx
│   │       ├── special-tests.mdx
│   │       ├── red-flags.mdx
│   │       ├── outcome-measures.mdx
│   │       ├── management.mdx
│   │       └── ...
│   └── ...
├── public/
│   └── search-index.json       # Auto-generated at build time
├── scripts/
│   └── build-search-index.mjs  # Search index builder
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── [region]/           # Region pages
│   │   │   └── [condition]/
│   │   │       └── [section]/  # Content pages
│   │   └── search/             # Search page
│   ├── components/
│   │   ├── layout/             # Header, Footer, Sidebar, etc.
│   │   └── mdx/                # Custom MDX components
│   ├── data/
│   │   └── taxonomy.ts         # Master list of regions, conditions, sections
│   ├── lib/
│   │   ├── mdx.ts              # MDX file reading utilities
│   │   ├── search.ts           # Client-side search
│   │   └── utils.ts            # Helpers
│   └── types/
│       └── index.ts            # All TypeScript types
└── ...config files
```

---

## Clinical Disclaimer

This resource is for **qualified, registered health professionals only**. Clinical information must be applied in conjunction with professional judgement, patient-specific factors, and applicable HSC Northern Ireland policies. This reference does not substitute for appropriate clinical training or professional supervision.

---

## Maintenance

- **Content reviews**: Schedule quarterly reviews aligned with NICE guideline updates
- **Evidence grades**: Reassess when new systematic reviews / CPGs are published
- **Citation audit**: Verify DOIs annually
- **Dependency updates**: `npm audit` monthly; major upgrades reviewed before deployment
