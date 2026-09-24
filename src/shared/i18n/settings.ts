export const supportedLngs = ['en', 'ru'] as const
export type Locale = (typeof supportedLngs)[number]
export const defaultLocale: Locale = 'en'
