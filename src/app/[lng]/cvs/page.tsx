import { getT } from 'next-i18next/server'

export default async function CvsPage() {
  const { t } = await getT('common')

  return (
    <div className="flex flex-1 flex-col px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t('nav.cvs')}</h1>
    </div>
  )
}
