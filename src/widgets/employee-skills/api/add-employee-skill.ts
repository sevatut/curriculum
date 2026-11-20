'use server'

import { unstable_rethrow } from 'next/navigation'

import { addProfileSkill, getProfileSkills } from '@/entities/skill'
import { canEditProfile, getActor } from '@/entities/user'
import { parseFormData } from '@/shared/validation'
import { revalidateEmployee } from '@/widgets/employee-skills/api/revalidate-employee'
import {
  addSkillSchema,
  type AddSkillState,
} from '@/widgets/employee-skills/model/skill-form'

export async function addEmployeeSkill(
  lng: string,
  userId: string,
  _state: AddSkillState,
  formData: FormData,
): Promise<AddSkillState> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: 'forbidden' }

  const parsed = parseFormData(addSkillSchema, formData)
  if (!parsed.success) return { error: 'required' }

  try {
    const current = await getProfileSkills(userId)
    if (!current) return { error: 'generic' }

    const name = parsed.data.name
    const exists = current.some(
      (skill) => skill.name.toLowerCase() === name.toLowerCase(),
    )
    if (exists) return { error: 'duplicate' }

    await addProfileSkill({ userId, ...parsed.data })
  } catch (error) {
    unstable_rethrow(error)
    return { error: 'generic' }
  }

  revalidateEmployee(lng, userId)
  return { savedAt: Date.now() }
}
