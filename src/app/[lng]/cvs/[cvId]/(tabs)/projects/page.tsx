import { getT } from 'next-i18next/server'

export default async function CvProjectsPage() {
  const { t } = await getT('cvs')

  return (
    <div className="flex flex-1 flex-col px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t('tabs.projects')}</h1>
    </div>
  )
}
