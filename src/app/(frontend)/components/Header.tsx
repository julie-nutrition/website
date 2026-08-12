'use client'

import classNames from 'classnames'
import type { IconName } from 'lucide-react/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { Icon } from './Icon'

type HeaderProps = ComponentProps<'header'>

export default function Header(props: HeaderProps) {
  const { className, ...headerProps } = props
  const pathname = usePathname()

  return (
    <header
      {...headerProps}
      className={classNames(
        'content-grid bg-jbn-light-yellow/80 border-jbn-dark-green/10 border-b backdrop-blur-md backdrop-saturate-150',
        className,
      )}
    >
      <div className="flex items-center justify-between py-12">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            className="h-35"
            height={35}
            width={208}
            src={'./assets/logo-green.svg'}
            alt="Logo Julie Bauza"
          />
        </Link>

        <nav className="flex list-none items-center justify-start gap-40">
          <HeaderItem
            label="Batchcooking"
            url="/batchcooking"
            icon="cooking-pot"
            active={pathname === '/batchcooking'}
          />
          <HeaderItem
            label="Nutrition"
            url="/nutrition"
            icon="video"
            active={pathname === '/nutrition'}
          />
        </nav>
      </div>
    </header>
  )
}

function HeaderItem({
  label,
  url,
  icon,
  active,
}: {
  label: string
  url: string
  icon: IconName
  active?: boolean
}) {
  return (
    <li>
      <Link
        href={url}
        className={classNames(
          'paragraph hover:text-hover-dark active:text-pressed-dark flex items-center gap-8 transition-colors',
          { 'text-pressed-dark': active },
          { 'text-text-dark': !active },
        )}
      >
        <Icon iconName={icon} width={16} height={16} />
        <span className="max-sm:hidden">{label}</span>
      </Link>
    </li>
  )
}
