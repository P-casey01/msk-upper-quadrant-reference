import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbProps {
  crumbs: Crumb[]
}

export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-surface-500 dark:text-surface-400">
        <li>
          <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-brand-600 dark:hover:text-brand-400">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-surface-800 dark:text-surface-200" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
