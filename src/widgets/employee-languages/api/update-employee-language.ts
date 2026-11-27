'use server'

import { unstable_rethrow } from 'next/navigation'

import { updateProfileLanguage } from '@/entities/language'
import type { Proficiency } from '@/entities/language/model/proficiency'
import { canEditProfile, getActor } from '@/entities/user'
import { revalidateEmployee } from '@/widgets/employee-languages/api/revalidate-employee'
import {
  profileLanguageSchema,
  type UpdateLanguageResult,
} from '@/widgets/employee-languages/model/language-form'

export async function updateEmployeeLanguage(
  lng: string,
  userId: string,
  input: { name: string; proficiency: Proficiency },
): Promise<UpdateLanguageResult> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: 'forbidden' }

  const parsed = profileLanguageSchema.safeParse(input)
  if (!parsed.success) return { error: 'required' }

  try {
    await updateProfileLanguage({ userId, ...parsed.data })
  } catch (error) {
    unstable_rethrow(error)
    return { error: 'generic' }
  }

  revalidateEmployee(lng, userId)
  return {}
}
