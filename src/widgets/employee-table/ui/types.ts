import type { EmployeeTableRow } from '../model/employee-table-row'

export type EmployeeTableProps = {
  rows: readonly EmployeeTableRow[]
  currentUserId: string
}

export type EmployeeTableActionsProps = {
  href: string
  label: string
  own: boolean
}

export type EmployeeTableColumnLabels = {
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
}
