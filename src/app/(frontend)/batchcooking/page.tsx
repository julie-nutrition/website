import { Offer as OfferType } from '@/payload-types'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import Button from '../components/Button'
import FeatureCard from '../components/FeatureCard'
import OfferCard from '../components/OfferCard'

export default async function BatchcookingPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user: _user } = await payload.auth({ headers })

  const batchcooking = await payload.findGlobal({
    slug: 'batchcooking',
    depth: 2,
  })

  const offerData = batchcooking?.offerSection?.offer
  const offer = typeof offerData === 'object' ? (offerData as OfferType) : null

  return (
    <>
      {/* Hero Section */}
      <section className="bg-jbn-light-yellow">
        <div className="container flex flex-col items-center gap-24 px-32 py-96 text-center">
          <h1 className="text-jbn-dark-green font-jbn-margin text-5xl lg:text-6xl">
            {batchcooking?.hero?.title}
          </h1>
          <p className="text-jbn-dark-green max-w-3xl text-lg">
            {batchcooking?.hero?.subtitle}
          </p>
        </div>
      </section>

      <hr className="wave bg-jbn-light-yellow h-50 w-full border-0" />

      {/* Content Section */}
      <section className="container flex flex-col items-center gap-48 px-32 py-64">
        <div className="flex flex-col items-center gap-16 text-center">
          <h2 className="text-jbn-dark-green font-jbn-margin text-4xl lg:text-5xl">
            {batchcooking?.contentSection?.title}
          </h2>
          <p className="text-jbn-dark-green max-w-2xl text-lg">
            {batchcooking?.contentSection?.subtitle}
          </p>
        </div>

        {batchcooking?.contentSection?.features &&
          batchcooking.contentSection.features.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-24 md:grid-cols-2">
              {batchcooking.contentSection.features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  icon={feature.icon}
                >
                  {feature.description}
                </FeatureCard>
              ))}
            </div>
          )}
      </section>

      {/* Offer Section */}
      <section className="bg-jbn-light-yellow">
        <div className="container flex flex-col items-center gap-48 px-32 py-64">
          {batchcooking?.offerSection?.title && (
            <div className="flex flex-col items-center gap-16 text-center">
              <h2 className="text-jbn-dark-green font-jbn-margin text-4xl lg:text-5xl">
                {batchcooking.offerSection.title}
              </h2>
              {batchcooking.offerSection.description && (
                <p className="text-jbn-dark-green max-w-2xl text-lg">
                  {batchcooking.offerSection.description}
                </p>
              )}
            </div>
          )}

          {offer ? (
            <div className="flex w-full justify-center">
              <OfferCard
                title={offer.title}
                description={offer.description}
                features={offer.features}
                price={offer.price}
                duration={offer.duration}
                bookingLink={offer.bookingLink}
                className="w-full max-w-md"
              />
            </div>
          ) : (
            <p className="text-jbn-dark-green text-lg">
              Aucune offre configurée pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-jbn-dark-green">
        <div className="text-jbn-light-yellow container flex flex-col items-center gap-24 px-32 py-64 text-center">
          {batchcooking?.cta?.title && (
            <h2 className="font-jbn-margin text-4xl lg:text-5xl">
              {batchcooking.cta.title}
            </h2>
          )}
          {batchcooking?.cta?.subtitle && (
            <p className="max-w-2xl text-lg">
              {batchcooking.cta.subtitle}
            </p>
          )}
          {batchcooking?.cta?.button && batchcooking.cta.button.length > 0 ? (
            <>
              {batchcooking.cta.button
                .filter((button) => button.href)
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
          ) : null}
        </div>
      </section>
    </>
  )
}
