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
  const { t } = await getT('common')
  const base = `/${lng}/employees`

  const employeeTabs = [
    { segment: 'profile', label: t('employee.tabs.profile') },
    { segment: 'skills', label: t('employee.tabs.skills') },
    { segment: 'languages', label: t('employee.tabs.languages') },
  ].map((tab) => ({
    ...tab,
    href: `${base}/${tab.segment}`,
  }))

  return (
    <PageTabs label={t('nav.employees')} tabs={employeeTabs}>
      {children}
    </PageTabs>
  )
}
