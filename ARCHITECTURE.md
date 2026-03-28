# Architecture — MSK Upper Quadrant Clinical Reference

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    STATIC NEXT.JS SITE                          │
│                                                                 │
│  ┌─────────────────┐    ┌──────────────────┐                   │
│  │   App Router    │    │   MDX Content    │                   │
│  │  (Next.js 14)   │───▶│  (content/**/)   │                   │
│  └────────┬────────┘    └──────────────────┘                   │
│           │                                                     │
│  ┌────────▼────────┐    ┌──────────────────┐                   │
│  │   Components    │    │   Taxonomy Data  │                   │
│  │  Layout + MDX   │    │ (taxonomy.ts)    │                   │
│  └────────┬────────┘    └──────────────────┘                   │
│           │                                                     │
│  ┌────────▼────────┐    ┌──────────────────┐                   │
│  │  Static Export  │───▶│  /out/ directory │                   │
│  │  (next export)  │    │  (deployable)    │                   │
│  └─────────────────┘    └──────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Rationale

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Framework | Next.js 14 (App Router) | Static export, SEO, modern React patterns, Vercel-native |
| Language | TypeScript | Type safety for taxonomy + frontmatter validation |
| Styling | Tailwind CSS | Utility-first, dark mode support, no runtime CSS |
| Content | MDX (next-mdx-remote) | Markdown + React components; author-friendly |
| Search | FlexSearch (client-side) | Zero server cost; pre-built JSON index |
| Themes | next-themes | SSR-safe dark mode without flash |
| Fonts | Inter (Google Fonts) | Professional, legible, clinical UX convention |
| Deployment | Vercel / Netlify | Free tier, automatic deploys, zero ops |

---

## URL Structure

```
/                                     → Home (region grid)
/[region]                             → Region overview
/[region]/[condition]                 → Redirect → /[region]/[condition]/overview
/[region]/[condition]/[section]       → Content page (MDX rendered)
/search                               → Full-text search (client-side)
```

### Example URLs

```
/shoulder
/shoulder/rotator-cuff-tendinopathy
/shoulder/rotator-cuff-tendinopathy/overview
/shoulder/rotator-cuff-tendinopathy/special-tests
/shoulder/rotator-cuff-tendinopathy/red-flags
/shoulder/rotator-cuff-tendinopathy/management
/cervical/cervical-radiculopathy/overview
/wrist-hand/carpal-tunnel-syndrome/special-tests
```

---

## Data Model

### Taxonomy (compile-time, `src/data/taxonomy.ts`)

```
Region
  slug: string          (URL segment)
  label: string         (display name)
  conditions: Condition[]

Condition
  slug: string
  label: string
  region: RegionSlug
  icd10?: string

Section (fixed set of 8)
  overview
  special-tests
  red-flags
  clinical-frameworks
  outcome-measures
  evidence-based-diagnosis
  differential-diagnosis
  management
```

### Content (MDX frontmatter)

```
ConditionFrontmatter
  title: string
  region: RegionSlug
  condition: string
  section: SectionSlug
  lastReviewed: ISO date string
  reviewedBy?: string
  evidenceGrade?: A | B | C | D | GPP
  icd10?: string
  tags?: string[]
  relatedConditions?: string[]
  citations?: Citation[]
```

---

## Content Authoring Pipeline

```
Author writes .mdx file
         │
         ▼
Frontmatter parsed by gray-matter (lib/mdx.ts)
         │
         ▼
MDX compiled by next-mdx-remote (server component)
         │
         ├─── Custom components injected (MDXComponents.tsx)
         │
         ▼
Page rendered at build time (generateStaticParams)
         │
         ▼
HTML + JS written to /out/
```

---

## Search Architecture

```
Build time:
  scripts/build-search-index.mjs
    → reads all content/*.mdx files
    → extracts title + plain text excerpt
    → writes /public/search-index.json

Runtime (client):
  /search page loads
    → fetches /search-index.json (single HTTP request)
    → cached in component state
    → simple substring search on user input
    → results rendered with links back to content pages
```

**Why not a server-side search API?**  
This is a static site — there's no server. Client-side search with a pre-built JSON index is the standard pattern. FlexSearch is included as a dependency for future upgrade to indexed full-text search if the content volume grows.

---

## Static Generation Strategy

All pages use `generateStaticParams()` to produce the full set of valid routes at build time:

```typescript
// getAllConditionPaths() returns:
// { region, condition, section } for every combination in taxonomy.ts
```

Pages with no corresponding MDX file render a **"Content coming soon"** placeholder rather than 404-ing. This allows the full navigation structure to exist before all content is authored.

---

## Custom MDX Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `<Callout>` | Clinical callout box | `variant`, `title`, `children` |
| `<SpecialTestsTable>` | Diagnostic accuracy table | `tests: SpecialTest[]` |
| `<OutcomeMeasuresTable>` | Outcome measures table | `measures: OutcomeMeasure[]` |
| `<Cite>` | Inline citation superscript | `id: string` |
| `<CitationList>` | Reference list at page bottom | `citations: Citation[]` |
| `<EvidenceBadge>` | Grade badge (A/B/C/D/GPP) | `grade: string` |

All components are typed via `src/types/index.ts`.

---

## Colour System

The Tailwind config defines four semantic colour scales:

| Scale | Use | Key colour |
|-------|-----|-----------|
| `brand` | Links, active states, primary actions | Teal/HSC NI blue `#1a87aa` |
| `accent` | Warnings, clinical notes | Amber `#f08000` |
| `danger` | Red flags, urgent alerts | Red `#e02020` |
| `surface` | Backgrounds, borders, text | Slate-based neutrals |

Dark mode is implemented via Tailwind's `dark:` variant + `next-themes` class strategy.

---

## Performance Considerations

- **Static export** — zero server compute, CDN-cached HTML
- **No client-side route fetching** — all pages pre-rendered
- **Search JSON** loaded once per session, thereafter in-memory
- **Inter font** — variable font, single request, `display: swap`
- **No image optimisation** (`unoptimized: true`) — required for static export; images should be pre-optimised before adding
- **Typography plugin** — prose styles applied via `prose-clinical` utility class; no runtime overhead

---

## Development Workflow

```bash
# Local dev
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build + export (production)
node scripts/build-search-index.mjs && npm run build
# Output: ./out/

# Preview production build locally
npx serve out
```

---

## Deployment Checklist

- [ ] All MDX frontmatter `lastReviewed` dates are current
- [ ] `node scripts/build-search-index.mjs` run before `next build`
- [ ] `next.config.ts` has `output: 'export'` and `trailingSlash: true`
- [ ] Environment: Node ≥ 18
- [ ] Build command on host: `node scripts/build-search-index.mjs && next build`
- [ ] Publish directory on host: `out`
- [ ] Verify dark mode toggle works post-deploy
- [ ] Verify search returns results post-deploy
- [ ] Test on mobile (iOS Safari, Android Chrome) — responsive layout

---

## Future Enhancements

| Priority | Feature |
|----------|---------|
| High | CMS integration (Contentlayer or Keystatic) for GUI content editing |
| High | PDF export per condition section |
| Medium | Filtering by evidence grade on region/condition pages |
| Medium | "Recently updated" feed |
| Medium | Multilingual support (Irish/Ulster Scots for patient-facing materials) |
| Low | Offline PWA mode (service worker for offline clinical use) |
| Low | QR codes for each condition page (paper-to-digital workflow) |
| Low | Integration with NICE Evidence Search API |
