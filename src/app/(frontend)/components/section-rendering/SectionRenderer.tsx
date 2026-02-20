import { Page } from '@/payload-types'
import CTASection from './CTASection'
import FeatureSection from './FeatureSection'
import GroupedOffersSection from './GroupedOffersSection'
import HeroSection from './HeroSection'
import InformationSection from './InformationSection'

type SectionRendererProps = {
  section: NonNullable<Page['sections']>[number]
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.blockType) {
    case 'hero-section':
      return <HeroSection {...section} />

    case 'information-section':
      return <InformationSection {...section} />

    case 'feature-section':
      return <FeatureSection {...section} />

    case 'cta-section':
      return <CTASection {...section} />

    case 'grouped-offers-section':
      return <GroupedOffersSection {...section} />

    default:
      return null
  }
}
