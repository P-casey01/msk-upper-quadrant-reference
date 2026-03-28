import Link from 'next/link'
import { Activity, ExternalLink } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-brand-600 dark:text-brand-400">
              <Activity className="h-5 w-5" aria-hidden />
              MSK Upper Quadrant Reference
            </Link>
            <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
              A clinical reference resource for physiotherapists and allied health professionals
              working in HSC Northern Ireland. Evidence-based, regularly reviewed.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-surface-400">Regions</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/cervical',    label: 'Cervical Spine' },
                { href: '/thoracic',   label: 'Thoracic Spine' },
                { href: '/shoulder',   label: 'Shoulder' },
                { href: '/elbow',      label: 'Elbow' },
                { href: '/wrist-hand', label: 'Wrist & Hand' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-surface-400">Resources</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: 'https://www.nice.org.uk/', label: 'NICE Guidelines' },
                { href: 'https://www.hscni.net/', label: 'HSC Northern Ireland' },
                { href: 'https://www.csp.org.uk/', label: 'Chartered Society of Physiotherapy' },
                { href: 'https://www.pedro.org.au/', label: 'PEDro Database' },
                { href: 'https://pubmed.ncbi.nlm.nih.gov/', label: 'PubMed' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400"
                  >
                    {label}
                    <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-surface-200 pt-6 dark:border-surface-700">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-surface-400">
              © {year} MSK Upper Quadrant Reference. For qualified health professionals only.
            </p>
            <p className="text-xs text-surface-400">
              Always apply clinical judgement. Not a substitute for professional training or examination.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
