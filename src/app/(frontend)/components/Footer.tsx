'use client'

import clx from 'classnames'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { FooterLink } from './FooterLink'

type FooterProps = ComponentProps<'footer'>

export default function Footer(props: FooterProps) {
  const { className, ...footerProps } = props
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <footer
      {...footerProps}
      className={clx('bg-background-dark text-text-light full-width py-40', className)}
    >
      <div className="flex flex-col justify-between gap-40 sm:flex-row">
        <div className="flex flex-col items-start gap-10 sm:max-w-300">
          <Image src="/assets/logo-white.svg" alt="Logo" width={208} height={35} />
          <p>Votre partenaire bien-être pour une alimentation équilibrée et savoureuse.</p>
        </div>
        <ul className="flex justify-between gap-20 sm:flex-col">
          <li>
            <FooterLink icon="mail" href="mailto:contact@julie-nutrition.fr">
              Email
            </FooterLink>
          </li>
          <li>
            <FooterLink
              icon="messages-square"
              href="https://instagram.com/julie.batchcooking"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </FooterLink>
          </li>
          <li>
            <FooterLink
              icon="calendar"
              href="https://cal.com/julie-nutrition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prise de RDV
            </FooterLink>
          </li>
        </ul>
      </div>
    </footer>
  )
}
