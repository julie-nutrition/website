import { Page } from '@/payload-types'
import CTASection from './CTASection'
import FeatureSection from './FeatureSection'
import HeroSection from './HeroSection'

type SectionRendererProps = {
  section: NonNullable<Page['sections']>[number]
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.blockType) {
    case 'hero-section':
      return <HeroSection {...section} />

    case 'feature-section':
      return <FeatureSection {...section} />

    case 'cta-section':
      return <CTASection {...section} />

    default:
      return null
  }
}
