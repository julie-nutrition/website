import { type InformationSection as InformationSectionProps } from '@/payload-types'
import Section from './Section'

export default function InformationSection(props: InformationSectionProps) {
  return (
    <Section background={props.background} wave={props.wave} pattern={props.pattern}>
      <div className="flex flex-col items-center gap-24 text-center">
        <h2 className="font-jbn-margin text-4xl lg:text-5xl">{props.title}</h2>
        {props.content && <p className="max-w-3xl text-lg">{props.content}</p>}
      </div>
    </Section>
  )
}
