import config from '@/payload.config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { HomepageNavigation } from './components/HomepageNavigation'

export const revalidate = 60 // ISR - revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const page = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: '',
        },
      },
      depth: 0,
    })

    if (!page.docs.length) return {}

    const pageData = page.docs[0]

    return {
      title: `Julie BAUZA - Nutritionniste | ${pageData.name}`,
      description: pageData.description || `Page ${pageData.name}`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {}
  }
}

export default async function Page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  return (
    <section className="bg-jbn-dark-green full-width flex! h-full gap-4">
      {homepage['batchcooking-image'] &&
        typeof homepage['batchcooking-image'] !== 'number' &&
        homepage['batchcooking-title'] &&
        homepage['batchcooking-description'] && (
          <HomepageNavigation
            className="min-w-0 flex-1 transition-[flex-grow] duration-300 ease-out hover:flex-[1.1]"
            img={homepage['batchcooking-image']}
            title={homepage['batchcooking-title']}
            description={homepage['batchcooking-description']}
            href="/batchcooking"
          />
        )}

      {homepage['nutrition-image'] &&
        typeof homepage['nutrition-image'] !== 'number' &&
        homepage['nutrition-title'] &&
        homepage['nutrition-description'] && (
          <HomepageNavigation
            className="min-w-0 flex-1 transition-[flex-grow] duration-300 ease-out hover:flex-[1.1]"
            img={homepage['nutrition-image']}
            title={homepage['nutrition-title']}
            description={homepage['nutrition-description']}
            href="/nutrition"
          />
        )}
    </section>
  )
}
