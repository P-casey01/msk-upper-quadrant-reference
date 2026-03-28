/**
 * Client-side search using FlexSearch.
 * The index is pre-built at build time and serialised to /public/search-index.json.
 */
import type { SearchIndexEntry } from '@/types'

let cachedIndex: SearchIndexEntry[] | null = null

export async function loadSearchIndex(): Promise<SearchIndexEntry[]> {
  if (cachedIndex) return cachedIndex

  const res = await fetch('/search-index.json')
  if (!res.ok) throw new Error('Failed to load search index')

  cachedIndex = await res.json()
  return cachedIndex!
}

export function searchEntries(
  entries: SearchIndexEntry[],
  query: string,
  limit = 20
): SearchIndexEntry[] {
  if (!query.trim()) return []

  const q = query.toLowerCase()

  return entries
    .filter(entry =>
      entry.title.toLowerCase().includes(q) ||
      entry.region.toLowerCase().includes(q) ||
      entry.condition.toLowerCase().includes(q) ||
      entry.section.toLowerCase().includes(q) ||
      entry.content.toLowerCase().includes(q)
    )
    .slice(0, limit)
}
