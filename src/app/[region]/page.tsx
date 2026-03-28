import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { REGIONS, getRegion } from '@/data/taxonomy'
import { Sidebar } from '@/components/layout/Sidebar'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

interface Props {
  params: { region: string }
}

export function generateStaticParams() {
  return REGIONS.map(r => ({ region: r.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const region = getRegion(params.region)
  if (!region) return {}

  return {
    title: region.label,
    description: `Clinical reference for ${region.label} conditions — special tests, red flags, frameworks, and management.`,
  }
}

export default function RegionPage({ params }: Props) {
  const region = getRegion(params.region)
  if (!region) notFound()

  return (
    <div className="flex">
      <Sidebar currentRegion={region.slug} />

      <div className="flex-1 overflow-x-hidden px-4 py-8 sm:px-8 lg:px-12">
        <Breadcrumb crumbs={[{ label: region.label }]} />

        <h1 className="mb-2 text-3xl font-bold text-surface-900 dark:text-surface-50">
          {region.label}
        </h1>
        <p className="mb-8 text-surface-500 dark:text-surface-400">{region.description}</p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {region.conditions.map(condition => (
            <Link
              key={condition.slug}
              href={`/${region.slug}/${condition.slug}`}
              className="group rounded-xl border border-surface-200 bg-white p-5 shadow-sm transition-all hover:border-brand-300 hover:shadow-md dark:border-surface-700 dark:bg-surface-900 dark:hover:border-brand-600"
            >
              <div className="mb-3 flex items-start justify-between">
                <h2 className="font-semibold text-surface-900 group-hover:text-brand-700 dark:text-surface-100 dark:group-hover:text-brand-400">
                  {condition.label}
                </h2>
                {condition.icd10 && (
                  <span className="ml-2 shrink-0 rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-surface-500 dark:bg-surface-800 dark:text-surface-400">
                    {condition.icd10}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:underline dark:text-brand-400">
                View clinical reference
                <ChevronRight className="h-4 w-4" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
