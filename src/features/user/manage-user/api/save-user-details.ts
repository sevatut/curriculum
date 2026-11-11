import { updateProfile, updateUser } from '@/entities/user'
import type { UserDetailsValues } from '@/features/user/manage-user/model/user-form'

export async function saveUserDetails(userId: string, values: UserDetailsValues) {
  const fullName = await updateProfile({
    userId,
    firstName: values.firstName,
    lastName: values.lastName,
  })

  await updateUser({
    userId,
    role: values.role,
    departmentId: values.departmentId,
    positionId: values.positionId,
  })

  return fullName
}
