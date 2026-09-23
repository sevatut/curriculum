import { getT } from 'next-i18next/server'

import { LocaleSwitcher } from '@/features/locale/switch-locale'

export async function generateMetadata() {
  const { t } = await getT('home')
  return {
    title: t('meta_title'),
  }
}

export default async function HomePage() {
  const { t } = await getT('home')

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-lg flex-col items-start gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
        <LocaleSwitcher />
      </div>
    </main>
  )
}
