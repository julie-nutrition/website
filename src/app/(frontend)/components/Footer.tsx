import { Footer as FooterType, Media } from '@/payload-types'
import clx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

type FooterProps = {
  data: FooterType
} & ComponentPropsWithoutRef<'footer'>

export default function Footer(props: FooterProps) {
  const { data, className, ...footerProps } = props
  const logo = data.logo as Media | null

  return (
    <footer {...footerProps} className={clx('bg-jbn-dark-green text-jbn-light-yellow', className)}>
      <div className="container px-32 py-64">
        <div className="grid grid-cols-1 gap-48 lg:grid-cols-[1fr_auto_auto_auto]">
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

          {/* Navigation Columns */}
          {data.columns && data.columns.length > 0 && (
            <>
              {data.columns.map((column) => (
                <div key={column.id} className="flex flex-col gap-20">
                  <h3 className="font-jbn-margin text-xl">{column.title}</h3>
                  {column.links && column.links.length > 0 && (
                    <ul className="flex flex-col gap-12">
                      {column.links.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.url}
                            className="flex items-center gap-8 text-base opacity-90 transition-opacity hover:opacity-100"
                          >
                            {link.icon && <span>{link.icon}</span>}
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Copyright Section */}
        <div className="border-jbn-light-yellow/20 mt-48 border-t pt-32 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Julie Nutrition. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
