import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import SectionRenderer from './section-rendering/SectionRenderer'

export default async function PageBuilder({ slug }: { slug: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  if (!page.docs.length) {
    notFound()
  }

  const pageData = page.docs[0]

  return (
    <>
      {pageData.sections?.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  )
}
