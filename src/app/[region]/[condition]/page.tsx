import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { getAllConditionPaths, getRegion, getCondition } from '@/data/taxonomy'
import { getConditionContent } from '@/lib/mdx'
import { Sidebar } from '@/components/layout/Sidebar'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { Clock, Tag } from 'lucide-react'

interface Props {
  params: { region: string; condition: string }
}

export function generateStaticParams() {
  return getAllConditionPaths()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const condition = getCondition(params.region, params.condition)
  const region = getRegion(params.region)
  if (!condition || !region) return {}

  return {
    title: `${condition.label} — ${region.label}`,
    description: `Clinical reference for ${condition.label}. Special tests, red flags, management, and evidence-based diagnosis.`,
  }
}

export default async function ConditionPage({ params }: Props) {
  const { region: regionSlug, condition: conditionSlug } = params

  const region = getRegion(regionSlug)
  const condition = getCondition(regionSlug, conditionSlug)

  if (!region || !condition) notFound()

  const result = await getConditionContent(regionSlug, conditionSlug)

  return (
    <div className="flex">
      <Sidebar currentRegion={regionSlug} currentCondition={conditionSlug} />

      <div className="flex-1 min-w-0 px-4 py-8 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <Breadcrumb crumbs={[
          { label: region.label, href: `/${regionSlug}` },
          { label: condition.label },
        ]} />

        {/* Page header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {condition.icd10 && (
              <span className="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs text-surface-500 dark:bg-surface-800 dark:text-surface-400">
                ICD-10: {condition.icd10}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-50">
            {condition.label}
          </h1>
        </div>

        {/* Section anchor nav */}
        {result && result.sections.length > 0 && (
          <nav aria-label="Page sections" className="mb-8 flex flex-wrap gap-2">
            {result.sections.map(section => (
              <a
                key={section.slug}
                href={`#${section.slug}`}
                className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300 dark:hover:bg-brand-900 transition-colors"
              >
                {section.heading}
              </a>
            ))}
          </nav>
        )}

        {/* MDX content or placeholder */}
        {result ? (
          <article className="prose-clinical">
            <MDXRemote
              source={result.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />

            {/* Footer metadata */}
            {(result.frontmatter.lastReviewed || result.frontmatter.reviewedBy) && (
              <footer className="mt-10 border-t border-surface-200 pt-6 text-xs text-surface-400 dark:border-surface-700 dark:text-surface-500">
                <div className="flex flex-wrap gap-4">
                  {result.frontmatter.lastReviewed && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      Last reviewed: {result.frontmatter.lastReviewed}
                    </span>
                  )}
                  {result.frontmatter.reviewedBy && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" aria-hidden />
                      Reviewed by: {result.frontmatter.reviewedBy}
                    </span>
                  )}
                </div>
              </footer>
            )}
          </article>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-surface-200 p-10 text-center dark:border-surface-700">
            <p className="font-medium text-surface-500 dark:text-surface-400">Content coming soon</p>
            <p className="mt-1 text-sm text-surface-400 dark:text-surface-500">
              Create{' '}
              <code className="rounded bg-surface-100 px-1.5 py-0.5 dark:bg-surface-800">
                content/{regionSlug}/{conditionSlug}.mdx
              </code>{' '}
              to populate this page.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
