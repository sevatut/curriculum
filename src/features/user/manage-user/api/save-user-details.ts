import { getDepartments } from '@/entities/department'
import { getPositions } from '@/entities/position'
import { updateProfile, updateUser } from '@/entities/user'
import type { UserDetailsValues } from '@/features/user/manage-user/model/user-form'

export async function saveUserDetails(userId: string, values: UserDetailsValues) {
  const [departments, positions] = await Promise.all([getDepartments(), getPositions()])
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
    departmentName:
      departments.find((item) => item.id === values.departmentId)?.name ?? '',
    positionName: positions.find((item) => item.id === values.positionId)?.name ?? '',
  })

  return fullName
}
