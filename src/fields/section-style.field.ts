import { Field } from 'payload'

export const sectionStyleField: Field = {
  type: 'row',
  fields: [
    {
      type: 'radio',
      name: 'background',
      label: 'Couleur de fond',
      interfaceName: 'BackgroundColor',
      options: [
        {
          label: 'Blanc',
          value: 'white',
        },
        {
          label: 'Jaune clair',
          value: 'light-yellow',
        },
        {
          label: 'Vert foncé',
          value: 'dark-green',
        },
      ],
      defaultValue: 'light-yellow',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'pattern',
      label: 'Ajouter un motif de fond',
      defaultValue: false,
      required: true,
    },
    {
      type: 'checkbox',
      name: 'wave',
      label: 'Séparateur en forme de vague en bas de section',
      defaultValue: false,
      required: true,
    },
  ],
}
