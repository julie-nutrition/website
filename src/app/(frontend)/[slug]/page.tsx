import config from '@/payload.config'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import PageBuilder from '../components/PageBuilder'

export const revalidate = 60 // ISR - revalidate every 60 seconds
export const dynamicParams = false // Only allow params from generateStaticParams

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const pages = await payload.find({
      collection: 'pages',
      limit: 0,
      depth: 0,
    })

    return pages.docs.map((page) => ({
      slug: page.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const page = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
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

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <PageBuilder slug={slug} />
}
