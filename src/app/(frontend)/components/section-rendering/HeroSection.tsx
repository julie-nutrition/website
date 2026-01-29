import { type HeroSection as HeroSectionProps } from '@/payload-types'
import clx from 'classnames'
import Image from 'next/image'
import { textColorForBackground } from '../../utils/color.helper'
import { isMedia } from '../../utils/payload-type.helper'
import Button from '../Button'

export default function HeroSection(props: HeroSectionProps) {
  return (
    <>
      <section className={`bg-jbn-${props.background}`}>
        <div className="container flex items-center gap-48 px-32 py-96">
          <div className="flex flex-col gap-24">
            <h1
              className={clx(
                textColorForBackground(props.background),
                'font-jbn-margin text-5xl lg:text-6xl',
              )}
            >
              {props.title}
            </h1>
            <p className={clx(textColorForBackground(props.background), 'text-lg')}>
              {props.content}
            </p>
            {(props.actions?.length ?? 0) > 0 && (
              <div className="flex flex-col items-start gap-16 md:flex-row">
                {props.actions?.map((action) => (
                  <Button
                    key={action.id}
                    icon={action.icon}
                    variant={action.variant}
                    href={action.href}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {props.picture && isMedia(props.picture) && props.picture.url && (
            <div className="animate-fade-in-right relative hidden lg:block">
              <Image
                src={props.picture.url}
                alt={props.picture.alt}
                width={600}
                height={400}
                className="-z-10 rounded-xl shadow-xl"
              />
            </div>
          )}
        </div>
      </section>
      {props.wave && (
        <hr className={clx(`bg-jbn-${props.background}`, 'wave h-50 w-full border-0')} />
      )}
    </>
  )
}
