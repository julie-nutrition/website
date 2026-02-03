'use client'

import { Header as HeaderType, Media } from '@/payload-types'
import clx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef } from 'react'
import Button from './Button'

type HeaderProps = {
  data: HeaderType
  items: { label: string; url: string }[]
} & ComponentPropsWithoutRef<'header'>

export default function Header(props: HeaderProps) {
  const { data, items, className, ...headerProps } = props
  const logo = data.logo as Media | null
  const pathname = usePathname()

  return (
    <header
      {...headerProps}
      className={clx(
        'border-jbn-dark-green/10 bg-jbn-light-yellow/80 sticky top-0 z-50 border-b backdrop-blur-md backdrop-saturate-150',
        className,
      )}
    >
      <div className="container flex items-center justify-between gap-24 px-32 py-16">
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
        <nav className="hidden grow items-center justify-start gap-32 md:flex">
          {items.length > 0 && (
            <>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <Link
                    key={item.label}
                    href={item.url}
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
                    {item.label}
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        <div className="hidden items-center gap-16 md:flex">
          {data.actions &&
            data.actions.length > 0 &&
            data.actions.map((action) => (
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
      </div>
    </header>
  )
}
