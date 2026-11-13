'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { canManageCv } from '@/entities/cv/model/access'
import type { Actor } from '@/entities/user/model/access'
import { DataTable } from '@/shared/ui/data-table'
import type { CvTableRow } from '@/widgets/cv-table/model/cv-table-row'
import { CvRowMenu } from '@/widgets/cv-table/ui/cv-row-menu'
import { getCvTableColumns } from '@/widgets/cv-table/ui/cv-table-columns'

type CvTableProps = {
  rows: readonly CvTableRow[]
  actor: Actor | null
  className?: string
}

export function CvTable({ rows, actor, className }: CvTableProps) {
  const { lng } = useParams<{ lng: string }>()
  const { i18n, t } = useT('cvs')
  const { t: tCommon } = useT('common')

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
      actionsLabel={t('actions')}
      renderActions={(row) =>
        canManageCv(actor, row.userId) ? <CvRowMenu row={row} /> : null
      }
      renderDetails={(row) => row.description}
    />
  )
}
