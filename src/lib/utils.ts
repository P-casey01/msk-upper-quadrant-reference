import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function evidenceGradeLabel(grade: string): string {
  const labels: Record<string, string> = {
    A: 'Grade A — Strong evidence (RCTs, systematic reviews)',
    B: 'Grade B — Moderate evidence',
    C: 'Grade C — Limited evidence',
    D: 'Grade D — Expert opinion / case series',
    GPP: 'Good Practice Point',
  }
  return labels[grade] ?? grade
}
