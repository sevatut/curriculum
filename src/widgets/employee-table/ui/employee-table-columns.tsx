import Link from 'next/link'

import { userInitial } from '@/entities/user/model/user-name'
import { UserAvatar } from '@/entities/user/ui/user-avatar'
import type { DataTableColumn } from '@/shared/ui/data-table'

import type { EmployeeTableRow } from '../model/employee-table-row'

type EmployeeTableColumnLabels = {
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
}

export function getEmployeeTableColumns(
  lng: string,
  labels: EmployeeTableColumnLabels,
): DataTableColumn<EmployeeTableRow>[] {
  return [
    {
      id: 'avatar',
      label: '',
      className: 'w-16',
      cell: (row) => (
        <UserAvatar
          src={row.avatar}
          initial={userInitial(row.firstName || row.lastName || row.email)}
        />
      ),
    },
    {
      id: 'firstName',
      label: labels.firstName,
      className: 'w-[16%] max-[1100px]:w-[34%]',
      cell: (row) => (
        <Link
          href={`/${lng}/employees/${row.id}/profile`}
          className="hover:text-primary"
        >
          {row.firstName}
        </Link>
      ),
      sortValue: (row) => row.firstName,
    },
    {
      id: 'lastName',
      label: labels.lastName,
      className: 'w-[16%] max-[1100px]:hidden',
      cell: (row) => row.lastName,
      sortValue: (row) => row.lastName,
    },
    {
      id: 'email',
      label: labels.email,
      className: 'w-[26%] max-[1100px]:hidden',
      cell: (row) => row.email,
      sortValue: (row) => row.email,
    },
    {
      id: 'department',
      label: labels.department,
      className: 'w-[17%] max-[1100px]:w-[28%]',
      cell: (row) => row.department,
      sortValue: (row) => row.department,
    },
    {
      id: 'position',
      label: labels.position,
      className: 'w-[17%] max-[1100px]:w-[28%]',
      cell: (row) => row.position,
      sortValue: (row) => row.position,
    },
  ]
}
