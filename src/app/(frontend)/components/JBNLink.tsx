import classNames from 'classnames'
import { ArrowRight } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'

type Props = React.ComponentPropsWithoutRef<'a'> &
  LinkProps & {
    variant?: 'light' | 'dark'
    emphasis?: 'bold' | 'subtle'
  }

function inverseVariant(variant: 'light' | 'dark') {
  return variant === 'light' ? 'dark' : 'light'
}

export function JBNLink(props: Props) {
  const { className, variant = 'light', emphasis = 'bold', ...htmlProps } = props

  return (
    <Link
      {...htmlProps}
      className={classNames(
        'flex items-center justify-center gap-8 rounded-lg px-20 py-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        `outline-text-${variant}`,
        emphasis === 'bold' &&
          `text-text-${inverseVariant(variant)} hover:bg-hover-${variant} active:bg-pressed-${variant} bg-background-${variant}`,
        emphasis === 'subtle' &&
          `border text-text-${variant} hover:text-hover-${variant} active:text-pressed-${variant} border-text-${variant} hover:border-hover-${variant} active:border-pressed-${variant}`,
        className,
      )}
    >
      {props.children}
      <ArrowRight width={16} height={16} />
    </Link>
  )
}
