'use client'

import { useT } from 'next-i18next/client'

import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/text-field/text-field'
import type {
  CatalogOption,
  ProfileFormFieldsProps,
} from '@/widgets/employee-profile/ui/types'

function catalogOptions(items: readonly CatalogOption[]) {
  return items.map((item) => ({ value: item.id, label: item.name }))
}

export function ProfileFormFields({
  values,
  editable,
  departments,
  positions,
  onSelectChange,
}: ProfileFormFieldsProps) {
  const { t } = useT('employees')

  return (
    <>
      <TextField
        name="firstName"
        label={t('profile.firstName')}
        aria-label={t('profile.firstName')}
        defaultValue={values.firstName}
        autoComplete="given-name"
        disabled={!editable}
        className="max-w-none"
      />
      <TextField
        name="lastName"
        label={t('profile.lastName')}
        aria-label={t('profile.lastName')}
        defaultValue={values.lastName}
        autoComplete="family-name"
        disabled={!editable}
        className="max-w-none"
      />
      <SelectField
        name="departmentId"
        label={t('profile.department')}
        defaultValue={values.departmentId}
        disabled={!editable}
        options={catalogOptions(departments)}
        onValueChange={(value) => onSelectChange('departmentId', value)}
        className="max-w-none"
      />
      <SelectField
        name="positionId"
        label={t('profile.position')}
        defaultValue={values.positionId}
        disabled={!editable}
        options={catalogOptions(positions)}
        onValueChange={(value) => onSelectChange('positionId', value)}
        className="max-w-none"
      />
    </>
  )
}
