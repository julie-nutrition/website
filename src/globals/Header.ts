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
      type: 'array',
      name: 'navigation',
      label: 'Navigation (pages affichées dans le header)',
      required: false,
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Page',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Libellé (optionnel, écrase le nom de la page)',
          required: false,
        },
      ],
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
