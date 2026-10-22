import { notFound } from 'next/navigation'
import { getT } from 'next-i18next/server'

import { getCv } from '@/entities/cv'
import { PageTabs } from '@/shared/ui/page-tabs'
import { TabbedSetBreadcrumbs } from '@/widgets/app-header'

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
  const base = `/${lng}/cvs/${cvId}`

  const cvTabs = (['details', 'skills', 'projects', 'preview'] as const).map(
    (segment) => ({
      segment,
      label: t(`tabs.${segment}`),
      href: `${base}/${segment}`,
    }),
  )

  return (
    <>
      <TabbedSetBreadcrumbs
        items={[
          { label: tCommon('nav.cvs'), href: `/${lng}/cvs` },
          { label: cv.name, href: `${base}/details` },
        ]}
        tabs={cvTabs}
      />
      <PageTabs label={tCommon('nav.cvs')} tabs={cvTabs}>
        {children}
      </PageTabs>
    </>
  )
}
