import { type FeatureSection as FeatureSectionProps } from '@/payload-types'
import Section from './Section'
import FeatureCard from './sub-components/FeatureCard'

export default function FeatureSection(props: FeatureSectionProps) {
  return (
    <Section background={props.background} wave={props.wave} pattern={props.pattern}>
      <div className="flex flex-col items-center gap-24">
        <h2 className="font-jbn-margin text-5xl">{props.title}</h2>
        <p className="text-xl">{props.content}</p>
        <div className="flex flex-col gap-24 md:flex-row">
          {props.features?.map((service) => (
            <FeatureCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              link={service.link}
            >
              {service.description}
            </FeatureCard>
          ))}
        </div>
      </div>
    </Section>
  )
}
