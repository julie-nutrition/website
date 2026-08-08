import type {
  HeroSection as HeroSectionType,
  OverviewSection as OverviewSectionType,
} from '@/payload-types'
import { IconName } from 'lucide-react/dynamic'
import { HeroSection } from './HeroSection'
import { OverviewSection } from './OverviewSection'

type SectionRendererProps = {
  section: HeroSectionType | OverviewSectionType
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

    default:
      return null
  }
}
