import { z } from 'zod'

import { proficiencyLevels } from '@/entities/language/model/proficiency'
import { formErrorCode } from '@/shared/validation'

export const profileLanguageSchema = z.object({
  name: z.string().trim().min(1, { error: formErrorCode.required }),
  proficiency: z.enum(proficiencyLevels, { error: formErrorCode.required }),
})

export type LanguageActionError = 'required' | 'duplicate' | 'forbidden' | 'generic'

export type AddLanguageState = {
  error?: LanguageActionError
  savedAt?: number
}

export type DeleteLanguageResult = { error?: LanguageActionError }

export type UpdateLanguageResult = { error?: LanguageActionError }
