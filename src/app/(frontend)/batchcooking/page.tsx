import config from '@/payload.config'
import { getPayload } from 'payload'
import SectionRenderer from '../components/sections/SectionRenderer'

export default async function Batchcooking() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const page = await payload.findGlobal({
    slug: 'batchcooking',
  })

  return page.sections?.map((section, index) => <SectionRenderer key={index} section={section} />)
}
