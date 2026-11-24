import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { cookies, headers } from 'next/headers'

import { parseTheme, themeCookieName, themeMode } from '@/features/theme/switch-theme'
import { defaultLocale } from '@/shared/i18n'

import '@/app/globals.css'

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
  const theme = parseTheme((await cookies()).get(themeCookieName)?.value)
  const themeClass = theme === themeMode.dark ? 'dark' : ''

  return (
    <html
      lang={lng}
      className={[roboto.variable, themeClass, 'h-full antialiased']
        .filter(Boolean)
        .join(' ')}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
