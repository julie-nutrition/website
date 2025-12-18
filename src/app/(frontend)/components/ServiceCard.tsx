import clx from 'classnames'
import { Stethoscope } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'

type ServiceCardProps = {
  title: string
  icon?: string | null
} & ComponentPropsWithoutRef<'a'>

export default function ServiceCard(props: ServiceCardProps) {
  const { title, icon, children, className, ...htmlProps } = props

  return (
    <a
      {...htmlProps}
      className={clx(
        'border-jbn-light-green flex flex-col items-start gap-8 rounded-xl border px-20 py-16 transition delay-100 ease-out hover:scale-102 hover:bg-neutral-50',
        className,
      )}
    >
      {icon && (
        <div className="bg-jbn-light-green text-jbn-dark-green rounded-2xl p-16">
          <Stethoscope />
        </div>
      )}
      <h4 className="text-jbn-dark-green text-xl font-bold">{title}</h4>
      <p className="text-jbn-dark-green">{children}</p>
      <small className="text-gray-400 underline underline-offset-3">En savoir plus</small>
    </a>
  )
}
