'use client'

import { useT } from 'next-i18next/client'
import { cn } from 'cn'

import type { CvTableColumnKey, CvTableRow } from '../model/cv-table-row'
import { CvTableItem } from './cv-table-item'

type CvTableProps = {
  rows: readonly CvTableRow[]
  className?: string
}

const columns: {
  key: CvTableColumnKey
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
  const { t } = useT('common')
  const actionsLabel = t('cv.actions')

  return (
    <table className={cn('w-full border-collapse', className)}>
      <caption className="sr-only">{t('nav.cvs')}</caption>
      <thead className="border-b border-border">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={cn('px-4 py-4 text-left text-sm', column.className)}
            >
              {t(column.labelKey)}
            </th>
          ))}
          <th scope="col" className="py-5">
            <span className="sr-only">{actionsLabel}</span>
          </th>
        </tr>
      </thead>
      {rows.map((row) => (
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
