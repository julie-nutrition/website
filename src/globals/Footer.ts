import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'slogan',
      type: 'text',
    },
    {
      name: 'navigation-label',
      type: 'text',
      label: 'Label de la colonne de navigation',
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Texte de copyright',
    },
    {
      name: 'columns',
      label: 'Colonnes de liens',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Titre de la colonne',
          type: 'text',
          required: true,
        },
        {
          labels: {
            singular: 'Lien',
            plural: 'Liens',
          },
          name: 'links',
          type: 'array',
          fields: [
            {
              label: 'Label du lien',
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              label: 'URL du lien',
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              label: 'Icône du lien',
              name: 'icon',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
