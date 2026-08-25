import classnames from 'classnames'
import type { IconName } from 'lucide-react/dynamic'
import Link, { type LinkProps } from 'next/link'
import { ComponentProps } from 'react'
import { Icon } from './Icon'

type FooterLinkProps = ComponentProps<'a'> &
  LinkProps & {
    variant?: 'light' | 'dark'
    icon?: IconName
  }

export function FooterLink(props: FooterLinkProps) {
  const { className, children, icon, variant = 'light', ...htmlProps } = props

  const classes = classnames(
    'paragraph flex items-center gap-10 focus-visible:outline-2 rounded-lg outline-offset-2  transition-colors hover:font-semibold active:font-semibold',
    variant === 'light' &&
      'outline-text-light text-text-light hover:text-hover-light active:text-pressed-light',
    variant === 'dark' &&
      'outline-text-dark text-text-dark hover:text-hover-dark active:text-pressed-dark',
    className,
  )

  return (
    <Link {...htmlProps} className={classes}>
      {icon && <Icon iconName={icon} className="h-16 w-16" />}
      {children}
    </Link>
  )
}
