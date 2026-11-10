'use client'

import { EllipsisVertical } from 'lucide-react'
import { useT } from 'next-i18next/client'
import { useState } from 'react'

import { DeleteUserModal } from '@/features/user/delete-user'
import { UpdateUserModal } from '@/features/user/manage-user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { actionClassName } from '@/widgets/employee-table/ui/employee-table-action-classes'
import type { EmployeeAdminMenuProps } from '@/widgets/employee-table/ui/types'

export function EmployeeAdminMenu({
  row,
  deletable,
  departments,
  positions,
}: EmployeeAdminMenuProps) {
  const { t } = useT('employees')
  const [dialog, setDialog] = useState<'update' | 'delete' | null>(null)
  const closeDialog = () => setDialog(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label={t('menu.label')} className={actionClassName}>
          <EllipsisVertical className="size-4" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setDialog('update')}>
            {t('menu.update')}
          </DropdownMenuItem>
          {deletable && (
            <DropdownMenuItem onClick={() => setDialog('delete')}>
              {t('menu.delete')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {dialog === 'update' && (
        <UpdateUserModal
          user={row}
          departments={departments}
          positions={positions}
          onClose={closeDialog}
        />
      )}
      {dialog === 'delete' && (
        <DeleteUserModal
          userId={row.id}
          userName={row.displayName}
          onClose={closeDialog}
        />
      )}
    </>
  )
}
