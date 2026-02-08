import { type CtaSection as CtaSectionProps } from '@/payload-types'
import Button from '../Button'
import Section from './Section'

export default function CTASection(props: CtaSectionProps) {
  return (
    <Section background={props.background} wave={props.wave} pattern={props.pattern}>
      <div className="flex items-center gap-24 text-center md:items-start md:text-left">
        <div className="flex flex-col gap-24">
          <h2 className="font-jbn-margin text-4xl lg:text-5xl">{props.title}</h2>
          <p className="text-lg">{props.content}</p>
          {(props.actions?.length ?? 0) > 0 && (
            <div className="flex flex-col items-center gap-16 md:flex-row md:items-start">
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
      </div>
    </Section>
  )
}
