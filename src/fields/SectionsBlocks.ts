import { HeroSection } from '@/blocks/HeroSection'
import { InfoSection } from '@/blocks/InfoSection'
import { IssuesSection } from '@/blocks/IssuesSection'
import { OverviewSection } from '@/blocks/OverviewSection'
import { PricingSection } from '@/blocks/PricingSection'
import { StepperSection } from '@/blocks/StepperSection'
import { TestimonialSection } from '@/blocks/TestimonialSection'
import { Field } from 'payload'

export const SectionsBlocks: Field = {
  name: 'sections',
  type: 'blocks',
  label: 'Sections',
  blocks: [
    HeroSection,
    OverviewSection,
    IssuesSection,
    StepperSection,
    PricingSection,
    InfoSection,
    TestimonialSection,
  ],
}
