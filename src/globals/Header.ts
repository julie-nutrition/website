import { Button } from '@/blocks/Button'
import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
    },
    {
      type: 'blocks',
      name: 'actions',
      label: 'Actions',
      required: false,
      blocks: [Button],
    },
  ],
}
