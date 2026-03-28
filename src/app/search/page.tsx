'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import type { SearchIndexEntry } from '@/types'
import { loadSearchIndex, searchEntries } from '@/lib/search'
import { slugToLabel } from '@/lib/utils'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchIndexEntry[]>([])
  const [index, setIndex] = useState<SearchIndexEntry[]>([])
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadSearchIndex()
      .then(setIndex)
      .catch(console.error)
      .finally(() => setLoading(false))

    // Auto-focus search input
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!index.length) return
    setResults(searchEntries(index, query))
  }, [query, index])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-50">
        Search
      </h1>

      {/* Search input */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search conditions, tests, treatments…"
          className="w-full rounded-xl border border-surface-200 bg-white py-3 pl-10 pr-4 text-base shadow-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-surface-700 dark:bg-surface-800 dark:focus:border-brand-500 dark:focus:ring-brand-900"
          aria-label="Search"
        />
      </div>

      {/* Results */}
      {loading && (
        <p className="text-sm text-surface-400">Loading search index…</p>
      )}

      {!loading && query && results.length === 0 && (
        <p className="text-sm text-surface-500 dark:text-surface-400">
          No results for &ldquo;<strong>{query}</strong>&rdquo;. Try a different term.
        </p>
      )}

      {results.length > 0 && (
        <ul className="space-y-3" role="list" aria-label="Search results">
          {results.map(entry => (
            <li key={entry.id}>
              <Link
                href={entry.href}
                className="flex items-start justify-between gap-3 rounded-xl border border-surface-200 bg-white p-4 shadow-sm transition-all hover:border-brand-300 hover:shadow-md dark:border-surface-700 dark:bg-surface-900 dark:hover:border-brand-600"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-brand-600 dark:text-brand-400">
                      {slugToLabel(entry.region)}
                    </span>
                    <span className="text-surface-300 dark:text-surface-600">›</span>
                    <span className="text-xs text-surface-500 dark:text-surface-400">
                      {slugToLabel(entry.condition)}
                    </span>
                    <span className="text-surface-300 dark:text-surface-600">›</span>
                    <span className="text-xs text-surface-500 dark:text-surface-400">
                      {slugToLabel(entry.section)}
                    </span>
                  </div>
                  <p className="font-medium text-surface-900 dark:text-surface-100">{entry.title}</p>
                  {entry.content && (
                    <p className="mt-1 line-clamp-2 text-sm text-surface-500 dark:text-surface-400">
                      {entry.content}
                    </p>
                  )}
                </div>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-surface-400" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && !query && (
        <div className="text-center text-sm text-surface-400">
          Start typing to search all conditions, special tests, and clinical sections.
        </div>
      )}
    </div>
  )
}
