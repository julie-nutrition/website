import { HeroSection } from '@/blocks/HeroSection'
import { OverviewSection } from '@/blocks/OverviewSection'
import { Field } from 'payload'

export const SectionsBlocks: Field = {
  name: 'sections',
  type: 'blocks',
  label: 'Sections',
  blocks: [HeroSection, OverviewSection],
}
