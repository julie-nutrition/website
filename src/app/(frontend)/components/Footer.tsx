import { Footer as FooterType, Media } from '@/payload-types'
import clx from 'classnames'
import { IconName } from 'lucide-react/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { Icon } from './Icon'

type FooterProps = {
  data: FooterType
  navigationItems: { label: string; url: string }[]
} & ComponentPropsWithoutRef<'footer'>

export default function Footer(props: FooterProps) {
  const { data, navigationItems, className, ...footerProps } = props
  const logo = data.logo as Media | null

  return (
    <footer {...footerProps} className={clx('bg-jbn-dark-green text-jbn-light-yellow', className)}>
      <div className="container px-32 py-64">
        <div className="grid grid-cols-1 gap-48 lg:grid-cols-[1fr_auto_auto]">
          {/* Logo and Slogan Section */}
          <div className="flex flex-col gap-20">
            {logo && logo.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                width={150}
                height={50}
                className="object-contain"
              />
            ) : (
              <h3 className="font-jbn-margin text-2xl">Julie Nutrition</h3>
            )}
            {data.slogan && <p className="text-base leading-relaxed opacity-90">{data.slogan}</p>}
          </div>

          {data['navigation-label'] && (
            <LinkColumn label={data['navigation-label']} links={navigationItems} />
          )}

          {data.columns && data.columns.length > 0 && (
            <>
              {data.columns.map((column) =>
                column.links ? (
                  <LinkColumn key={column.id} label={column.title} links={column.links} />
                ) : null,
              )}
            </>
          )}
        </div>

        {data.copyright && (
          <div className="border-jbn-light-yellow/20 mt-48 border-t pt-32 text-center text-sm opacity-80">
            <p>
              &copy; {new Date().getFullYear()} {data.copyright}
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}

type LinkColumnProps = {
  label: string
  links: NonNullable<FooterType['columns']>[0]['links']
}

function LinkColumn(props: LinkColumnProps) {
  return (
    <div className="flex flex-col gap-20">
      <h3 className="font-jbn-margin text-xl">{props.label}</h3>
      {props.links && props.links.length > 0 && (
        <ul className="flex flex-col gap-12">
          {props.links.map((link) => (
            <li key={link.id ?? link.label}>
              <Link
                href={link.url}
                className="flex items-center gap-8 text-base opacity-90 transition-opacity hover:opacity-100"
              >
                {link.icon && <Icon iconName={link.icon as IconName} />}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
