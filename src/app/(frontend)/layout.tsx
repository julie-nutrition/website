import clx from 'classnames'
import { Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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

  return (
    <html lang="fr" className={clx(MarginFont.className, OpenSans.className)}>
      <body>
        <main className="bg-white">{children}</main>
      </body>
    </html>
  )
}
