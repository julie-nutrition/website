import clx from 'classnames'
import { type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { Icon } from '../../Icon'

type FeatureCardProps = {
  icon?: string | null
  title: string
  link?: string | null
} & (ComponentPropsWithoutRef<'div'> & ComponentPropsWithoutRef<'a'>)

export default function FeatureCard(props: FeatureCardProps) {
  const { title, icon, children, link, className, ...htmlProps } = props

  const rootClassName = clx(
    className,
    'border-jbn-light-green flex flex-col items-center gap-16 rounded-xl border bg-white px-24 py-24',
  )

  if (!!link) {
    return (
      <Link href={link} className={rootClassName} {...htmlProps}>
        <CardContent title={title} icon={icon}>
          {children}
        </CardContent>
      </Link>
    )
  }

  return (
    <div href={link} className={rootClassName} {...htmlProps}>
      <CardContent title={title} icon={icon}>
        {children}
      </CardContent>
    </div>
  )
}

function CardContent({ title, icon, children }: Omit<FeatureCardProps, 'asChild'>) {
  return (
    <>
      {icon && (
        <div className="bg-jbn-light-green text-jbn-dark-green rounded-full p-16">
          <Icon iconName={icon as IconName} />
        </div>
      )}
      <h4 className="text-jbn-dark-green text-xl font-bold">{title}</h4>
      <p className="text-jbn-dark-green text-center text-base leading-relaxed">{children}</p>
    </>
  )
}
