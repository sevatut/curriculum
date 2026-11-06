'use client'

import { useT } from 'next-i18next/client'

import { userRoles } from '@/entities/user/model/user'
import type { UserFormFieldsProps } from '@/features/user/manage-user/ui/types'
import { userFieldClassName } from '@/features/user/manage-user/ui/user-form-classes'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/text-field/text-field'

export function UserFormFields({
  values,
  departments,
  positions,
}: UserFormFieldsProps) {
  const { t } = useT('employees')
  const roleOptions = userRoles.map((role) => ({
    value: role,
    label: t(`role.${role}`),
  }))

  return (
    <>
      <TextField
        name="firstName"
        label={t('profile.firstName')}
        aria-label={t('profile.firstName')}
        defaultValue={values.firstName}
        autoComplete="off"
        className={userFieldClassName}
      />
      <TextField
        name="lastName"
        label={t('profile.lastName')}
        aria-label={t('profile.lastName')}
        defaultValue={values.lastName}
        autoComplete="off"
        className={userFieldClassName}
      />
      <SelectField
        name="departmentId"
        label={t('profile.department')}
        defaultValue={values.departmentId}
        options={departments}
        className={userFieldClassName}
      />
      <SelectField
        name="positionId"
        label={t('profile.position')}
        defaultValue={values.positionId}
        options={positions}
        className={userFieldClassName}
      />
      <SelectField
        name="role"
        label={t('userForm.role')}
        defaultValue={values.role}
        options={roleOptions}
        allowEmpty={false}
        className={userFieldClassName}
      />
    </>
  )
}
