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
        'border-jbn-light-green flex flex-col items-start gap-16 rounded-xl border px-24 py-24 transition delay-100 ease-out hover:scale-102 hover:bg-neutral-50',
        className,
      )}
    >
      {icon && (
        <div className="bg-jbn-light-green text-jbn-dark-green rounded-2xl p-16">
          <Stethoscope />
        </div>
      )}
      <h4 className="text-jbn-dark-green text-2xl font-bold">{title}</h4>
      <p className="text-jbn-dark-green text-base leading-relaxed">{children}</p>
      <small className="text-gray-400 text-sm underline underline-offset-3">En savoir plus</small>
    </a>
  )
}
