import { BackgroundColor } from '@/payload-types'
import clx from 'classnames'
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import Leave from './sub-components/Leave'

type SectionProps = {
  background?: BackgroundColor
  wave?: boolean | null
  pattern?: boolean | null
} & PropsWithChildren<ComponentPropsWithoutRef<'section'>>

export default function Section(props: SectionProps) {
  const { background, wave, pattern, children, className, ...htmlProps } = props
  return (
    <section
      className={clx(
        'relative px-32 py-48',
        {
          [`section-${background}`]: background,
          'overflow-hidden': pattern,
        },
        className,
      )}
      {...htmlProps}
    >
      <div className="relative z-10 container">{children}</div>
      {pattern && (
        <>
          <Leave width={500} height={500} className="absolute -right-200 -bottom-10" />
          <Leave width={200} height={200} className="absolute -top-50 -left-80" />
        </>
      )}
      {wave && <hr className="wave absolute -bottom-49 left-0 z-20 h-50 w-full border-0" />}
    </section>
  )
}
