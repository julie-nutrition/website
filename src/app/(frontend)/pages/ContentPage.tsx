import config from '@/payload.config'
import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import SectionRenderer from '../components/sections/SectionRenderer'

export default async function ContentPage({ slug }: { slug: Page['slug'] }) {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    pagination: false,
    overrideAccess: false,
  })
  const page = docs[0]

  if (!page) {
    notFound()
  }

  return (page.sections ?? []).map((section, index) => (
    <SectionRenderer key={section.id ?? index} section={section} />
  ))
}
