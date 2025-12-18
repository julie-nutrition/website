import { Button } from '@/blocks/Button'
import { FeatureCard } from '@/blocks/FeatureCard'
import { ServiceCard } from '@/blocks/ServiceCard'
import { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'picture',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          type: 'blocks',
          name: 'buttons',
          blocks: [Button],
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          type: 'blocks',
          name: 'services',
          blocks: [ServiceCard],
        },
      ],
    },
    {
      name: 'approche',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },

        {
          type: 'blocks',
          name: 'features',
          blocks: [FeatureCard],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },

        {
          type: 'blocks',
          name: 'button',
          maxRows: 1,
          blocks: [Button],
        },
      ],
    },
  ],
}
