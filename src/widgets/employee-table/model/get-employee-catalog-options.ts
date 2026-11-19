import { departmentDisplayName, getDepartments } from '@/entities/department'
import { getPositions } from '@/entities/position'
import type { UserCatalogs } from '@/features/user/manage-user'

export async function getEmployeeCatalogOptions(): Promise<UserCatalogs> {
  const [departments, positions] = await Promise.all([getDepartments(), getPositions()])

  return {
    departments: departments.map((department) => ({
      value: department.id,
      label: departmentDisplayName(department.name),
    })),
    positions: positions.map((position) => ({
      value: position.id,
      label: position.name,
    })),
  }
}
