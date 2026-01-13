import { Media } from '@/payload-types'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import leaves from './assets/graphical/leaves_dark.svg'
import tada from './assets/mascots/tada.svg'
import Button from './components/Button'
import FeatureCard from './components/FeatureCard'
import ServiceCard from './components/ServiceCard'
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
        <div className="container flex items-center gap-48 px-32 py-96">
          <div className="flex flex-col gap-24">
            <h1 className="text-jbn-dark-green font-jbn-margin text-5xl lg:text-6xl">{homepage?.hero.title}</h1>
            <p className="text-jbn-dark-green text-lg">{homepage?.hero.subtitle}</p>
            {(homepage?.hero.buttons?.length ?? 0) > 0 && (
              <div className="flex flex-col items-start gap-16 md:flex-row">
                {homepage?.hero.buttons
                  ?.filter((button) => button.href)
                  .map((button) => (
                    <Button key={button.id} icon={button.icon} variant={button.variant} href={button.href!}>
                      {button.label}
                    </Button>
                  ))}
              </div>
            )}
          </div>
          {heroPicture && heroPicture.url && (
            <div className="animate-fade-in-right relative hidden lg:block">
              <Image
                src={heroPicture.url}
                alt={heroPicture.alt}
                width={600}
                height={400}
                className="-z-10 rounded-xl shadow-xl"
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
      <hr className="wave bg-jbn-light-yellow h-50 w-full border-0" />
      <section className="container flex flex-col items-center gap-24 px-32 py-64">
        <h2 className="text-jbn-dark-green font-jbn-margin text-4xl lg:text-5xl">
          {homepage?.services?.title}
        </h2>
        <p className="text-jbn-dark-green text-lg">{homepage?.services?.subtitle}</p>
        <div className="flex flex-col gap-32 md:flex-row">
          {homepage?.services?.services?.map((service) => (
            <ServiceCard key={service.id} title={service.title} icon={service.icon} href="/consultation">
              {service.description}
            </ServiceCard>
          ))}
        </div>
      </section>
      <section className="bg-jbn-light-yellow relative overflow-hidden">
        <Image
          src={leaves}
          alt="Leaves pattern"
          width={500}
          height={500}
          className="absolute -right-200 -bottom-100 opacity-20"
        />
        <Image
          src={leaves}
          alt="Leaves pattern"
          width={200}
          height={200}
          className="absolute -top-50 -left-80 opacity-20"
        />
        <div className="relative z-10 container flex flex-col items-center gap-24 px-32 py-64">
          <h2 className="text-jbn-dark-green font-jbn-margin text-4xl lg:text-5xl">
            {homepage?.approche?.title}
          </h2>
          <p className="text-jbn-dark-green text-lg">{homepage?.approche?.subtitle}</p>
          <div className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-4">
            {homepage?.approche?.features?.map((feature) => (
              <FeatureCard key={feature.id} title={feature.title} icon={feature.icon}>
                {feature.description}
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-jbn-dark-green">
        <div className="text-jbn-light-yellow container flex flex-col items-center gap-24 px-32 py-64 text-center md:items-start md:text-left">
          <h2 className="font-jbn-margin text-4xl lg:text-5xl">{homepage?.contact?.title}</h2>
          <p className="text-lg">{homepage?.contact?.subtitle}</p>
          {(homepage?.contact?.button?.length ?? 0) > 0 && (
            <>
              {homepage?.contact?.button
                ?.filter((button) => button.href)
                .map((button) => (
                  <Button key={button.id} icon={button.icon} variant={button.variant} href={button.href!}>
                    {button.label}
                  </Button>
                ))}
            </>
          )}
        </div>
      </section>
    </>
  )
}
