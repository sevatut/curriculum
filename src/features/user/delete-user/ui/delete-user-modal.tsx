'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'
import { useState, useTransition } from 'react'

import { deleteUserAction } from '@/features/user/delete-user/api/delete-user-action'
import { deleteUserErrorKey } from '@/features/user/delete-user/model/delete-user-error'
import type { DeleteUserError } from '@/features/user/delete-user/model/types'
import type { DeleteUserModalProps } from '@/features/user/delete-user/ui/types'
import { Modal } from '@/shared/ui/modal/modal'

export function DeleteUserModal({ userId, userName, onClose }: DeleteUserModalProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('employees')
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<DeleteUserError | null>(null)

  function onConfirm() {
    startTransition(async () => {
      const result = await deleteUserAction(lng, userId)
      if (result.error) {
        setError(result.error)
        return
      }
      onClose()
    })
  }

  return (
    <Modal
      title={t('deleteUser.title')}
      confirmText={t('deleteUser.submit')}
      confirmDisabled={pending}
      onCancel={onClose}
      onConfirm={onConfirm}
      className="w-full max-w-xl"
    >
      <p className="text-base text-foreground">
        {t('deleteUser.message', {
          name: userName,
          interpolation: { escapeValue: false },
        })}
      </p>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {t(deleteUserErrorKey[error])}
        </p>
      )}
    </Modal>
  )
}
