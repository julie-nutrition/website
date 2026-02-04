import { BackgroundColor } from '@/payload-types'
import clx from 'classnames'
import Image from 'next/image'
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import leaves from '../../assets/graphical/leaves_dark.svg'

type SectionProps = {
  background?: BackgroundColor
  wave?: boolean | null
  pattern?: boolean | null
} & PropsWithChildren<ComponentPropsWithoutRef<'section'>>

export default function Section(props: SectionProps) {
  const { background, wave, pattern, children, className, ...htmlProps } = props
  return (
    <section
      className={clx(className, { [`section-${background}`]: background, relative: wave })}
      {...htmlProps}
    >
      {children}
      {wave && <hr className="wave absolute -bottom-49 h-50 w-full border-0" />}
      {pattern && (
        <div className="bg-jbn-dark-green/10 pointer-events-none absolute inset-0 -z-10">
          <Image src={leaves} alt="" className="absolute right-0 bottom-0 h-auto w-96 opacity-20" />
        </div>
      )}
    </section>
  )
}
