'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { createUserAction } from '@/features/user/manage-user/api/create-user-action'
import { emptyUserDetails } from '@/features/user/manage-user/model/user-form'
import type { CreateUserModalProps } from '@/features/user/manage-user/ui/types'
import { userFieldClassName } from '@/features/user/manage-user/ui/user-form-classes'
import { UserFormFields } from '@/features/user/manage-user/ui/user-form-fields'
import { UserFormModal } from '@/features/user/manage-user/ui/user-form-modal'
import { PasswordInput } from '@/shared/ui/password-input/password-input'
import { TextField } from '@/shared/ui/text-field/text-field'

export function CreateUserModal({
  departments,
  positions,
  onClose,
}: CreateUserModalProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('employees')

  return (
    <UserFormModal
      title={t('createUser.title')}
      confirmText={t('createUser.submit')}
      save={createUserAction.bind(null, lng)}
      onClose={onClose}
    >
      <TextField
        name="email"
        type="email"
        label={t('userForm.email')}
        aria-label={t('userForm.email')}
        autoComplete="off"
        className={userFieldClassName}
      />
      <PasswordInput
        name="password"
        label={t('userForm.password')}
        aria-label={t('userForm.password')}
        autoComplete="new-password"
        className={userFieldClassName}
      />
      <UserFormFields
        values={emptyUserDetails}
        departments={departments}
        positions={positions}
      />
    </UserFormModal>
  )
}
