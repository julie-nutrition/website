import type { PricingSection as PricingSectionType } from '@/payload-types'
import classNames from 'classnames'
import { ComponentProps } from 'react'
import { PlanCard } from '../PlanCard'

type Props = ComponentProps<'section'> & {
  section: PricingSectionType
}

export function PricingSection(props: Props) {
  const { className, section, ...htmlProps } = props

  const { 'meta-title': metaTitle, header, description, plans, footer } = section

  const classes = classNames('flex flex-col text-text-dark', className)
  return (
    <section className={classes} {...htmlProps}>
      <div className="flex flex-col items-center gap-80 py-100">
        <div className="text-center">
          <p className="sub-title-md">{metaTitle}</p>
          <h3 className="mb-10">{header}</h3>
          <p>{description}</p>
        </div>
        {!!plans?.length && (
          <div className="flex flex-col gap-40 lg:flex-row">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
        {footer && <p className="-mt-40">{footer}</p>}
      </div>
    </section>
  )
}
