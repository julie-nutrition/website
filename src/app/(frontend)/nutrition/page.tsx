import config from '@/payload.config'
import { getPayload } from 'payload'
import { HeroSection } from '../components/sections/HeroSection'

export default async function Nutrition() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const page = await payload.findGlobal({
    slug: 'batchcooking',
  })

  let heroImage

  if (
    page['hero-image'] &&
    typeof page['hero-image'] !== 'number' &&
    typeof page['hero-image'].url === 'string' &&
    typeof page['hero-image'].alt === 'string'
  ) {
    heroImage = {
      src: page['hero-image'].url,
      alt: page['hero-image'].alt,
    }
  }

  return (
    <>
      <HeroSection
        image={heroImage}
        tags={[
          { label: 'Cuisine à domicile', icon: 'cooking-pot' },
          { label: 'Personnalisé', icon: 'user-star' },
        ]}
        title={page['hero-title']!}
        description={page['hero-description']!}
        actions={[
          {
            label: 'Reserver un bilan',
            href: '#bilan',
          },
          {
            label: 'Reserver un suivi',
            href: '#suivi',
          },
        ]}
      />
    </>
  )
}
