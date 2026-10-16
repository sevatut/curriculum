'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { DataTable } from '@/shared/ui/data-table'

import type { CvTableRow } from '../model/cv-table-row'
import { CvTableActions } from './cv-table-actions'
import { getCvTableColumns } from './cv-table-columns'

type CvTableProps = {
  rows: readonly CvTableRow[]
  className?: string
}

export function CvTable({ rows, className }: CvTableProps) {
  const { lng } = useParams<{ lng: string }>()
  const { i18n, t } = useT('common')
  const actionsLabel = t('cv.actions')

  return (
    <DataTable
      columns={getCvTableColumns(lng, {
        name: t('cv.column.name'),
        education: t('cv.column.education'),
        employee: t('cv.column.employee'),
      })}
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
