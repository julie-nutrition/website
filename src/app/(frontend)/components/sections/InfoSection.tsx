import type { InfoSection as InfoSectionType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import classNames from 'classnames'
import Image from 'next/image'
import { ComponentProps } from 'react'

type Props = ComponentProps<'section'> & {
  section: InfoSectionType
}

export function InfoSection(props: Props) {
  const { className, section, ...htmlProps } = props

  const { 'meta-title': metaTitle, header, description, media, 'section-id': sectionId } = section

  const classes = classNames(
    'full-width text-text-dark bg-background-card py-100 text-center',
    className,
  )

  return (
    <section id={sectionId ?? undefined} className={classes} {...htmlProps}>
      {metaTitle && <p className="sub-title-md">{metaTitle}</p>}
      {header && <h3>{header}</h3>}
      {description && <RichText className="mt-10" data={description} />}
      {media && typeof media !== 'number' && media.url && (
        <Image
          className="mx-auto mt-40"
          src={media.url}
          alt={media.alt}
          width={media.width ?? 0}
          height={media.height ?? 0}
        />
      )}
    </section>
  )
}
