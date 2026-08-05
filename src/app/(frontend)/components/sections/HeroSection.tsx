import classNames from 'classnames'
import type { IconName } from 'lucide-react/dynamic'
import Image from 'next/image'
import { ComponentProps } from 'react'
import { Icon } from '../Icon'
import { JBNLink } from '../JBNLink'

type Props = ComponentProps<'section'> & {
  title: string
  description?: string
  tags?: Array<{
    label: string
    icon?: IconName
  }>
  image?: {
    src: string
    alt: string
  }
  actions?: Array<{
    label: string
    href: string
  }>
}

export function HeroSection(props: Props) {
  const { className, tags = [], actions = [], image, title, description, ...htmlProps } = props

  const classes = classNames('bg-background-dark text-text-light full-width', className)
  return (
    <section className={classes} {...htmlProps}>
      <div className="flex flex-col items-stretch gap-40 py-20 sm:flex-row sm:items-center sm:gap-100 sm:py-100">
        <div className="flex flex-col items-start gap-20 sm:gap-40">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-10">
              {tags.map((tag, index) => (
                <p key={index} className="sub-title-sm inline-flex items-center gap-10">
                  {tag.icon && <Icon iconName={tag.icon} className="h-16 w-16" />}
                  {tag.label}
                </p>
              ))}
            </div>
          )}
          <h1 className="">{title}</h1>
          {description && <p>{description}</p>}
          {actions.length > 0 && (
            <div className="flex w-full items-stretch gap-10 max-md:flex-col">
              {actions.map((action, index) => (
                <JBNLink key={index} href={action.href} emphasis={index > 0 ? 'subtle' : 'bold'}>
                  {action.label}
                </JBNLink>
              ))}
            </div>
          )}
        </div>
        {image && (
          <div className={`relative mx-auto aspect-3/4 w-full max-w-500`}>
            <Image className="rounded-2xl object-cover" src={image.src} alt={image.alt} fill />
          </div>
        )}
      </div>
    </section>
  )
}
