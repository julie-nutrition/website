import type { PricingSection as PricingSectionType } from '@/payload-types'
import classNames from 'classnames'
import { ComponentProps } from 'react'
import { Icon } from './Icon'
import { JBNLink } from './JBNLink'

type Props = ComponentProps<'div'> & {
  plan: NonNullable<PricingSectionType['plans']>[number]
}

export function PlanCard(props: Props) {
  const { className, plan, ...htmlProps } = props

  const {
    recommended,
    title,
    price,
    'final-price': finalPrice,
    'final-price-unit': finalPriceUnit,
    'key-points': keyPoints,
    cta,
    description,
    footer,
    link,
  } = plan

  const classes = classNames(
    'flex flex-col relative items-center gap-40 rounded-2xl p-40 border border-text-dark text-center',
    {
      'bg-background-card': recommended,
    },
    className,
  )
  return (
    <div className={classes} {...htmlProps}>
      {recommended && (
        <small className="bg-background-dark border-background-card text-text-light absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-lg border px-8 py-5">
          Recommandé
        </small>
      )}
      <div className="flex max-w-280 flex-1 flex-col items-center gap-40 text-start">
        <div className="flex flex-col items-center gap-10">
          <h3>{title}</h3>
          <div className="flex flex-col items-start">
            {!!price && (
              <p>
                <span className="line-through">{price}€</span> *
              </p>
            )}
            <p>
              <span className="text-h2">{finalPrice}€</span> /session
            </p>
          </div>
        </div>
        {description && <p>{description}</p>}
        <ul className="flex w-full flex-col items-start gap-10">
          {keyPoints?.map((keyPoint, index) => (
            <li key={index} className="flex items-start gap-10">
              <Icon iconName="circle-check-big" className="mt-5 h-14 w-14" />
              <p>{keyPoint['key-point']}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full flex-col gap-10 text-start">
        {footer && <small className="mb-10">{footer}</small>}
        {link && (
          <JBNLink variant="dark" href={link} target="_blank" rel="noopener noreferrer">
            {cta}
          </JBNLink>
        )}
      </div>
    </div>
  )
}
