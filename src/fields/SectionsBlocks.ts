import { HeroSection } from '@/blocks/HeroSection'
import { Field } from 'payload'

export const SectionsBlocks: Field = {
  name: 'sections',
  type: 'blocks',
  label: 'Sections',
  blocks: [HeroSection],
}
