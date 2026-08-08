import config from '@/payload.config'
import classnames from 'classnames'
import { IconName } from 'lucide-react/dynamic'
import Image from 'next/image'
import { getPayload } from 'payload'
import Footer from '../components/Footer'
import { Icon } from '../components/Icon'
import SectionRenderer from '../components/sections/SectionRenderer'
import { Formule } from './components/Formule'

export default async function Batchcooking() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const page = await payload.findGlobal({
    slug: 'batchcooking',
  })

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
      {page.sections?.map((section, index) => (
        <SectionRenderer key={index} section={section} />
      ))}
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
