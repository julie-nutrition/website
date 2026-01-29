import { BackgroundColor } from '@/payload-types'

export type JBNTextColor = 'text-jbn-light-yellow' | 'text-jbn-dark-green'

export function textColorForBackground(backgroundColor: BackgroundColor): JBNTextColor {
  const lightBackgrounds = ['light-yellow', 'white']
  return lightBackgrounds.includes(backgroundColor)
    ? 'text-jbn-dark-green'
    : 'text-jbn-light-yellow'
}
