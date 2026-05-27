'use client'

import { Header as HeaderType } from '@/payload-types'
import clx from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef } from 'react'

type HeaderProps = {
  data: HeaderType
  items: { label: string; url: string }[]
} & ComponentPropsWithoutRef<'header'>

export default function Header(props: HeaderProps) {
  const { data, items, className, ...headerProps } = props
  const pathname = usePathname()

  return (
    <header
      {...headerProps}
      className={clx(
        'content-grid bg-jbn-light-yellow/80 border-jbn-dark-green/10 border-b backdrop-blur-md backdrop-saturate-150',
        className,
      )}
    >
      <div className="flex items-center justify-between py-12">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <img className="h-35" src={'./assets/logo-green.svg'} alt="Logo Julie Bauza" />
        </Link>

        <nav className="hidden list-none items-center justify-start gap-40 md:flex">
          <HeaderItem
            label="Batchcooking"
            url="/batchcooking"
            active={pathname === '/batchcooking'}
          />
          <HeaderItem label="Nutrition" url="/nutrition" active={pathname === '/nutrition'} />
        </nav>
      </div>
    </header>
  )
}

function HeaderItem({ label, url, active }: { label: string; url: string; active?: boolean }) {
  return (
    <li>
      <Link
        href={url}
        className={clx(
          'text-jbn-jewel-900 hover:text-jbn-jewel-950 active:text-jbn-sprout-950 transition-colors hover:font-semibold',
          { 'font-semibold': active, 'text-jbn-jewel-950': active },
        )}
      >
        {label}
      </Link>
    </li>
  )
}
