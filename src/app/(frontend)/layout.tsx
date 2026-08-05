import clx from 'classnames'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import Header from './components/Header'
import './styles.css'

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
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
  weight: ['300', '400', '700'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr" className={clx(MarginFont.className, OpenSans.className)}>
      <body className="bg-background-light grid h-screen grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
        <Header />
        <main className="content-grid overflow-auto">{children}</main>
      </body>
    </html>
  )
}
