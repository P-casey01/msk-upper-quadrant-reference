/**
 * Custom MDX component overrides.
 * These are injected via next-mdx-remote's `components` prop.
 */
import type { MDXComponents } from 'mdx/types'
import { AlertTriangle, Info, CheckCircle, Lightbulb, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SpecialTest, OutcomeMeasure, Citation } from '@/types'

// ─── Callout boxes ─────────────────────────────────────────────────────────────

type CalloutVariant = 'warning' | 'danger' | 'info' | 'tip' | 'evidence'

const calloutConfig: Record<CalloutVariant, {
  icon: React.ElementType
  classes: string
  label: string
}> = {
  warning: {
    icon: AlertTriangle,
    classes: 'border-accent-400 bg-accent-50 text-accent-900 dark:border-accent-700 dark:bg-accent-950 dark:text-accent-100',
    label: 'Clinical Note',
  },
  danger: {
    icon: AlertTriangle,
    classes: 'border-danger-500 bg-danger-50 text-danger-900 dark:border-danger-700 dark:bg-danger-950 dark:text-danger-100',
    label: 'Red Flag',
  },
  info: {
    icon: Info,
    classes: 'border-brand-400 bg-brand-50 text-brand-900 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-100',
    label: 'Information',
  },
  tip: {
    icon: Lightbulb,
    classes: 'border-green-400 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-100',
    label: 'Clinical Tip',
  },
  evidence: {
    icon: BookOpen,
    classes: 'border-purple-400 bg-purple-50 text-purple-900 dark:border-purple-700 dark:bg-purple-950 dark:text-purple-100',
    label: 'Evidence',
  },
}

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
}

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[variant]
  const Icon = config.icon

  return (
    <div className={cn('my-4 rounded-lg border-l-4 p-4', config.classes)}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
        <div className="min-w-0">
          {title && (
            <p className="mb-1 font-semibold">{title ?? config.label}</p>
          )}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Special tests table ───────────────────────────────────────────────────────

interface SpecialTestsTableProps {
  tests: SpecialTest[]
}

export function SpecialTestsTable({ tests }: SpecialTestsTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-surface-200 dark:border-surface-700">
      <table className="min-w-full text-sm">
        <thead className="bg-surface-100 dark:bg-surface-800">
          <tr>
            {['Test', 'Target', 'Sn (%)', 'Sp (%)', '+LR', '−LR', 'Notes'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-surface-700 dark:text-surface-300">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
          {tests.map((t, i) => (
            <tr key={i} className="hover:bg-surface-50 dark:hover:bg-surface-800/50">
              <td className="px-4 py-3 font-medium text-brand-700 dark:text-brand-400">{t.name}</td>
              <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{t.target}</td>
              <td className="px-4 py-3">{t.sensitivity}</td>
              <td className="px-4 py-3">{t.specificity}</td>
              <td className="px-4 py-3">{t.lr_positive ?? '—'}</td>
              <td className="px-4 py-3">{t.lr_negative ?? '—'}</td>
              <td className="px-4 py-3 text-xs text-surface-500 dark:text-surface-400">{t.notes ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Outcome measures table ────────────────────────────────────────────────────

interface OutcomeMeasuresTableProps {
  measures: OutcomeMeasure[]
}

export function OutcomeMeasuresTable({ measures }: OutcomeMeasuresTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-surface-200 dark:border-surface-700">
      <table className="min-w-full text-sm">
        <thead className="bg-surface-100 dark:bg-surface-800">
          <tr>
            {['Measure', 'Abbrev.', 'Construct', 'Items', 'MCID', 'Scoring', 'Free?'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-surface-700 dark:text-surface-300">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
          {measures.map((m, i) => (
            <tr key={i} className="hover:bg-surface-50 dark:hover:bg-surface-800/50">
              <td className="px-4 py-3 font-medium">{m.name}</td>
              <td className="px-4 py-3 font-mono text-brand-600 dark:text-brand-400">{m.abbreviation}</td>
              <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{m.construct}</td>
              <td className="px-4 py-3">{m.items}</td>
              <td className="px-4 py-3">{m.mcid ?? '—'}</td>
              <td className="px-4 py-3">{m.scoringRange ?? '—'}</td>
              <td className="px-4 py-3">
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  m.freeAccess
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400'
                )}>
                  {m.freeAccess ? 'Yes' : 'No'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Citation reference ────────────────────────────────────────────────────────

interface CiteProps {
  id: string
}

export function Cite({ id }: CiteProps) {
  return (
    <sup>
      <a
        href={`#ref-${id}`}
        className="text-brand-600 hover:underline dark:text-brand-400"
        aria-label={`Citation ${id}`}
      >
        [{id}]
      </a>
    </sup>
  )
}

// ─── Citation list (rendered at bottom of page) ───────────────────────────────

interface CitationListProps {
  citations: Citation[]
}

export function CitationList({ citations }: CitationListProps) {
  if (!citations?.length) return null

  return (
    <section className="mt-12 border-t border-surface-200 pt-8 dark:border-surface-700" aria-label="References">
      <h2 className="mb-4 text-lg font-semibold text-surface-800 dark:text-surface-200">References</h2>
      <ol className="space-y-3 text-sm">
        {citations.map((c) => (
          <li key={c.id} id={`ref-${c.id}`} className="flex gap-3 text-surface-600 dark:text-surface-400">
            <span className="shrink-0 font-mono text-xs text-brand-600 dark:text-brand-400">[{c.id}]</span>
            <span>
              {c.authors.join(', ')} ({c.year}). <em>{c.title}</em>
              {c.journal && `. ${c.journal}`}
              {c.volume && `, ${c.volume}`}
              {c.issue && `(${c.issue})`}
              {c.pages && `, ${c.pages}`}
              {c.doi && (
                <> · <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 hover:underline dark:hover:text-brand-400">DOI</a></>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

// ─── Clinical Note ────────────────────────────────────────────────────────────

interface ClinicalNoteProps {
  children: React.ReactNode
  title?: string
}

export function ClinicalNote({ children, title }: ClinicalNoteProps) {
  return (
    <div className="my-4 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4 dark:border-brand-700 dark:bg-brand-950">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden />
        <div className="min-w-0">
          {title && <p className="mb-1 font-semibold text-brand-900 dark:text-brand-100">{title}</p>}
          <div className="text-sm leading-relaxed text-brand-900 dark:text-brand-100">{children}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Red Flag ────────────────────────────────────────────────────────────────

interface RedFlagProps {
  children: React.ReactNode
  severity?: string
  title?: string
}

export function RedFlag({ children, title }: RedFlagProps) {
  return (
    <div className="my-4 rounded-lg border-l-4 border-danger-500 bg-danger-50 p-4 dark:border-danger-700 dark:bg-danger-950">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger-600 dark:text-danger-400" aria-hidden />
        <div className="min-w-0">
          <p className="mb-1 font-semibold text-danger-900 dark:text-danger-100">{title ?? 'Red Flag'}</p>
          <div className="text-sm leading-relaxed text-danger-900 dark:text-danger-100">{children}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Referral Box ────────────────────────────────────────────────────────────

interface ReferralBoxProps {
  children: React.ReactNode
  title?: string
  type?: string
}

export function ReferralBox({ children, title, type }: ReferralBoxProps) {
  return (
    <div className="my-4 rounded-lg border border-brand-300 bg-brand-50 p-4 dark:border-brand-700 dark:bg-brand-950">
      <div className="flex items-start gap-3">
        <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden />
        <div className="min-w-0">
          {(title ?? type) && (
            <p className="mb-1 font-semibold text-brand-900 dark:text-brand-100">{title ?? type}</p>
          )}
          <div className="text-sm leading-relaxed text-brand-900 dark:text-brand-100">{children}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Evidence grade badge ──────────────────────────────────────────────────────

interface EvidenceBadgeProps {
  grade?: 'A' | 'B' | 'C' | 'D' | 'GPP'
  level?: string
}

const gradeColours: Record<string, string> = {
  A:        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  B:        'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200',
  C:        'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200',
  D:        'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300',
  GPP:      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  high:     'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  moderate: 'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200',
  low:      'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200',
}

export function EvidenceBadge({ grade, level }: EvidenceBadgeProps) {
  const key = grade ?? level ?? ''
  const colour = gradeColours[key] ?? gradeColours['D']
  const label = grade ? `Grade ${grade}` : level ? `Evidence: ${level}` : 'Evidence'
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', colour)}>
      {label}
    </span>
  )
}

// ─── MDX component map ─────────────────────────────────────────────────────────

export const mdxComponents: MDXComponents = {
  // Custom components available inside MDX files
  Callout,
  SpecialTestsTable,
  OutcomeMeasuresTable,
  Cite,
  CitationList,
  EvidenceBadge,
  ClinicalNote,
  RedFlag,
  ReferralBox,

  // Prose overrides
  h1: ({ children }) => (
    <h1 className="mb-4 mt-8 text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 text-2xl font-semibold text-surface-800 dark:text-surface-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-6 text-xl font-semibold text-surface-700 dark:text-surface-200">
      {children}
    </h3>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-surface-200 dark:border-surface-700">
      <table className="min-w-full">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-surface-100 px-4 py-3 text-left text-sm font-semibold text-surface-700 dark:bg-surface-800 dark:text-surface-300">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">
      {children}
    </td>
  ),
}
