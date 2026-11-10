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
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <>
      <CreateButton className={className} onClick={openModal}>
        {t('createUser.button')}
      </CreateButton>
      {open && (
        <CreateUserModal
          departments={departments}
          positions={positions}
          onClose={closeModal}
        />
      )}
    </>
  )
}
