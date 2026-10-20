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
  const { t } = await getT('cvs')
  const { t: tCommon } = await getT('common')
  const base = `/${lng}/cvs/${cvId}`

  const cvTabs = [
    { segment: 'details', label: t('tabs.details') },
    { segment: 'skills', label: t('tabs.skills') },
    { segment: 'projects', label: t('tabs.projects') },
    { segment: 'preview', label: t('tabs.preview') },
  ].map((tab) => ({
    ...tab,
    href: `${base}/${tab.segment}`,
  }))

  return (
    <PageTabs label={tCommon('nav.cvs')} tabs={cvTabs}>
      {children}
    </PageTabs>
  )
}
