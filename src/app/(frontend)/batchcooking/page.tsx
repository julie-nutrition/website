import { CookingPot, UserStar } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { JBNLink } from '../components/JBNLink'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function Batchcooking() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const page = await payload.findGlobal({
    slug: 'batchcooking',
  })
  return (
    <>
      <section className="bg-jbn-jewel-900 text-jbn-ginfizz-50 full-width">
        <div className="flex items-center justify-between gap-100 py-100">
          <div className="flex flex-col items-start gap-40">
            <span className="flex items-center gap-12 text-xs uppercase">
              <CookingPot size={12} />
              Cuisine à domicile
              <UserStar size={12} />
              Personalisée
            </span>
            <div className="flex flex-col items-start gap-20">
              <h1 className="font-jbn-margin text-6xl">{page['hero-title']}</h1>
              <p className="text-md">{page['hero-description']}</p>
            </div>

            <JBNLink href="#formules">Voir les formules</JBNLink>
          </div>
          {page['hero-image'] &&
            typeof page['hero-image'] !== 'number' &&
            typeof page['hero-image'].url === 'string' &&
            typeof page['hero-image'].alt === 'string' && (
              <img
                src={page['hero-image'].url}
                alt={page['hero-image'].alt}
                className="w-400 rounded-2xl"
              />
            )}
        </div>
      </section>
      <section className="flex items-center gap-80 py-100">
        <div className="grid grid-cols-2 gap-20">
          {page['principe-image-1'] &&
            typeof page['principe-image-1'] !== 'number' &&
            typeof page['principe-image-1'].url === 'string' &&
            typeof page['principe-image-1'].alt === 'string' && (
              <img
                src={page['principe-image-1'].url}
                alt={page['principe-image-1'].alt}
                className="row-span-2 row-start-1 h-300 w-265 rounded-2xl object-cover"
              />
            )}

          {page['principe-image-2'] &&
            typeof page['principe-image-2'] !== 'number' &&
            typeof page['principe-image-2'].url === 'string' &&
            typeof page['principe-image-2'].alt === 'string' && (
              <img
                src={page['principe-image-2'].url}
                alt={page['principe-image-2'].alt}
                className="row-span-2 row-start-2 h-300 w-265 rounded-2xl object-cover"
              />
            )}

          {page['principe-image-3'] &&
            typeof page['principe-image-3'] !== 'number' &&
            typeof page['principe-image-3'].url === 'string' &&
            typeof page['principe-image-3'].alt === 'string' && (
              <img
                src={page['principe-image-3'].url}
                alt={page['principe-image-3'].alt}
                className="row-span-2 row-start-3 h-300 w-265 rounded-2xl object-cover"
              />
            )}
        </div>
        <div className="text-jbn-jewel-900 flex flex-1 flex-col gap-20 p-100">
          <div className="flex flex-col">
            <span className="uppercase">Le principe</span>
            <h2 className="text-2xl font-bold">{page['principe-title']}</h2>
          </div>
          {page['principe-description'] && <RichText data={page['principe-description']} />}
        </div>
      </section>
      <section className="bg-jbn-jewel-900 text-jbn-ginfizz-50 full-width py-100">Hello</section>
      <section className="bg-jbn-dark-brown flex h-full gap-4 p-100">Hello</section>
      <section id="formules" className="bg-jbn-dark-brown flex h-full gap-4 p-100">
        Hello
      </section>
    </>
  )
}
