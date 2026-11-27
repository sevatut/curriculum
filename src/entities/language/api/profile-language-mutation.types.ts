import type { ProfileLanguage } from '@/entities/language/model/language'
import type { Proficiency } from '@/entities/language/model/proficiency'

export type ProfileLanguageInput = {
  userId: string
  name: string
  proficiency: Proficiency
}

export type ProfileLanguageMutationVariables = {
  language: ProfileLanguageInput
}

export type ProfileLanguageMutationData<Field extends string> = Record<
  Field,
  { languages: ProfileLanguage[] } | null
>
