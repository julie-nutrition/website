import classNames from 'classnames'
import { ArrowRight } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'

type Props = React.ComponentPropsWithoutRef<'a'> &
  LinkProps & {
    variant?: 'light' | 'dark'
  }

export function JBNLink(props: Props) {
  const { className, variant = 'light', ...htmlProps } = props

  return (
    <Link
      {...htmlProps}
      className={classNames(
        'group flex items-center justify-center gap-8 rounded-lg px-20 py-8 transition-colors hover:font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 active:font-semibold',
        variant === 'light' &&
          'text-text-dark hover:bg-hover-light active:bg-pressed-light bg-background-light outline-text-light',
        variant === 'dark' &&
          'text-text-light hover:bg-hover-dark active:bg-pressed-dark bg-background-dark outline-text-dark',
        className,
      )}
    >
      {props.children}
      <span className="hidden group-hover:inline-block">
        <ArrowRight />
      </span>
    </Link>
  )
}
