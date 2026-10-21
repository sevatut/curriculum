'use client'

import { useT } from 'next-i18next/client'
import { useActionState, useRef, useState, type SubmitEvent } from 'react'

import { Button } from '@/shared/ui/button'
import { SelectField } from '@/shared/ui/SelectField/SelectField'
import { TextField } from '@/shared/ui/TextField/TextField'

import { saveEmployeeProfile } from '../api/save-employee-profile'
import { errorKey } from '../model/profile-error'
import { isProfileChanged, readProfileForm } from '../model/profile-form-values'
import type { CatalogOption, EmployeeProfileFormProps } from './types'

function catalogOptions(items: readonly CatalogOption[]) {
  return items.map((item) => ({ value: item.id, label: item.name }))
}

export function EmployeeProfileForm({
  lng,
  userId,
  editable,
  values,
  departments,
  positions,
}: EmployeeProfileFormProps) {
  const { t } = useT('employees')
  const save = saveEmployeeProfile.bind(null, lng, userId)
  const [state, action, pending] = useActionState(save, {})
  const [editedAt, setEditedAt] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const dirty = editedAt > (state.savedAt ?? 0)

  function syncDirty(form: HTMLFormElement) {
    const changed = isProfileChanged(readProfileForm(new FormData(form)), values)
    setEditedAt(changed ? Date.now() : 0)
  }

  function onSelectChange() {
    if (formRef.current) syncDirty(formRef.current)
  }

  function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    if (!editable || !dirty) event.preventDefault()
  }

  const error = state.error ? t(errorKey[state.error]) : null

  return (
    <form
      ref={formRef}
      action={editable ? action : undefined}
      className="mt-10 grid w-full max-w-(--button-width-form-max) grid-cols-1 gap-9 md:max-w-2xl md:grid-cols-2 md:gap-x-8 md:gap-y-6"
      onInput={(event) => syncDirty(event.currentTarget)}
      onSubmit={onSubmit}
    >
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
        onValueChange={onSelectChange}
        className="max-w-none"
      />
      <SelectField
        name="positionId"
        label={t('profile.position')}
        defaultValue={values.positionId}
        disabled={!editable}
        options={catalogOptions(positions)}
        onValueChange={onSelectChange}
        className="max-w-none"
      />
      <div className="flex w-full flex-col gap-2 md:col-start-2 md:mt-4">
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button
          type="submit"
          disabled={!editable || pending || !dirty}
          className="w-full"
        >
          {t('profile.update')}
        </Button>
      </div>
    </form>
  )
}
