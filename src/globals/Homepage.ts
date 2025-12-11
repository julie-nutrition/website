import { Button } from '@/blocks/Button'
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
          type: 'blocks',
          name: 'buttons',
          blocks: [Button],
        },
      ],
    },
  ],
}
