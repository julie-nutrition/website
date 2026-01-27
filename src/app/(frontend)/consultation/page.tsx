import config from '@/payload.config'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import Button from '../components/Button'
import OffersFilter from '../components/OffersFilter'

export const metadata = {
  title: 'Julie BAUZA - Nutritionniste | Consultation',
}

export default async function ConsultationPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const consultation = await payload.findGlobal({
    slug: 'consultation',
    depth: 2,
  })

  return (
    <Suspense>
      {/* Hero Section */}
      <section className="bg-jbn-light-yellow">
        <div className="container flex flex-col items-center gap-24 px-32 py-96 text-center">
          <h1 className="text-jbn-dark-green font-jbn-margin text-5xl lg:text-6xl">
            {consultation?.hero?.title}
          </h1>
          <p className="text-jbn-dark-green max-w-3xl text-lg">{consultation?.hero?.subtitle}</p>
        </div>
      </section>

      <hr className="wave bg-jbn-light-yellow h-50 w-full border-0" />

      {/* Offers Section */}
      <section className="container flex flex-col items-center gap-48 px-32 py-64">
        <div className="flex flex-col items-center gap-16 text-center">
          <h2 className="text-jbn-dark-green font-jbn-margin text-4xl lg:text-5xl">
            {consultation?.offersSection?.title}
          </h2>
          <p className="text-jbn-dark-green max-w-2xl text-lg">
            {consultation?.offersSection?.subtitle}
          </p>
        </div>

        <OffersFilter categories={consultation?.offersSection?.categories} />
      </section>

      {/* CTA Section */}
      <section className="bg-jbn-dark-green">
        <div className="text-jbn-light-yellow container flex flex-col items-center gap-24 px-32 py-64 text-center">
          <h2 className="font-jbn-margin text-4xl lg:text-5xl">{consultation?.cta?.title}</h2>
          <p className="max-w-2xl text-lg">{consultation?.cta?.subtitle}</p>
          {(consultation?.cta?.button?.length ?? 0) > 0 && (
            <>
              {consultation?.cta?.button
                ?.filter((button) => button.href)
                .map((button) => (
                  <Button
                    key={button.id}
                    icon={button.icon}
                    variant={button.variant}
                    href={button.href!}
                  >
                    {button.label}
                  </Button>
                ))}
            </>
          )}
        </div>
      </section>
    </Suspense>
  )
}
