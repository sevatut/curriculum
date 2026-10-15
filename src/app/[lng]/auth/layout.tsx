import { getT } from 'next-i18next/server'

import { PageTabs } from '@/shared/ui/page-tabs'

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lng: string }>
}>) {
  const { lng } = await params
  const { t } = await getT('common')
  const base = `/${lng}/auth`

  const authTabs = [
    { segment: 'login', label: t('auth.login'), href: `${base}/login` },
    { segment: 'signup', label: t('auth.action'), href: `${base}/signup` },
  ]

  return (
    <PageTabs
      centered
      className="min-h-svh"
      label={t('auth.tabsLabel')}
      tabs={authTabs}
    >
      {children}
    </PageTabs>
  )
}
