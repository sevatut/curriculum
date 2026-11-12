import type { UserRole } from '@/entities/user'

export type EmployeeTableRow = {
  id: string
  avatar: string
  displayName: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  departmentId: string
  department: string
  positionId: string
  position: string
}
