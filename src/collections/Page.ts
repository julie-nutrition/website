import { CTASection } from '@/blocks/sections/CTASection'
import { FeatureSection } from '@/blocks/sections/FeatureSection'
import { GroupedOffersSection } from '@/blocks/sections/GroupedOffersSection'
import { HeroSection } from '@/blocks/sections/HeroSection'
import { InformationSection } from '@/blocks/sections/InformationSection'
import { OffersSection } from '@/blocks/sections/OffersSection'
import type { CollectionConfig } from 'payload'

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Nom',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL',
      type: 'text',
      defaultValue: '',
      required: false,
      unique: true,
    },
    {
      name: 'description',
      label: 'Description',
      admin: {
        description: 'Description utilisée pour le SEO (balise meta description)',
      },
      type: 'textarea',
      required: false,
    },
    {
      name: 'sections',
      label: 'Sections',
      type: 'blocks',
      blocks: [
        HeroSection,
        FeatureSection,
        CTASection,
        InformationSection,
        OffersSection,
        GroupedOffersSection,
      ],
    },
  ],
}
