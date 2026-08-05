import classNames from 'classnames'
import { ArrowRight } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'

type Props = React.ComponentPropsWithoutRef<'a'> &
  LinkProps & {
    variant?: 'light' | 'dark'
    emphasis?: 'bold' | 'subtle'
  }

export function JBNLink(props: Props) {
  const { className, variant = 'light', emphasis = 'bold', ...htmlProps } = props

  const classes = [
    'flex items-center justify-center gap-8 rounded-lg px-20 py-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
  ]

  if (variant === 'light') {
    classes.push('outline-text-light')
  } else {
    classes.push('outline-text-dark')
  }

  if (emphasis === 'bold') {
    if (variant === 'light') {
      classes.push(
        'text-text-dark hover:bg-hover-light active:bg-pressed-light bg-background-light',
      )
    } else {
      classes.push('text-text-light hover:bg-hover-dark active:bg-pressed-dark bg-background-dark')
    }
  } else if (emphasis === 'subtle') {
    if (variant === 'light') {
      classes.push(
        'border text-text-light hover:text-hover-light active:text-pressed-light border-text-light hover:border-hover-light active:border-pressed-light',
      )
    } else {
      classes.push(
        'border text-text-dark hover:text-hover-dark active:text-pressed-dark border-text-dark hover:border-hover-dark active:border-pressed-dark',
      )
    }
  }

  return (
    <Link {...htmlProps} className={classNames(classes, className)}>
      {props.children}
      <ArrowRight width={16} height={16} />
    </Link>
  )
}
