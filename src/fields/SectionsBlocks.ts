import { HeroSection } from '@/blocks/HeroSection'
import { IssuesSection } from '@/blocks/IssuesSection'
import { OverviewSection } from '@/blocks/OverviewSection'
import { StepperSection } from '@/blocks/StepperSection'
import { Field } from 'payload'

export const SectionsBlocks: Field = {
  name: 'sections',
  type: 'blocks',
  label: 'Sections',
  blocks: [HeroSection, OverviewSection, IssuesSection, StepperSection],
}
