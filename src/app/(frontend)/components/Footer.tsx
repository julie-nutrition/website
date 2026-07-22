import clx from 'classnames'
import Image from 'next/image'
import { ComponentProps } from 'react'
import { FooterLink } from './FooterLink'

type FooterProps = ComponentProps<'footer'>

export default function Footer(props: FooterProps) {
  const { className, ...footerProps } = props

  return (
    <footer
      {...footerProps}
      className={clx('bg-background-dark text-text-light full-width py-40', className)}
    >
      <div className="flex items-start justify-between">
        <div className="flex max-w-300 flex-col items-start gap-10">
          <Image src="/assets/logo-white.svg" alt="Logo" width={208} height={35} />
          <p>Votre partenaire bien-être pour une alimentation équilibrée et savoureuse.</p>
        </div>
        <div className="flex max-w-300 flex-col items-start gap-10">
          <ul className="flex flex-col items-start gap-10">
            <li>
              <FooterLink href="/batchcooking">Batch Cooking</FooterLink>
            </li>
            <li>
              <FooterLink href="/nutrition">Nutrition</FooterLink>
            </li>
            <li>
              <FooterLink
                href="https://contact.julie-nutrition.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </FooterLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
