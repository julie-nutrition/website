import classNames from 'classnames'
import { ArrowRight } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'

type Props = React.ComponentPropsWithoutRef<'a'> & LinkProps

export function JBNLink(props: Props) {
  const { className, ...htmlProps } = props
  return (
    <Link
      {...htmlProps}
      className={classNames(
        'text-jbn-jewel-900 hover:bg-jbn-ginfizz-200 active:bg-jbn-golden-400 group flex items-center gap-8 rounded-lg bg-amber-50 px-20 py-8 hover:font-semibold active:font-semibold',
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
