import { Media } from '@/payload-types'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import tada from './assets/mascots/tada.svg'
import Button from './components/Button'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
  })

  const heroPicture = homepage?.hero?.picture as Media
  return (
    <>
      <section className="bg-jbn-light-yellow">
        <div className="py-80 px-32 flex items-center gap-32 container">
          <div className="flex flex-col gap-20">
            <h1 className="text-jbn-dark-green text-5xl font-jbn-margin">{homepage?.hero.title}</h1>
            <p className="text-jbn-dark-green text-xl">{homepage?.hero.subtitle}</p>
            {(homepage?.hero.buttons?.length ?? 0) > 0 && (
              <div className="flex flex-col items-start gap-16 md:flex-row">
                {homepage?.hero.buttons?.map((button) => (
                  <Button key={button.id} icon={button.icon} variant={button.variant}>
                    {button.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {heroPicture && heroPicture.url && (
            <div className="relative animate-fade-in-right  hidden lg:block">
              <Image
                src={heroPicture.url}
                alt={heroPicture.alt}
                width={600}
                height={400}
                className="rounded-xl shadow-xl"
              />
              <Image
                src={tada}
                width={100}
                height={100}
                alt="Tada mascot"
                className="absolute -right-20 -bottom-30"
              ></Image>
            </div>
          )}
        </div>
      </section>
      <hr className="w-full h-50 wave border-0 bg-jbn-light-yellow" />
    </>
  )
}
