'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { DataTable } from '@/shared/ui/data-table'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'

import { filterEmployeeTableRows } from '../model/filter-employee-table-rows'
import { EmployeeTableActions } from './employee-table-actions'
import { getEmployeeTableColumns } from './employee-table-columns'
import type { EmployeeTableProps } from './types'

export function EmployeeTable({ rows, currentUserId }: EmployeeTableProps) {
  const { lng } = useParams<{ lng: string }>()
  const { i18n, t } = useT('employees')
  const { t: tCommon } = useT('common')
  const [query, setQuery] = useState('')
  const filteredRows = filterEmployeeTableRows(rows, query, i18n.language)
  const actionsLabel = t('actions')

  return (
    <div className="flex flex-1 flex-col tracking-basic">
      <div className="my-2 flex items-center justify-between gap-6">
        <SearchInput
          className="ml-5 max-w-[320px]"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={t('search')}
        />
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
        renderActions={(row) => (
          <EmployeeTableActions
            href={`/${lng}/employees/${row.id}/profile`}
            label={actionsLabel}
            own={row.id === currentUserId}
          />
        )}
      />
    </div>
  )
}
