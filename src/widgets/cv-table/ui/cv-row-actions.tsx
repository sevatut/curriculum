'use client'

import { canManageCv } from '@/entities/cv/model/access'
import type { Actor } from '@/entities/user/model/access'
import type { CvTableRow } from '@/widgets/cv-table/model/cv-table-row'
import { CvRowMenu } from '@/widgets/cv-table/ui/cv-row-menu'

type CvRowActionsProps = {
  row: CvTableRow
  actor: Actor | null
}

export function CvRowActions({ row, actor }: CvRowActionsProps) {
  if (!canManageCv(actor, row.userId)) return null

  return <CvRowMenu row={row} />
}
