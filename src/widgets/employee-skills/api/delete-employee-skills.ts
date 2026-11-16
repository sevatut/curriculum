'use server'

import { unstable_rethrow } from 'next/navigation'

import { deleteProfileSkill } from '@/entities/skill'
import { canEditProfile, getActor } from '@/entities/user'
import { revalidateEmployee } from '@/widgets/employee-skills/api/revalidate-employee'
import type { DeleteSkillResult } from '@/widgets/employee-skills/model/skill-form'

export async function deleteEmployeeSkills(
  lng: string,
  userId: string,
  names: string[],
): Promise<DeleteSkillResult> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: 'forbidden' }
  if (names.length === 0) return {}

  let failed = false

  for (const name of new Set(names)) {
    try {
      await deleteProfileSkill({ userId, name })
    } catch (error) {
      unstable_rethrow(error)
      failed = true
      break
    }
  }

  revalidateEmployee(lng, userId)
  return failed ? { error: 'generic' } : {}
}
