import { Media } from '@/payload-types'
import classnames from 'classnames'
import Link, { type LinkProps } from 'next/link'
import { JBNLink } from './JBNLink'

type Props = {
  img: Media
  title: string
  description: string
} & LinkProps &
  React.ComponentPropsWithoutRef<'a'>

export const HomepageNavigation = (props: Props) => {
  const { img, title, description, ...htmlProps } = props

  const className = classnames('relative flex flex-col justify-end group', htmlProps.className)

  return (
    <Link {...htmlProps} className={className}>
      {img.url && typeof img.url === 'string' && (
        <img src={img.url} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div className="text-jbn-ginfizz-50 group-hover:text-jbn-ginfizz-200 from-jbn-dark-green/60 z-10 flex flex-col items-start justify-end gap-20 bg-linear-to-t to-transparent p-40">
        <h3 className="font-jbn-margin text-6xl font-semibold">{title}</h3>
        <div className="flex w-full flex-col justify-between gap-24 md:flex-row md:items-end">
          <p className="text-sm">{description}</p>
          <JBNLink href="" decorative>
            En savoir plus
          </JBNLink>
        </div>
      </div>
    </Link>
  )
}
