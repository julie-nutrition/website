import type { TestimonialSection as TestimonialSectionType } from '@/payload-types'
import classNames from 'classnames'
import { ComponentProps } from 'react'

type Props = ComponentProps<'section'> & {
  section: TestimonialSectionType
}

export function TestimonialSection(props: Props) {
  const { className, section, ...htmlProps } = props

  const { 'meta-title': metaTitle, header, testimonials } = section

  const classes = classNames(
    'full-width text-text-light bg-background-dark py-100 text-center',
    className,
  )

  return (
    <section className={classes} {...htmlProps}>
      {metaTitle && <p className="sub-title-md">{metaTitle}</p>}
      {header && <h3>{header}</h3>}
      {!!testimonials?.length && (
        <div className="mt-80 flex flex-wrap justify-center gap-40">
          {testimonials.map((testimonial, index) => {
            const { name, service, content } = testimonial

            return (
              <div
                key={index}
                className="border-text-dark bg-background-card text-text-dark max-w-360 rounded-2xl border p-40 text-start"
              >
                <h4>{name}</h4>
                {service && <p className="sub-title-sm">{service}</p>}
                <p className="mt-20">{`"${content}"`}</p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
