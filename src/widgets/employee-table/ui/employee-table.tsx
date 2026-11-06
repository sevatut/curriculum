'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { canDeleteUser, isAdmin } from '@/entities/user/model/access'
import { CreateUserButton } from '@/features/user/manage-user'
import { DataTable } from '@/shared/ui/data-table'
import { SearchInput } from '@/shared/ui/search-input/search-input'
import { filterEmployeeTableRows } from '@/widgets/employee-table/model/filter-employee-table-rows'
import { EmployeeAdminMenu } from '@/widgets/employee-table/ui/employee-admin-menu'
import { EmployeeProfileLink } from '@/widgets/employee-table/ui/employee-profile-link'
import { getEmployeeTableColumns } from '@/widgets/employee-table/ui/employee-table-columns'
import type { EmployeeTableProps } from '@/widgets/employee-table/ui/types'

export function EmployeeTable({
  rows,
  actor,
  departments,
  positions,
}: EmployeeTableProps) {
  const { lng } = useParams<{ lng: string }>()
  const { i18n, t } = useT('employees')
  const { t: tCommon } = useT('common')
  const [query, setQuery] = useState('')
  const filteredRows = filterEmployeeTableRows(rows, query, i18n.language)
  const actionsLabel = t('actions')
  const admin = isAdmin(actor)

  return (
    <div className="flex flex-1 flex-col tracking-basic">
      <div className="my-2 flex items-center justify-between gap-6">
        <SearchInput
          className="ml-5 max-w-[320px]"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={t('search')}
        />
        {admin ? (
          <CreateUserButton
            className="mr-6"
            departments={departments}
            positions={positions}
          />
        ) : null}
      </div>
      <DataTable
        columns={getEmployeeTableColumns(lng, {
          firstName: t('column.firstName'),
          lastName: t('column.lastName'),
          email: t('column.email'),
          department: t('column.department'),
          position: t('column.position'),
        })}
        rows={filteredRows}
        caption={tCommon('nav.employees')}
        emptyLabel={t('empty')}
        locale={i18n.language}
        actionsLabel={actionsLabel}
        renderActions={(row) =>
          admin ? (
            <EmployeeAdminMenu
              row={row}
              deletable={canDeleteUser(actor, row.id)}
              departments={departments}
              positions={positions}
            />
          ) : (
            <EmployeeProfileLink
              href={`/${lng}/employees/${row.id}/profile`}
              label={actionsLabel}
            />
          )
        }
      />
    </div>
  )
}
