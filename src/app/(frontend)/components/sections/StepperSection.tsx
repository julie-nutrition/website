import type { StepperSection as StepperSectionType } from '@/payload-types'
import classNames from 'classnames'
import { ComponentProps } from 'react'
import { Stepper } from '../Stepper'

type Props = ComponentProps<'section'> & {
  section: StepperSectionType
}

export function StepperSection(props: Props) {
  const { className, section, ...htmlProps } = props

  const { 'meta-title': metaTitle, header, description } = section

  const classes = classNames('full-width bg-background-card text-text-dark', className)

  return (
    <section className={classes} {...htmlProps}>
      <div className="flex flex-col items-center gap-80 py-100">
        <div className="text-center">
          <p className="sub-title-md">{metaTitle}</p>
          <h3 className="mb-10">{header}</h3>
          <p>{description}</p>
        </div>
        <Stepper steps={section.steps} />
      </div>
    </section>
  )
}
