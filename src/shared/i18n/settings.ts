export const supportedLngs = ['en', 'ru'] as const
export type Locale = (typeof supportedLngs)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return supportedLngs.some((locale) => locale === value)
}

export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale
}
