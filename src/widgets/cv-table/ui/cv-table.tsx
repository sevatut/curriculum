'use client'

import { useMemo, useState } from 'react'
import { useT } from 'next-i18next/client'
import { cn } from 'cn'

import type { CvTableRow } from '../model/cv-table-row'
import {
  nextCvTableSort,
  sortCvTableRows,
  type CvTableSort,
  type CvTableSortKey,
} from '../model/sort-cv-table-rows'
import { CvTableColumnHeader } from './cv-table-column-header'
import { CvTableItem } from './cv-table-item'

type CvTableProps = {
  rows: readonly CvTableRow[]
  className?: string
}

const columns: {
  key: CvTableSortKey
  labelKey: 'cv.column.name' | 'cv.column.education' | 'cv.column.employee'
  className: string
}[] = [
  {
    key: 'name',
    labelKey: 'cv.column.name',
    className: 'w-[35%] max-[1100px]:w-[50%]',
  },
  {
    key: 'education',
    labelKey: 'cv.column.education',
    className: 'w-[28.2%] max-[1100px]:hidden',
  },
  {
    key: 'employee',
    labelKey: 'cv.column.employee',
    className: 'w-[31.3%] max-[1100px]:w-[45%]',
  },
]

export function CvTable({ rows, className }: CvTableProps) {
  const { i18n, t } = useT('common')
  const [sort, setSort] = useState<CvTableSort | null>(null)
  const actionsLabel = t('cv.actions')
  const sortedRows = useMemo(
    () => sortCvTableRows(rows, sort, i18n.language),
    [rows, sort, i18n.language],
  )

  function handleSort(key: CvTableSortKey) {
    setSort((current) => nextCvTableSort(current, key))
  }

  return (
    <table className={cn('w-full border-collapse', className)}>
      <caption className="sr-only">{t('nav.cvs')}</caption>
      <thead className="border-b border-border">
        <tr>
          {columns.map((column) => (
            <CvTableColumnHeader
              key={column.key}
              label={t(column.labelKey)}
              sortKey={column.key}
              className={column.className}
              direction={sort?.key === column.key ? sort.direction : null}
              onSort={handleSort}
            />
          ))}
          <th scope="col" className="py-5">
            <span className="sr-only">{actionsLabel}</span>
          </th>
        </tr>
      </thead>
      {sortedRows.map((row) => (
        <CvTableItem
          key={row.id}
          row={row}
          columns={columns}
          actionsLabel={actionsLabel}
        />
      ))}
    </table>
  )
}
