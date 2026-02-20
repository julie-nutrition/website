import clx from 'classnames'
import { Check } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import Button from '../../Button'

type OfferCardProps = {
  title: string
  description: string
  features?: Array<{ feature: string; id?: string | null }> | null
  price: number
  quantity?: string | null
  bookingLink?: string | null
  disclaimer?: string | null
} & ComponentPropsWithoutRef<'div'>

export default function OfferCard(props: OfferCardProps) {
  const {
    title,
    description,
    features,
    price,
    quantity,
    bookingLink,
    disclaimer,
    className,
    ...htmlProps
  } = props

  return (
    <div
      {...htmlProps}
      className={clx(
        'border-jbn-light-green flex h-full flex-col rounded-xl border bg-white px-32 py-32 text-left transition delay-100 ease-out hover:scale-102 hover:shadow-lg',
        className,
      )}
    >
      <div className="flex grow flex-col gap-24">
        {/* Header */}
        <div className="flex flex-col gap-12">
          <h3 className="text-jbn-dark-green font-jbn-margin text-2xl font-bold">{title}</h3>
          <div className="flex items-baseline gap-8">
            <span className="text-jbn-dark-green text-4xl font-bold">{price}€</span>
            {quantity && <span className="text-base text-gray-600">/ {quantity}</span>}
          </div>
        </div>

        {/* Description */}
        <p className="text-jbn-dark-green text-base leading-relaxed">{description}</p>

        {/* Features List */}
        {features && features.length > 0 && (
          <ul className="flex flex-col gap-12">
            {features.map((item) => (
              <li key={item.id} className="flex items-start gap-12">
                <Check className="text-jbn-dark-green mt-2 h-20 w-20 shrink-0" strokeWidth={3} />
                <span className="text-jbn-dark-green text-base">{item.feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {disclaimer && <p className="mt-12 text-xs text-gray-500">{disclaimer}</p>}

      <Button
        variant="primary"
        href={bookingLink || '/contact'}
        className="mt-24 w-full justify-center"
      >
        Réserver
      </Button>
    </div>
  )
}
