import clx from 'classnames'
import type { IconName } from 'lucide-react/dynamic'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { Icon } from './Icon'

type BaseButtonProps = {
  icon?: string | null
  variant: 'primary' | 'secondary' | 'inverse'
}

type ButtonAsButton = BaseButtonProps &
  ComponentPropsWithoutRef<'button'> & {
    href?: never | null
  }

type ButtonAsLink = BaseButtonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

export default function Button(props: ButtonProps) {
  const { icon, children, variant, className, href, ...htmlProps } = props

  const classes = clx(
    'rounded-xl py-8 px-24 flex gap-12 text-base font-medium transition delay-100 ease-out hover:scale-102',
    className,
    {
      'bg-jbn-dark-green text-jbn-light-yellow': variant === 'primary',
      'bg-white text-jbn-dark-green': variant === 'inverse',
      'bg-white text-jbn-dark-green border border-jbn-dark-green hover:bg-jbn-light-green':
        variant === 'secondary',
    },
  )

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://')

    if (isExternal) {
      return (
        <a
          {...(htmlProps as ComponentPropsWithoutRef<'a'>)}
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon && <Icon iconName={icon as IconName} />}
          {children}
        </a>
      )
    }

    return (
      <Link {...(htmlProps as ComponentPropsWithoutRef<'a'>)} href={href} className={classes}>
        {icon && <Icon iconName={icon as IconName} />}
        {children}
      </Link>
    )
  }

  return (
    <button {...(htmlProps as ComponentPropsWithoutRef<'button'>)} className={classes}>
      {icon && <Icon iconName={icon as IconName} />}
      {children}
    </button>
  )
}
