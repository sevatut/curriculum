import { getActor, isAdmin } from '@/entities/user'
import {
  EmployeeTable,
  getEmployeeCatalogOptions,
  getEmployeeTableRows,
} from '@/widgets/employee-table'

const emptyCatalogs = { departments: [], positions: [] }

export default async function EmployeesPage() {
  const [actor, rows] = await Promise.all([getActor(), getEmployeeTableRows()])
  const catalogs = isAdmin(actor) ? await getEmployeeCatalogOptions() : emptyCatalogs

  return (
    <EmployeeTable
      rows={rows}
      actor={actor}
      departments={catalogs.departments}
      positions={catalogs.positions}
    />
  )
}
