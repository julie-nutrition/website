import clx from 'classnames'
import { Stethoscope } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'

type FeatureCardProps = {
  icon?: string | null
  title: string
} & ComponentPropsWithoutRef<'div'>

export default function FeatureCard(props: FeatureCardProps) {
  const { title, icon, children, className, ...htmlProps } = props

  return (
    <div
      {...htmlProps}
      className={clx(
        'border-jbn-light-green flex flex-col items-center gap-8 rounded-xl border bg-white px-20 py-16',
        className,
      )}
    >
      {icon && (
        <div className="bg-jbn-light-green text-jbn-dark-green rounded-full p-16">
          <Stethoscope />
        </div>
      )}
      <h4 className="text-jbn-dark-green text-xl font-bold">{title}</h4>
      <p className="text-jbn-dark-green text-center">{children}</p>
    </div>
  )
}
