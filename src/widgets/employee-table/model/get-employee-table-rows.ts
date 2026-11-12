import { departmentDisplayName } from '@/entities/department'
import { getUsers, userDisplayName } from '@/entities/user'
import type { EmployeeTableRow } from '@/widgets/employee-table/model/employee-table-row'

export async function getEmployeeTableRows(): Promise<readonly EmployeeTableRow[]> {
  const users = await getUsers()

  return users.map((user) => ({
    id: user.id,
    avatar: user.profile?.avatar ?? '',
    displayName: userDisplayName(user),
    firstName: user.profile?.first_name ?? '',
    lastName: user.profile?.last_name ?? '',
    email: user.email,
    role: user.role,
    departmentId: user.department?.id ?? '',
    department: departmentDisplayName(user.department?.name ?? ''),
    positionId: user.position?.id ?? '',
    position: user.position?.name ?? '',
  }))
}
