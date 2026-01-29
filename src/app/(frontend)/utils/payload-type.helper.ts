import { Media } from '@/payload-types'

export function isMedia(media: unknown): media is Media {
  return (
    typeof media === 'object' && media !== null && 'url' in media && typeof media.url === 'string'
  )
}
