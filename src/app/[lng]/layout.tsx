import {
  generateI18nStaticParams,
  getResources,
  getT,
  initServerI18next,
} from 'next-i18next/server'
import { I18nProvider } from 'next-i18next/client'

import i18nConfig from '../../../i18n.config'

initServerI18next(i18nConfig)

export function generateStaticParams() {
  return generateI18nStaticParams()
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lng: string }>
}>) {
  const { lng } = await params
  const { i18n } = await getT()
  const resources = getResources(i18n)

  return (
    <I18nProvider language={lng} resources={resources}>
      {children}
    </I18nProvider>
  )
}
