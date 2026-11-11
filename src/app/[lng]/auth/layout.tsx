import { getT } from 'next-i18next/server'

import { appRoutes } from '@/shared/routes'
import { PageTabs } from '@/shared/ui/page-tabs'

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lng: string }>
}>) {
  const { lng } = await params
  const { t } = await getT('auth')
  const authTabs = [
    { segment: 'login', label: t('login'), href: appRoutes.auth.login(lng) },
    { segment: 'signup', label: t('action'), href: appRoutes.auth.signup(lng) },
  ]

  return (
    <PageTabs centered className="min-h-svh" label={t('tabsLabel')} tabs={authTabs}>
      {children}
    </PageTabs>
  )
}
