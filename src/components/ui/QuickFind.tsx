'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Stethoscope } from 'lucide-react'
import { REGIONS } from '@/data/taxonomy'

// Build a flat searchable index of conditions + common test names
interface QuickEntry {
  label: string
  region: string
  regionLabel: string
  href: string
  type: 'condition' | 'test'
  keywords: string[]
}

const commonTests: Record<string, { region: string; condition: string }> = {
  "Spurling's": { region: 'cervical', condition: 'cervical-radiculopathy' },
  "ULNT": { region: 'cervical', condition: 'cervical-radiculopathy' },
  "Upper Limb Neurodynamic": { region: 'cervical', condition: 'cervical-radiculopathy' },
  "Distraction Test": { region: 'cervical', condition: 'cervical-radiculopathy' },
  "Hoffman's Sign": { region: 'cervical', condition: 'cervical-myelopathy' },
  "Lhermitte's": { region: 'cervical', condition: 'cervical-myelopathy' },
  "Flexion Rotation Test": { region: 'cervical', condition: 'cervicogenic-headache' },
  "Adson's": { region: 'thoracic', condition: 'thoracic-outlet-syndrome' },
  "Roos Test": { region: 'thoracic', condition: 'thoracic-outlet-syndrome' },
  "Neer's": { region: 'shoulder', condition: 'subacromial-pain-syndrome' },
  "Hawkins-Kennedy": { region: 'shoulder', condition: 'subacromial-pain-syndrome' },
  "Empty Can": { region: 'shoulder', condition: 'rotator-cuff-tendinopathy' },
  "Drop Arm": { region: 'shoulder', condition: 'rotator-cuff-tear' },
  "Apprehension Test": { region: 'shoulder', condition: 'shoulder-instability' },
  "O'Brien's": { region: 'shoulder', condition: 'labral-tears' },
  "Cozen's": { region: 'elbow', condition: 'lateral-epicondylalgia' },
  "Mill's Test": { region: 'elbow', condition: 'lateral-epicondylalgia' },
  "Tinel's (elbow)": { region: 'elbow', condition: 'cubital-tunnel-syndrome' },
  "Phalen's": { region: 'wrist-hand', condition: 'carpal-tunnel-syndrome' },
  "Tinel's (wrist)": { region: 'wrist-hand', condition: 'carpal-tunnel-syndrome' },
  "Finkelstein's": { region: 'wrist-hand', condition: 'de-quervains-tenosynovitis' },
  "Scaphoid Shift": { region: 'wrist-hand', condition: 'scaphoid-fracture' },
  "Grind Test": { region: 'wrist-hand', condition: 'thumb-cmc-osteoarthritis' },
}

function buildIndex(): QuickEntry[] {
  const entries: QuickEntry[] = []

  for (const region of REGIONS) {
    for (const condition of region.conditions) {
      entries.push({
        label: condition.label,
        region: region.slug,
        regionLabel: region.label,
        href: `/${region.slug}/${condition.slug}`,
        type: 'condition',
        keywords: [
          condition.label.toLowerCase(),
          condition.slug.replace(/-/g, ' '),
          condition.icd10 || '',
        ],
      })
    }
  }

  for (const [testName, loc] of Object.entries(commonTests)) {
    const region = REGIONS.find(r => r.slug === loc.region)
    if (!region) continue
    entries.push({
      label: testName,
      region: loc.region,
      regionLabel: region.label,
      href: `/${loc.region}/${loc.condition}#special-tests`,
      type: 'test',
      keywords: [testName.toLowerCase()],
    })
  }

  return entries
}

export function QuickFind() {
  const [query, setQuery] = useState('')
  const index = useMemo(() => buildIndex(), [])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return index
      .filter(e => e.keywords.some(k => k.includes(q)) || e.label.toLowerCase().includes(q))
      .slice(0, 8)
  }, [query, index])

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Quick find: condition, test name, or ICD-10…"
          className="w-full rounded-xl border-2 border-surface-200 bg-white py-3.5 pl-12 pr-4 text-base shadow-sm outline-none transition-all focus:border-brand-400 focus:shadow-md focus:ring-2 focus:ring-brand-100 dark:border-surface-700 dark:bg-surface-800 dark:focus:border-brand-500 dark:focus:ring-brand-900"
          aria-label="Quick find"
        />
      </div>

      {results.length > 0 && (
        <ul className="mt-2 divide-y divide-surface-100 rounded-xl border border-surface-200 bg-white shadow-lg dark:divide-surface-800 dark:border-surface-700 dark:bg-surface-900 overflow-hidden" role="listbox">
          {results.map((entry, i) => (
            <li key={i}>
              <Link
                href={entry.href}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-brand-50 dark:hover:bg-brand-950"
              >
                {entry.type === 'test' ? (
                  <Stethoscope className="h-4 w-4 shrink-0 text-blue-500" />
                ) : (
                  <div className="h-4 w-4 shrink-0 rounded-full bg-brand-100 dark:bg-brand-900" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-surface-800 dark:text-surface-200 truncate">{entry.label}</p>
                  <p className="text-xs text-surface-400">
                    {entry.regionLabel}
                    {entry.type === 'test' && ' · Special Test'}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-surface-300 dark:text-surface-600" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.trim() && results.length === 0 && (
        <p className="mt-3 text-center text-sm text-surface-400">
          No matches. Try <Link href="/search" className="text-brand-600 hover:underline dark:text-brand-400">full search</Link>.
        </p>
      )}
    </div>
  )
}
