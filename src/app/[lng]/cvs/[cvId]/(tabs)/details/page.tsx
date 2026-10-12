import { getT } from 'next-i18next/server'

export default async function CvDetailsPage() {
  const { t } = await getT('common')

  return (
    <div className="flex flex-1 flex-col px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t('cv.tabs.details')}</h1>
    </div>
  )
}
