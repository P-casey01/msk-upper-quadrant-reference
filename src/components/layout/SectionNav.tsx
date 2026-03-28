'use client'

import Link from 'next/link'
import { SECTIONS } from '@/data/taxonomy'
import { cn } from '@/lib/utils'

interface SectionNavProps {
  region: string
  condition: string
  currentSection: string
}

export function SectionNav({ region, condition, currentSection }: SectionNavProps) {
  return (
    <nav
      className="mb-6 flex gap-1 overflow-x-auto pb-1 scrollbar-thin"
      aria-label="Section navigation"
    >
      {SECTIONS.map(section => (
        <Link
          key={section.slug}
          href={`/${region}/${condition}/${section.slug}`}
          className={cn(
            'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
            currentSection === section.slug
              ? 'bg-brand-600 text-white dark:bg-brand-500'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'
          )}
        >
          {section.label}
        </Link>
      ))}
    </nav>
  )
}
