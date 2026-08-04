import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import classnames from 'classnames'
import { IconName } from 'lucide-react/dynamic'
import Image from 'next/image'
import { getPayload } from 'payload'
import Footer from '../components/Footer'
import { Icon } from '../components/Icon'
import { HeroSection } from '../components/sections/HeroSection'
import { Formule } from './components/Formule'

export default async function Batchcooking() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const page = await payload.findGlobal({
    slug: 'batchcooking',
  })

  let heroImage

  if (
    page['hero-image'] &&
    typeof page['hero-image'] !== 'number' &&
    typeof page['hero-image'].url === 'string' &&
    typeof page['hero-image'].alt === 'string'
  ) {
    heroImage = {
      src: page['hero-image'].url,
      alt: page['hero-image'].alt,
    }
  }

  const stepIndicatorClass = (hasIcon: boolean) => {
    return classnames(
      'stepper-step-indicator border-text-dark bg-background-card grid h-48 w-48 place-items-center rounded-full border',
      {
        'bg-background-dark': hasIcon,
        'text-text-light': hasIcon,
      },
    )
  }
  return (
    <>
      <HeroSection
        image={heroImage}
        tags={[
          { label: 'Cuisine à domicile', icon: 'cooking-pot' },
          { label: 'Personnalisé', icon: 'user-star' },
        ]}
        title={page['hero-title']!}
        description={page['hero-description']!}
        actions={[
          {
            label: 'Voir les formules',
            href: '#formules',
          },
        ]}
      />
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
            <span className="font-light tracking-[0.1875rem] uppercase">Le principe</span>
            <h3>{page['principe-title']}</h3>
          </div>
          {page['principe-description'] && <RichText data={page['principe-description']} />}
        </div>
      </section>
      {page.issues && page.issues.length && (
        <section className="bg-jbn-jewel-900 text-jbn-ginfizz-50 full-width items-center py-100">
          <div className="m-auto flex max-w-728 flex-col items-center gap-80">
            <h3 className="text-h3">{page['issues-title']}</h3>
            <div className="flex flex-col gap-10">
              {page.issues.map((issue, index) => (
                <div
                  key={index}
                  className="bg-jbn-sprout-200 text-text-dark flex items-center gap-20 rounded-2xl p-40"
                >
                  <p>{issue['issue-emoticon']}</p>
                  <div className="flex flex-col gap-10">
                    <h4 className="text-h4">{issue['issue-title']}</h4>
                    <p className="paragraph">{issue['issue-description']}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-10">
              <h3>{page['solution-title']}</h3>
              <p>{page['solution-description']}</p>
            </div>
          </div>
        </section>
      )}

      {page['approach-steps'] && page['approach-steps'].length && (
        <section className="bg-background-card text-text-dark full-width py-100 text-center">
          <span className="font-light tracking-[0.1875rem] uppercase">La démarche</span>
          <h3>{page['approach-title']}</h3>
          <p className="mt-10">{page['approach-description']}</p>
          <div className="mt-80 flex justify-between">
            {page['approach-steps'].map((step, index) => (
              <div
                key={index}
                className="stepper-step flex flex-col items-center gap-10 rounded-2xl p-40"
              >
                <span className={stepIndicatorClass(!!step['step-icon'])}>
                  {step['step-icon'] ? (
                    <Icon iconName={step['step-icon'] as IconName} />
                  ) : (
                    index + 1
                  )}
                </span>
                <h4 className="text-h4">{step['step-title']}</h4>
                <p className="paragraph">{step['step-description']}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {page['formules'] && page.formules.length && (
        <section id="formules" className="full-width text-text-dark bg-white py-100 text-center">
          <span className="font-light tracking-[0.1875rem] uppercase">Les formules</span>
          <h3>{page['formules-title']}</h3>
          <p className="mt-10">{page['formules-description']}</p>
          <div className="mt-80 flex items-stretch justify-center gap-40">
            {page['formules'].map((formule, index) => (
              <Formule key={index} formule={formule} />
            ))}
          </div>
          <p className="mt-40">
            Les courses restent à votre charge. Déplacement inclus dans un rayon de 15km de Lyon, au
            delà sur devis.
          </p>
        </section>
      )}
      <section className="full-width text-text-dark bg-background-card py-100 text-center">
        <h3>Je suis agréée &quot;Service à la personne&quot;</h3>
        <p className="mt-10">
          Ce qui vous permet de bénéficier de l’avance immédiate de crédit d’impôts, soit -50% sur
          la prestation !
        </p>
        <Image
          className="mx-auto mt-40"
          src="/assets/SAP.png"
          alt="Service à la personne"
          width={200}
          height={80}
        />
      </section>
      {page.feedbacks && page.feedbacks.length && (
        <section className="full-width text-text-light bg-background-dark py-100 text-center">
          <span className="font-light tracking-[0.1875rem] uppercase">Témoignages</span>
          <h3>{page['feedbacks-title']}</h3>
          <div className="mt-80 flex items-stretch justify-center gap-40">
            {page.feedbacks.map((feedback, index) => (
              <div
                key={index}
                className="border-text-dark bg-background-card text-text-dark flex max-w-360 flex-col items-start gap-20 rounded-2xl border p-40 text-start"
              >
                <div>
                  <h4>{feedback['feedback-author']}</h4>
                  <span className="text-xs font-light tracking-[0.1875rem] uppercase">
                    {feedback['feedback-service-type']}
                  </span>
                </div>
                <p>&quot;{feedback['feedback-content']}&quot;</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <Footer />
    </>
  )
}
