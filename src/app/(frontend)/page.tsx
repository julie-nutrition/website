import config from '@/payload.config'
import { getPayload } from 'payload'
import PageBuilder from './components/PageBuilder'

export const revalidate = 60 // ISR - revalidate every 60 seconds

export async function generateMetadata() {
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
  return <PageBuilder slug="" />
}
