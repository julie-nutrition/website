import config from '@/payload.config'
import clx from 'classnames'
import { Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { getPayload } from 'payload'
import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import './styles.css'

export const metadata = {
  description:
    'Découvrez les services de Julie BAUZA, nutritionniste. Consultations en ligne personnalisées et cuisine à domicile pour optimiser votre santé et bien-être.',
  title: 'Julie BAUZA - Nutritionniste',
  icons: {
    icon: '/favicon.ico',
  },
}

const MarginFont = localFont({
  src: '/assets/fonts/Margin-Regular.otf',
})

const OpenSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const header = await payload.findGlobal({
    slug: 'header',
  })

  const footer = await payload.findGlobal({
    slug: 'footer',
  })

  return (
    <html lang="fr" className={clx(MarginFont.className, OpenSans.className)}>
      <body>
        <Header data={header} />
        <main className="bg-white">{children}</main>
        <Footer data={footer} />
      </body>
    </html>
  )
}
