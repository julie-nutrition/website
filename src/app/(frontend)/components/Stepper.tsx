import type { StepperSection as StepperSectionType } from '@/payload-types'
import classNames from 'classnames'
import type { IconName } from 'lucide-react/dynamic'
import type { ComponentProps } from 'react'
import { Icon } from './Icon'

type Props = ComponentProps<'div'> & {
  steps: StepperSectionType['steps']
}

const stepIndicatorClass = (hasIcon: boolean) => {
  return classNames(
    'stepper-step-indicator border-text-dark bg-background-card grid shrink-0 h-48 w-48 place-items-center rounded-full border',
    {
      'bg-background-dark': hasIcon,
      'text-text-light': hasIcon,
    },
  )
}

export function Stepper(props: Props) {
  const { className, steps, ...htmlProps } = props

  const classes = classNames('flex justify-between flex-col lg:flex-row', className)

  return (
    !!steps?.length && (
      <div className={classes} {...htmlProps}>
        {steps.map((step, index) => {
          const { title, icon, description } = step
          return (
            <div
              key={index}
              className="stepper-step flex gap-20 rounded-2xl p-40 lg:flex-col lg:items-center lg:gap-10"
            >
              <span className={stepIndicatorClass(!!icon)}>
                {icon ? <Icon iconName={icon as IconName} /> : index + 1}
              </span>
              <div className="flex flex-col gap-10 lg:text-center">
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  )
}
