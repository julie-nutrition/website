import { Block } from 'payload'

export const PricingSection: Block = {
  slug: 'pricing-section',
  labels: {
    singular: 'Section des tarifs',
    plural: 'Sections des tarifs',
  },
  fields: [
    {
      name: 'section-id',
      type: 'text',
      label: 'ID de la section',
    },
    {
      name: 'meta-title',
      type: 'text',
      label: 'Titre global de la section',
    },
    {
      name: 'header',
      type: 'text',
      label: 'Titre de la section',
    },
    {
      name: 'description',
      label: 'Description de la section',
      type: 'textarea',
    },
    {
      name: 'plans',
      label: 'Liste des formules',
      type: 'array',
      fields: [
        {
          name: 'recommended',
          type: 'checkbox',
          label: 'Formule recommandée',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titre de la formule',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description de la formule',
        },
        {
          name: 'footer',
          type: 'text',
          label: 'Texte du pied de page de la formule',
        },
        {
          name: 'key-points',
          type: 'array',
          label: 'Points clés de la formule',
          fields: [
            {
              name: 'key-point',
              type: 'text',
              label: 'Point clé',
            },
          ],
        },
        {
          name: 'price',
          type: 'number',
          label: 'Prix de la formule',
        },
        {
          name: 'final-price',
          type: 'number',
          label: "Prix final de la formule (après crédit d'impôt)",
        },
        {
          name: 'final-price-unit',
          type: 'text',
          label: 'Unité du prix final de la formule (ex: /mois)',
        },
        {
          name: 'cta',
          type: 'text',
          label: 'Texte du CTA de la formule',
        },
        {
          name: 'link',
          type: 'text',
          label: "Lien vers la page d'achat de la formule",
        },
      ],
    },
    {
      name: 'footer',
      type: 'text',
      label: 'Texte du pied de page de la section',
    },
  ],
}
