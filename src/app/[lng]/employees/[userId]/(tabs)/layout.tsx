import { notFound } from 'next/navigation'
import { getT } from 'next-i18next/server'

import { getUser, userDisplayName } from '@/entities/user'
import { PageTabs } from '@/shared/ui/page-tabs'
import { TabbedSetBreadcrumbs } from '@/widgets/app-header'

const employeeTabSegments = ['profile', 'skills', 'languages'] as const

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

  const employeeTabs = employeeTabSegments.map((segment) => ({
    segment,
    label: t(`tabs.${segment}`),
    href: `${base}/${segment}`,
  }))

  return (
    <>
      <TabbedSetBreadcrumbs
        items={[
          { label: tCommon('nav.employees'), href: `/${lng}/employees` },
          { label: userDisplayName(user), href: `${base}/profile` },
        ]}
        tabs={employeeTabs}
      />
      <PageTabs label={tCommon('nav.employees')} tabs={employeeTabs}>
        {children}
      </PageTabs>
    </>
  )
}
