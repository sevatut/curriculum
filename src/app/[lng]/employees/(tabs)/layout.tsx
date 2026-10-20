import { getT } from 'next-i18next/server'

import { PageTabs } from '@/shared/ui/page-tabs'

export default async function EmployeeTabsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lng: string }>
}>) {
  const { lng } = await params
  const { t } = await getT('employees')
  const { t: tCommon } = await getT('common')
  const base = `/${lng}/employees`

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
