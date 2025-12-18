import clx from 'classnames'
import { Stethoscope } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'

type ButtonProps = {
  icon?: string | null
  variant: 'primary' | 'secondary' | 'inverse'
} & ComponentPropsWithoutRef<'button'>

export default function Button(props: ButtonProps) {
  const { icon, children, variant, className, ...htmlProps } = props

  const classes = clx(
    'rounded-xl py-16 px-20 flex gap-16 transition delay-100 ease-out hover:scale-102',
    className,
    {
      'bg-jbn-dark-green text-jbn-light-yellow': variant === 'primary',
      'bg-white text-jbn-dark-green': variant === 'inverse',
      'bg-white text-jbn-dark-green border border-jbn-dark-green hover:bg-jbn-light-green':
        variant === 'secondary',
    },
  )
  return (
    <button {...htmlProps} className={classes}>
      {icon && <Stethoscope />}
      {/* {icon && <DynamicIcon name={icon as IconName} />} */}
      {children}
    </button>
  )
}
