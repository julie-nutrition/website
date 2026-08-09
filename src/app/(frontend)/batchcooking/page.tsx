import config from '@/payload.config'
import classnames from 'classnames'
import Image from 'next/image'
import { getPayload } from 'payload'
import Footer from '../components/Footer'
import SectionRenderer from '../components/sections/SectionRenderer'

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
