import Link from 'next/link'
import { getT } from 'next-i18next/server'

import { resolveLocale } from '@/shared/i18n/settings'
import { appRoutes } from '@/shared/routes'
import { buttonVariants } from '@/shared/ui/button'

export default async function NotFound() {
  const { t, lng } = await getT('common')

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="text-6xl font-semibold text-primary">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">{t('notFound.title')}</h1>
      <p className="text-muted-foreground">{t('notFound.description')}</p>
      <Link
        href={appRoutes.home(resolveLocale(lng))}
        className={buttonVariants({ size: 'action' })}
      >
        {t('notFound.home')}
      </Link>
    </div>
  )
}
