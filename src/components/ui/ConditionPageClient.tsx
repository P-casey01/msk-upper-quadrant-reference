'use client'

import { ReadingProgress } from './ReadingProgress'
import { BackToTop } from './BackToTop'
import { StickyTOC } from './StickyTOC'

interface Section {
  heading: string
  slug: string
}

export function ConditionPageClient({ sections }: { sections: Section[] }) {
  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <StickyTOC sections={sections} />
    </>
  )
}
