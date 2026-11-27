'use server'

import { unstable_rethrow } from 'next/navigation'

import { deleteProfileLanguage } from '@/entities/language'
import { canEditProfile, getActor } from '@/entities/user'
import { revalidateEmployee } from '@/widgets/employee-languages/api/revalidate-employee'
import type { DeleteLanguageResult } from '@/widgets/employee-languages/model/language-form'

export async function deleteEmployeeLanguages(
  lng: string,
  userId: string,
  names: string[],
): Promise<DeleteLanguageResult> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: 'forbidden' }
  if (names.length === 0) return {}

  let failed = false

  for (const name of new Set(names)) {
    try {
      await deleteProfileLanguage({ userId, name })
    } catch (error) {
      unstable_rethrow(error)
      failed = true
      break
    }
  }

  revalidateEmployee(lng, userId)
  return failed ? { error: 'generic' } : {}
}
