'use client'

import { Header as HeaderType, Media } from '@/payload-types'
import clx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef } from 'react'

type HeaderProps = {
  data: HeaderType
} & ComponentPropsWithoutRef<'header'>

export default function Header(props: HeaderProps) {
  const { data, className, ...headerProps } = props
  const logo = data.logo as Media | null
  const pathname = usePathname()

  return (
    <header
      {...headerProps}
      className={clx(
        'sticky top-0 z-50 border-b border-jbn-dark-green/10 bg-jbn-light-yellow/80 backdrop-blur-md backdrop-saturate-150',
        className,
      )}
    >
      <div className="container flex items-center justify-between px-32 py-16">
        {/* Logo */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          {logo && logo.url ? (
            <Image
              src={logo.url}
              alt={logo.alt || 'Logo'}
              width={180}
              height={60}
              className="object-contain"
            />
          ) : (
            <span className="font-jbn-margin text-jbn-dark-green text-2xl">Julie Nutrition</span>
          )}
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-32 md:flex">
          {data.navigation && data.navigation.length > 0 && (
            <>
              {data.navigation.map((link) => {
                const isActive = pathname === link.url
                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    className={clx(
                      'text-jbn-dark-green relative text-base font-medium transition-opacity hover:opacity-70',
                      'after:bg-jbn-dark-green after:absolute after:-bottom-8 after:left-0 after:h-2 after:rounded-full',
                      'after:transition-all after:duration-300 after:ease-out',
                      {
                        'after:w-full after:opacity-100': isActive,
                        'after:w-0 after:opacity-0': !isActive,
                      },
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* CTA Button */}
        {data.ctaButton?.label && data.ctaButton?.url && (
          <Link
            href={data.ctaButton.url}
            className="bg-jbn-dark-green text-jbn-light-yellow rounded-xl px-24 py-8 text-base font-medium transition-transform hover:scale-102"
          >
            {data.ctaButton.label}
          </Link>
        )}
      </div>
    </header>
  )
}
