import type {
  HeroSection as HeroSectionType,
  IssuesSection as IssuesSectionType,
  OverviewSection as OverviewSectionType,
  StepperSection as StepperSectionType,
} from '@/payload-types'
import { IconName } from 'lucide-react/dynamic'
import { HeroSection } from './HeroSection'
import { IssuesSection } from './IssuesSection'
import { OverviewSection } from './OverviewSection'
import { StepperSection } from './StepperSection'

type SectionRendererProps = {
  section: HeroSectionType | OverviewSectionType | IssuesSectionType | StepperSectionType
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.blockType) {
    case 'hero-section':
      if (!section.header) {
        return null
      }

      let image

      if (
        section.image &&
        typeof section.image !== 'number' &&
        typeof section.image.url === 'string' &&
        typeof section.image.alt === 'string'
      ) {
        image = {
          src: section.image.url,
          alt: section.image.alt,
        }
      }

      const tags = section.tags?.map((tag) => ({
        label: tag.label,
        icon: (tag.icon as IconName) ?? undefined,
      }))

      const actions = section.actions?.map((action) => ({
        label: action.label,
        href: action.href,
      }))

      return (
        <HeroSection
          title={section.header}
          image={image}
          tags={tags}
          description={section.description}
          actions={actions}
        />
      )

    case 'overview-section':
      return <OverviewSection section={section} />

    case 'issues-section':
      return <IssuesSection section={section} />

    case 'stepper-section':
      return <StepperSection section={section} />

    default:
      return null
  }
}
