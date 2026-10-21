import { departmentDisplayName } from '@/entities/department'
import { getUsers } from '@/entities/user'

import type { EmployeeTableRow } from './employee-table-row'

export async function getEmployeeTableRows(): Promise<readonly EmployeeTableRow[]> {
  const users = await getUsers()

  return users.map((user) => ({
    id: user.id,
    avatar: user.profile?.avatar ?? '',
    firstName: user.profile?.first_name ?? '',
    lastName: user.profile?.last_name ?? '',
    email: user.email,
    department: departmentDisplayName(user.department_name ?? ''),
    position: user.position_name ?? '',
  }))
}
