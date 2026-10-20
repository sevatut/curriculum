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
  const { i18n, t } = useT('cvs')
  const { t: tCommon } = useT('common')
  const actionsLabel = t('actions')

  return (
    <DataTable
      columns={getCvTableColumns(lng, {
        name: t('column.name'),
        education: t('column.education'),
        employee: t('column.employee'),
      })}
      rows={rows}
      caption={tCommon('nav.cvs')}
      emptyLabel={t('empty')}
      locale={i18n.language}
      className={className}
      actionsLabel={actionsLabel}
      renderActions={() => <CvTableActions label={actionsLabel} />}
      renderDetails={(row) => row.description}
    />
  )
}
