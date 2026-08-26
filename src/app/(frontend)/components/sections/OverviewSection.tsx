import type { Media, OverviewSection as OverviewSectionType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import classNames from 'classnames'
import Image from 'next/image'
import { ComponentProps } from 'react'

type Props = ComponentProps<'section'> & {
  section: OverviewSectionType
}

export function OverviewSection(props: Props) {
  const { className, section, ...htmlProps } = props
  const {
    'meta-title': metaTitle,
    header,
    description,
    images,
    theme,
    layout,
    'section-id': sectionId,
  } = section

  const validImages =
    images?.filter(
      (image): image is Media =>
        typeof image === 'object' &&
        image !== null &&
        typeof image.url === 'string' &&
        typeof image.alt === 'string',
    ) ?? []
  const stackClasses = [
    ['w-[55%]'],
    ['w-[55%] -rotate-2', 'mt-40 -ml-[10%] w-[55%] rotate-2'],
    [
      'absolute top-0 left-[5%] z-0 w-[42%] -rotate-2',
      'absolute top-[13.5%] right-[5%] z-10 w-[42%] rotate-2',
      'absolute bottom-0 left-[18%] z-20 w-[42%] -rotate-1',
    ],
  ]

  const classes = classNames(
    'full-width  py-100',
    {
      'text-text-dark': theme === 'light',
      'bg-background-dark text-text-light': theme === 'dark',
    },
    className,
  )
  return (
    <section id={sectionId ?? undefined} className={classes} {...htmlProps}>
      <div
        className={classNames('flex flex-col items-center', {
          'sm:flex-row': layout === 'left',
          'sm:flex-row-reverse': layout === 'right',
        })}
      >
        <div className="flex flex-col gap-20 p-10 sm:order-1 sm:p-100">
          {metaTitle || header ? (
            <div>
              {metaTitle && <p className="sub-title-md">{metaTitle}</p>}
              {header && <h3>{header}</h3>}
            </div>
          ) : null}
          {description && <RichText data={description} />}
        </div>
        {validImages.length > 0 && (
          <div
            className={classNames('mt-40 w-full', {
              'flex items-start justify-center': validImages.length < 3,
              'relative aspect-square': validImages.length === 3,
            })}
          >
            {validImages.map((image, index) => (
              <div
                key={image.id}
                className={classNames(
                  'aspect-3/4 shrink-0 overflow-hidden rounded-2xl shadow-lg',
                  { relative: validImages.length < 3 },
                  stackClasses[validImages.length - 1][index],
                )}
              >
                <Image
                  src={image.url!}
                  alt={image.alt}
                  className="object-cover"
                  sizes={validImages.length === 3 ? '42vw' : '55vw'}
                  fill
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
