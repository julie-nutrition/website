import { Page } from '@/payload-types'
import HeroSection from './HeroSection'

type SectionRendererProps = {
  section: NonNullable<Page['sections']>[number]
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.blockType) {
    case 'hero-section':
      return <HeroSection {...section} />

    default:
      return null
  }
}
