import type { EmployeeTableRow } from '../model/employee-table-row'

export type EmployeeTableProps = {
  rows: readonly EmployeeTableRow[]
  currentUserId: string
}
