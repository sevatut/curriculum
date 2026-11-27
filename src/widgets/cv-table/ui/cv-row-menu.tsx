'use client'

import { EllipsisVertical } from 'lucide-react'
import { useT } from 'next-i18next/client'
import { useState } from 'react'

import { DeleteCvModal } from '@/features/cv/delete-cv'
import { UpdateCvModal } from '@/features/cv/update-cv'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import type { CvTableRow } from '@/widgets/cv-table/model/cv-table-row'

const actionClassName =
  'mr-6 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent'

type CvRowMenuProps = {
  row: CvTableRow
}

export function CvRowMenu({ row }: CvRowMenuProps) {
  const { t } = useT('cvs')
  const [dialog, setDialog] = useState<'update' | 'delete' | 'closed'>('closed')
  const openUpdate = () => setDialog('update')
  const openDelete = () => setDialog('delete')
  const closeDialog = () => setDialog('closed')

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label={t('menu.label')} className={actionClassName}>
          <EllipsisVertical className="size-4" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={openUpdate}>{t('menu.update')}</DropdownMenuItem>
          <DropdownMenuItem onClick={openDelete}>{t('menu.delete')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialog === 'update' && <UpdateCvModal cv={row} onClose={closeDialog} />}
      {dialog === 'delete' && (
        <DeleteCvModal cvId={row.id} cvName={row.name} onClose={closeDialog} />
      )}
    </>
  )
}
