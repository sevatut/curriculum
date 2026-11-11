import { notFound } from 'next/navigation'
import { getT } from 'next-i18next/server'

import { getCv } from '@/entities/cv'
import { appRoutes } from '@/shared/routes'
import { PageTabs } from '@/shared/ui/page-tabs'
import { TabbedSetBreadcrumbs } from '@/widgets/app-header'

const cvTabSegments = ['details', 'skills', 'projects', 'preview'] as const

export default async function CvTabsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lng: string; cvId: string }>
}>) {
  const { lng, cvId } = await params
  const cv = await getCv(cvId)
  if (!cv) notFound()

  const { t } = await getT('cvs')
  const { t: tCommon } = await getT('common')
  const cvTabs = cvTabSegments.map((segment) => ({
    segment,
    label: t(`tabs.${segment}`),
    href: appRoutes.cvs[segment](lng, cvId),
  }))

  return (
    <>
      <TabbedSetBreadcrumbs
        items={[
          { label: tCommon('nav.cvs'), href: appRoutes.cvs.list(lng) },
          { label: cv.name, href: appRoutes.cvs.details(lng, cvId) },
        ]}
        tabs={cvTabs}
      />
      <PageTabs label={tCommon('nav.cvs')} tabs={cvTabs}>
        {children}
      </PageTabs>
    </>
  )
}
