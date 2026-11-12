import { notFound } from 'next/navigation'
import { getT } from 'next-i18next/server'

import { getUser, userDisplayName } from '@/entities/user'
import { appRoutes } from '@/shared/routes'
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

  const employeeTabs = employeeTabSegments.map((segment) => ({
    segment,
    label: t(`tabs.${segment}`),
    href: appRoutes.employees[segment](lng, userId),
  }))

  return (
    <>
      <TabbedSetBreadcrumbs
        items={[
          { label: tCommon('nav.employees'), href: appRoutes.employees.list(lng) },
          {
            label: userDisplayName(user),
            href: appRoutes.employees.profile(lng, userId),
          },
        ]}
        tabs={employeeTabs}
      />
      <PageTabs label={tCommon('nav.employees')} tabs={employeeTabs}>
        {children}
      </PageTabs>
    </>
  )
}
