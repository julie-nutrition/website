import classnames from 'classnames'
import Link, { type LinkProps } from 'next/link'
import { ComponentProps } from 'react'

type FooterLinkProps = ComponentProps<'a'> &
  LinkProps & {
    variant?: 'light' | 'dark'
  }

export function FooterLink(props: FooterLinkProps) {
  const { className, variant = 'light', ...htmlProps } = props

  const classes = classnames(
    'paragraph focus-visible:outline-2 rounded-lg outline-offset-2 px-10 py-5 transition-colors hover:font-semibold active:font-semibold',
    variant === 'light' &&
      'outline-text-light text-text-light hover:text-hover-light active:text-pressed-light',
    variant === 'dark' &&
      'outline-text-dark text-text-dark hover:text-hover-dark active:text-pressed-dark',
    className,
  )

  return <Link {...htmlProps} className={classes} />
}
