import type { ProfileLanguageMutationData } from '@/entities/language/api/profile-language-mutation.types'

export type DeleteProfileLanguageInput = {
  userId: string
  name: string
}

export type DeleteProfileLanguageVariables = {
  language: DeleteProfileLanguageInput
}

export type DeleteProfileLanguageData =
  ProfileLanguageMutationData<'deleteProfileLanguage'>
