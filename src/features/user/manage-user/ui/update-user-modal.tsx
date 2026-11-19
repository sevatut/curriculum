'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { updateUserAction } from '@/features/user/manage-user/api/update-user-action'
import type { UpdateUserModalProps } from '@/features/user/manage-user/ui/types'
import { userFieldClassName } from '@/features/user/manage-user/ui/user-form-classes'
import { UserFormFields } from '@/features/user/manage-user/ui/user-form-fields'
import { UserFormModal } from '@/features/user/manage-user/ui/user-form-modal'
import { TextField } from '@/shared/ui/text-field/text-field'

export function UpdateUserModal({
  user,
  departments,
  positions,
  onClose,
}: UpdateUserModalProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('employees')

  return (
    <UserFormModal
      title={t('updateUser.title')}
      confirmText={t('updateUser.submit')}
      save={updateUserAction.bind(null, lng, user.id)}
      onClose={onClose}
    >
      <TextField
        label={t('userForm.email')}
        aria-label={t('userForm.email')}
        defaultValue={user.email}
        disabled
        className={userFieldClassName}
      />
      <TextField
        type="password"
        label={t('userForm.password')}
        aria-label={t('userForm.password')}
        disabled
        className={userFieldClassName}
      />
      <UserFormFields values={user} departments={departments} positions={positions} />
    </UserFormModal>
  )
}
