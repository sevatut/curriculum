import type { ProfileLanguage } from '@/entities/language/model/language'

export type GetProfileLanguagesData = {
  profile: { languages: ProfileLanguage[] } | null
}

export type GetProfileLanguagesVariables = {
  userId: string
}
