import Link from 'next/link'
import { Brain, Columns, CircleDot, GitBranch, Hand, ChevronRight, Search } from 'lucide-react'
import { REGIONS } from '@/data/taxonomy'

const iconMap: Record<string, React.ElementType> = {
  Brain, Columns, CircleDot, GitBranch, Hand,
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Hero */}
      <section className="mb-14 text-center">
        <div className="mb-4 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
          HSC Northern Ireland · Physiotherapy &amp; Allied Health
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-surface-900 dark:text-surface-50 sm:text-5xl">
          MSK Upper Quadrant
          <span className="block text-brand-600 dark:text-brand-400">Clinical Reference</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-surface-600 dark:text-surface-400">
          Evidence-based clinical decision support for physiotherapists and allied health professionals.
          Special tests with diagnostic accuracy data, red flags, clinical frameworks, and management aligned to NICE &amp; HSC NI pathways.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search conditions
          </Link>
          <Link
            href="/cervical"
            className="inline-flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-5 py-2.5 text-sm font-semibold text-surface-700 shadow-sm transition-colors hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-300"
          >
            Browse by region
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Region cards */}
      <section aria-labelledby="regions-heading">
        <h2 id="regions-heading" className="mb-6 text-xl font-semibold text-surface-800 dark:text-surface-200">
          Browse by region
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map(region => {
            const Icon = iconMap[region.icon] ?? Brain

            return (
              <Link
                key={region.slug}
                href={`/${region.slug}`}
                className="group rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md dark:border-surface-700 dark:bg-surface-900 dark:hover:border-brand-600"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-brand-50 p-2 text-brand-600 transition-colors group-hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-surface-900 group-hover:text-brand-700 dark:text-surface-100 dark:group-hover:text-brand-400">
                    {region.label}
                  </h3>
                </div>
                <p className="mb-4 text-sm text-surface-500 dark:text-surface-400">
                  {region.description}
                </p>
                <p className="text-xs text-surface-400">
                  {region.conditions.length} condition{region.conditions.length !== 1 ? 's' : ''}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 rounded-xl border border-accent-200 bg-accent-50 p-5 dark:border-accent-900 dark:bg-surface-900">
        <p className="text-sm font-semibold text-accent-800 dark:text-accent-400">Clinical Disclaimer</p>
        <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">
          This resource is intended for qualified physiotherapists and allied health professionals registered with their relevant regulatory body.
          Clinical information should be applied in conjunction with professional judgement, patient-specific factors, and applicable local HSC Northern Ireland policies.
          This reference does not substitute for appropriate clinical training, examination, or professional supervision.
        </p>
      </section>
    </div>
  )
}
