'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { DataTable, type DataTableColumn } from '@/shared/ui/data-table'

import type { CvTableRow } from '../model/cv-table-row'
import { CvTableActions } from './cv-table-actions'

type CvTableProps = {
  rows: readonly CvTableRow[]
  className?: string
}

export function CvTable({ rows, className }: CvTableProps) {
  const { lng } = useParams<{ lng: string }>()
  const { i18n, t } = useT('common')
  const actionsLabel = t('cv.actions')
  const columns: DataTableColumn<CvTableRow>[] = [
    {
      id: 'name',
      label: t('cv.column.name'),
      className: 'w-[35%] max-[1100px]:w-[50%]',
      cell: (row) => (
        <Link href={`/${lng}/cvs/${row.id}/details`} className="hover:text-primary">
          {row.name}
        </Link>
      ),
      sortValue: (row) => row.name,
    },
    {
      id: 'education',
      label: t('cv.column.education'),
      className: 'w-[28.2%] max-[1100px]:hidden',
      cell: (row) => row.education,
      sortValue: (row) => row.education,
    },
    {
      id: 'employee',
      label: t('cv.column.employee'),
      className: 'w-[31.3%] max-[1100px]:w-[45%]',
      cell: (row) => row.employee,
      sortValue: (row) => row.employee,
    },
  ]

  return (
    <DataTable
      columns={columns}
      rows={rows}
      caption={t('nav.cvs')}
      emptyLabel={t('cv.empty')}
      locale={i18n.language}
      className={className}
      actionsLabel={actionsLabel}
      renderActions={() => <CvTableActions label={actionsLabel} />}
      renderDetails={(row) => row.description}
    />
  )
}
