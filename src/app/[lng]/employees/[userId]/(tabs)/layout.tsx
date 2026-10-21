import { notFound } from 'next/navigation'
import { getT } from 'next-i18next/server'

import { getUser } from '@/entities/user'
import { PageTabs } from '@/shared/ui/page-tabs'

export default async function EmployeeTabsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lng: string; userId: string }>
}>) {
  const { lng, userId } = await params
  const { t } = await getT('employees')
  const { t: tCommon } = await getT('common')
  const user = await getUser(userId)

  if (!user) notFound()

  const base = `/${lng}/employees/${userId}`

  const employeeTabs = [
    { segment: 'profile', label: t('tabs.profile') },
    { segment: 'skills', label: t('tabs.skills') },
    { segment: 'languages', label: t('tabs.languages') },
  ].map((tab) => ({
    ...tab,
    href: `${base}/${tab.segment}`,
  }))

  return (
    <PageTabs label={tCommon('nav.employees')} tabs={employeeTabs}>
      {children}
    </PageTabs>
  )
}
