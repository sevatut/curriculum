import {
  generateI18nStaticParams,
  getResources,
  getT,
  initServerI18next,
} from 'next-i18next/server'
import { I18nProvider } from 'next-i18next/client'
import { unstable_rethrow } from 'next/navigation'

import { getUserAvatar } from '@/entities/user'
import { readSession } from '@/shared/api/session-store'
import { i18nConfig } from '@/shared/i18n/config'
import { AppFrame } from '@/app/[lng]/app-frame'

initServerI18next(i18nConfig)

async function readSidebarAvatar(userId: string) {
  try {
    return (await getUserAvatar(userId)) ?? ''
  } catch (error) {
    unstable_rethrow(error)
    return ''
  }
}

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
  const session = await readSession()
  const userAvatar = session ? await readSidebarAvatar(session.user.id) : ''
  return (
    <I18nProvider language={lng} resources={resources}>
      <AppFrame lng={lng} userName={session?.user.name ?? ''} userAvatar={userAvatar}>
        {children}
      </AppFrame>
    </I18nProvider>
  )
}
