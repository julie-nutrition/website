import type {
  HeroSection as HeroSectionType,
  InfoSection as InfoSectionType,
  IssuesSection as IssuesSectionType,
  OverviewSection as OverviewSectionType,
  PricingSection as PricingSectionType,
  StepperSection as StepperSectionType,
  TestimonialSection as TestimonialSectionType,
} from '@/payload-types'
import { HeroSection } from './HeroSection'
import { InfoSection } from './InfoSection'
import { IssuesSection } from './IssuesSection'
import { OverviewSection } from './OverviewSection'
import { PricingSection } from './PricingSection'
import { StepperSection } from './StepperSection'
import { TestimonialSection } from './TestimonialSection'

type SectionRendererProps = {
  section:
    | HeroSectionType
    | OverviewSectionType
    | IssuesSectionType
    | StepperSectionType
    | PricingSectionType
    | InfoSectionType
    | TestimonialSectionType
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.blockType) {
    case 'hero-section':
      return <HeroSection section={section} />

    case 'overview-section':
      return <OverviewSection section={section} />

    case 'issues-section':
      return <IssuesSection section={section} />

    case 'stepper-section':
      return <StepperSection section={section} />

    case 'pricing-section':
      return <PricingSection section={section} />

    case 'info-section':
      return <InfoSection section={section} />

    case 'testimonial-section':
      return <TestimonialSection section={section} />

    default:
      return null
  }
}
