import { unstable_rethrow } from 'next/navigation'

import { updateProfile, updateUser } from '@/entities/user'
import {
  profileFormError,
  type ProfileFormError,
} from '@/widgets/employee-profile/model/profile-error'
import type { ProfileFormValues } from '@/widgets/employee-profile/model/profile-form-values'

export async function applyProfileChanges(
  userId: string,
  next: ProfileFormValues,
  initial: ProfileFormValues,
): Promise<{ fullName: string | null } | { error: ProfileFormError }> {
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
      await updateUser({
        userId,
        departmentId: next.departmentId,
        positionId: next.positionId,
      })
    }
  } catch (error) {
    unstable_rethrow(error)
    const restored = await restoreProfileName(userId, initial, fullName !== null)
    return {
      error: restored ? profileFormError.generic : profileFormError.assignment,
    }
  }

  return { fullName }
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
