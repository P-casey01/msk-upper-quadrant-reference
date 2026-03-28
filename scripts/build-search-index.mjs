/**
 * build-search-index.mjs
 *
 * Run at build time to generate /public/search-index.json.
 * Usage: node scripts/build-search-index.mjs
 *
 * Content structure: content/{region}/{condition}.mdx (flat files)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONTENT_DIR = join(ROOT, 'content')
const PUBLIC_DIR = join(ROOT, 'public')
const OUT_FILE = join(PUBLIC_DIR, 'search-index.json')

function stripMdx(text) {
  return text
    .replace(/---[\s\S]*?---/, '')      // frontmatter
    .replace(/<[^>]+>/g, ' ')           // JSX
    .replace(/[#*`[\]|()]/g, '')        // markdown / table pipes
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300)
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const [k, ...v] = line.split(':')
    if (k && v.length) fm[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '')
  }
  return fm
}

function slugToLabel(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR, { recursive: true })
}

const entries = []

if (!existsSync(CONTENT_DIR)) {
  console.warn('No content/ directory found — search index will be empty.')
  writeFileSync(OUT_FILE, JSON.stringify([]))
  process.exit(0)
}

const regions = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_'))
  .map(d => d.name)

for (const region of regions) {
  const regionDir = join(CONTENT_DIR, region)
  const files = readdirSync(regionDir, { withFileTypes: true })
    .filter(f => f.isFile() && f.name.endsWith('.mdx'))
    .map(f => f.name)

  for (const file of files) {
    const condition = file.replace('.mdx', '')
    const raw = readFileSync(join(regionDir, file), 'utf-8')
    const fm = parseFrontmatter(raw)

    entries.push({
      id: `${region}/${condition}`,
      title: fm.title ?? slugToLabel(condition),
      region,
      condition,
      section: '',
      content: stripMdx(raw),
      href: `/${region}/${condition}`,
    })
  }
}

writeFileSync(OUT_FILE, JSON.stringify(entries, null, 2))
console.log(`✓ Search index built: ${entries.length} entries → ${OUT_FILE}`)
