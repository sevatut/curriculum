import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { headers } from 'next/headers'

import { defaultLocale } from '@/shared/i18n'

import './globals.css'

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | my-app',
    default: 'my-app',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const lng = headersList.get('x-i18next-current-language') ?? defaultLocale

  return (
    <html lang={lng} className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
