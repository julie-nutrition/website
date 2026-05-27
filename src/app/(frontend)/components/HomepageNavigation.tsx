import { Media } from '@/payload-types'
import classnames from 'classnames'
import { ArrowRight } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'

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
        <div className="flex w-full items-end justify-between gap-24">
          <p className="text-sm">{description}</p>
          <span className="bg-jbn-ginfizz-50 group-hover:bg-jbn-ginfizz-200 text-jbn-dark-green flex shrink-0 items-center gap-8 rounded-lg px-20 py-8 group-hover:font-semibold">
            En savoir plus
            <ArrowRight className="hidden group-hover:inline-block" />
          </span>
        </div>
      </div>
    </Link>
  )
}
