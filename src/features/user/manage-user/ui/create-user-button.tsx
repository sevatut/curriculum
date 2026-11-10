'use client'

import { useT } from 'next-i18next/client'
import { useState } from 'react'

import type { CreateUserButtonProps } from '@/features/user/manage-user/ui/types'
import { CreateUserModal } from '@/features/user/manage-user/ui/create-user-modal'
import { CreateButton } from '@/shared/ui/create-button'

export function CreateUserButton({
  departments,
  positions,
  className,
}: CreateUserButtonProps) {
  const { t } = useT('employees')
  const [open, setOpen] = useState(false)

  return (
    <>
      <CreateButton className={className} onClick={() => setOpen(true)}>
        {t('createUser.button')}
      </CreateButton>
      {open && (
        <CreateUserModal
          departments={departments}
          positions={positions}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
