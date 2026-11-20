'use server'

import { unstable_rethrow } from 'next/navigation'

import { updateProfileSkill } from '@/entities/skill'
import { canEditProfile, getActor } from '@/entities/user'
import { revalidateEmployee } from '@/widgets/employee-skills/api/revalidate-employee'
import {
  addSkillSchema,
  type UpdateSkillResult,
} from '@/widgets/employee-skills/model/skill-form'

export async function updateEmployeeSkill(
  lng: string,
  userId: string,
  input: { name: string; categoryId: string; mastery: string },
): Promise<UpdateSkillResult> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: 'forbidden' }

  const parsed = addSkillSchema.safeParse(input)
  if (!parsed.success) return { error: 'required' }

  try {
    await updateProfileSkill({ userId, ...parsed.data })
  } catch (error) {
    unstable_rethrow(error)
    return { error: 'generic' }
  }

  revalidateEmployee(lng, userId)
  return {}
}
