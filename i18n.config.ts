import type { I18nConfig } from 'next-i18next/proxy'

import { defaultLocale, supportedLngs } from './src/shared/i18n/settings'

const resourceLoader: I18nConfig['resourceLoader'] =
  process.env.NODE_ENV === 'development'
    ? async (lng, ns) => {
        const fs = await import('fs/promises')
        const path = await import('path')
        const content = await fs.readFile(
          path.resolve(process.cwd(), `src/shared/i18n/locales/${lng}/${ns}.json`),
          'utf-8',
        )
        return JSON.parse(content) as Record<string, string>
      }
    : (lng, ns) => import(`./src/shared/i18n/locales/${lng}/${ns}.json`)

const i18nConfig: I18nConfig = {
  supportedLngs: [...supportedLngs],
  fallbackLng: defaultLocale,
  defaultNS: 'common',
  ns: ['common', 'home'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  resourceLoader,
}

export default i18nConfig
