import type { ReactNode } from 'react'

import type { UserFormState } from '@/features/user/manage-user/model/types'
import type { UserDetailsValues } from '@/features/user/manage-user/model/user-form'
import type { SelectOption } from '@/shared/ui/select-field/types'

export type UserCatalogs = {
  departments: readonly SelectOption[]
  positions: readonly SelectOption[]
}

export type UserFormFieldsProps = UserCatalogs & {
  values: UserDetailsValues
}

export type UserFormModalProps = {
  title: string
  confirmText: string
  save: (state: UserFormState, formData: FormData) => Promise<UserFormState>
  onClose: () => void
  children: ReactNode
}

export type UpdateUserModalProps = UserCatalogs & {
  user: UserDetailsValues & {
    id: string
    email: string
  }
  onClose: () => void
}

export type CreateUserModalProps = UserCatalogs & {
  onClose: () => void
}

export type CreateUserButtonProps = UserCatalogs & {
  className?: string
}
