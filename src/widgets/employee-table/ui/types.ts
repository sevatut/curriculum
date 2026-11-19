import type { Actor } from '@/entities/user'
import type { UserCatalogs } from '@/features/user/manage-user'
import type { EmployeeTableRow } from '@/widgets/employee-table/model/employee-table-row'

export type EmployeeTableProps = UserCatalogs & {
  rows: readonly EmployeeTableRow[]
  actor: Actor | null
}

export type EmployeeProfileLinkProps = {
  href: string
  label: string
}

export type EmployeeAdminMenuProps = UserCatalogs & {
  row: EmployeeTableRow
  deletable: boolean
}

export type EmployeeRowActionsProps = UserCatalogs & {
  row: EmployeeTableRow
  actor: Actor | null
}

export type EmployeeTableColumnLabels = {
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
}
