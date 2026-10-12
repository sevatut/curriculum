import { getT } from 'next-i18next/server'

import { PageTabs } from '@/shared/ui/page-tabs'

export default async function CvTabsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lng: string; cvId: string }>
}>) {
  const { lng, cvId } = await params
  const { t } = await getT('common')
  const base = `/${lng}/cvs/${cvId}`

  const cvTabs = [
    { segment: 'details', label: t('cv.tabs.details') },
    { segment: 'skills', label: t('cv.tabs.skills') },
    { segment: 'projects', label: t('cv.tabs.projects') },
    { segment: 'preview', label: t('cv.tabs.preview') },
  ].map((tab) => ({
    ...tab,
    href: `${base}/${tab.segment}`,
  }))

  return (
    <PageTabs label={t('nav.cvs')} tabs={cvTabs}>
      {children}
    </PageTabs>
  )
}
