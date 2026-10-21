import { unstable_rethrow } from 'next/navigation'

import { getDepartments } from '@/entities/department'
import { getPositions } from '@/entities/position'
import { updateProfile, updateUser } from '@/entities/user'

import type { ProfileFormValues } from '../model/profile-form-values'

type ProfileSaveError = 'generic' | 'assignment'

export async function applyProfileChanges(
  userId: string,
  next: ProfileFormValues,
  initial: ProfileFormValues,
): Promise<{ fullName: string | null } | { error: ProfileSaveError }> {
  const namesChanged =
    next.firstName !== initial.firstName || next.lastName !== initial.lastName
  const assignmentChanged =
    next.departmentId !== initial.departmentId || next.positionId !== initial.positionId
  let fullName: string | null = null

  try {
    if (namesChanged) {
      fullName = await updateProfile({
        userId,
        firstName: next.firstName,
        lastName: next.lastName,
      })
    }

    if (assignmentChanged) {
      await updateAssignment(userId, next)
    }
  } catch (error) {
    unstable_rethrow(error)
    const restored = await restoreProfileName(userId, initial, fullName !== null)
    return { error: restored ? 'generic' : 'assignment' }
  }

  return { fullName }
}

async function updateAssignment(userId: string, next: ProfileFormValues) {
  const [departments, positions] = await Promise.all([getDepartments(), getPositions()])

  await updateUser({
    userId,
    departmentId: next.departmentId,
    positionId: next.positionId,
    departmentName:
      departments.find((item) => item.id === next.departmentId)?.name ?? '',
    positionName: positions.find((item) => item.id === next.positionId)?.name ?? '',
  })
}

async function restoreProfileName(
  userId: string,
  initial: ProfileFormValues,
  nameWasSaved: boolean,
) {
  if (!nameWasSaved) return true

  try {
    await updateProfile({
      userId,
      firstName: initial.firstName,
      lastName: initial.lastName,
    })
    return true
  } catch (error) {
    unstable_rethrow(error)
    return false
  }
}
