import { z } from 'zod'

import { masteryLevels } from '@/entities/skill/model/mastery'
import { formErrorCode } from '@/shared/validation'

export const addSkillSchema = z.object({
  name: z.string().trim().min(1, { error: formErrorCode.required }),
  categoryId: z.string().min(1, { error: formErrorCode.required }),
  mastery: z.enum(masteryLevels, { error: formErrorCode.required }),
})

export type SkillActionError = 'required' | 'duplicate' | 'forbidden' | 'generic'

export type AddSkillState = {
  error?: SkillActionError
  savedAt?: number
}

export type DeleteSkillResult = { error?: SkillActionError }

export type UpdateSkillResult = { error?: SkillActionError }
