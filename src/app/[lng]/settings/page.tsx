import { cookies } from 'next/headers'
import { getT } from 'next-i18next/server'

import { LocaleSwitcher } from '@/features/locale/switch-locale'
import {
  parseTheme,
  themeCookieName,
  ThemeSwitcher,
} from '@/features/theme/switch-theme'

export default async function SettingsPage() {
  const { t } = await getT('common')
  const theme = parseTheme((await cookies()).get(themeCookieName)?.value)

  return (
    <div className="flex flex-1 flex-col px-6 py-16">
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">
        {t('nav.settings')}
      </h1>
      <div className="mt-12 ml-4 flex flex-col items-start justify-center gap-7">
        <ThemeSwitcher theme={theme} />
        <LocaleSwitcher />
      </div>
    </div>
  )
}
