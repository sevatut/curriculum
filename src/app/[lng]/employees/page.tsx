import { getActor } from '@/entities/user'
import { EmployeeTable, getEmployeeTableRows } from '@/widgets/employee-table'

export default async function EmployeesPage() {
  const [actor, rows] = await Promise.all([getActor(), getEmployeeTableRows()])

  return <EmployeeTable rows={rows} currentUserId={actor?.id ?? ''} />
}
