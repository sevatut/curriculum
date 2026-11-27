'use client'

import { useT } from 'next-i18next/client'
import { useState, useTransition } from 'react'

import type { Proficiency } from '@/entities/language/model/proficiency'
import { proficiencyLevels } from '@/entities/language/model/proficiency'
import { Modal } from '@/shared/ui/modal/modal'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { addEmployeeLanguage } from '@/widgets/employee-languages/api/add-employee-language'
import { errorKey } from '@/widgets/employee-languages/model/language-error'
import type { LanguageActionError } from '@/widgets/employee-languages/model/language-form'
import type { AddLanguageModalProps } from '@/widgets/employee-languages/ui/types'

const defaultProficiency: Proficiency = 'A1'

export function AddLanguageModal({
  lng,
  userId,
  available,
  onClose,
}: AddLanguageModalProps) {
  const { t } = useT('employees')
  const [languageId, setLanguageId] = useState('')
  const [proficiency, setProficiency] = useState<Proficiency>(defaultProficiency)
  const [error, setError] = useState<LanguageActionError>()
  const [pending, startTransition] = useTransition()

  const languageOptions = available.map((item) => ({
    value: item.id,
    label: item.name,
  }))

  const levelOptions = proficiencyLevels.map((level) => ({
    value: level,
    label: t(`languages.levels.${level}`),
  }))

  function onLanguageChange(value: string) {
    setLanguageId(value)
    setError(undefined)
  }

  function onProficiencyChange(value: Proficiency) {
    setProficiency(value)
    setError(undefined)
  }

  function onConfirm() {
    const selected = available.find((item) => item.id === languageId)
    if (!selected) return

    const formData = new FormData()
    formData.set('name', selected.name)
    formData.set('proficiency', proficiency)

    startTransition(async () => {
      const result = await addEmployeeLanguage(lng, userId, {}, formData)

      if (result.error) setError(result.error)
      else onClose()
    })
  }

  return (
    <Modal
      title={t('languages.modal.title')}
      confirmText={t('languages.modal.confirm')}
      confirmDisabled={pending || !languageId}
      onCancel={onClose}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-6 pt-2">
        <SelectField
          name="languageId"
          label={t('languages.modal.language')}
          options={languageOptions}
          allowEmpty={false}
          className="max-w-none"
          onValueChange={onLanguageChange}
        />
        <SelectField
          name="proficiency"
          label={t('languages.modal.level')}
          options={levelOptions}
          defaultValue={defaultProficiency}
          allowEmpty={false}
          className="max-w-none"
          onValueChange={onProficiencyChange}
        />
        <ActionError error={error} />
      </div>
    </Modal>
  )
}

function ActionError({ error }: { error?: LanguageActionError }) {
  const { t } = useT('employees')
  if (!error) return null

  return (
    <p role="alert" className="text-sm text-destructive">
      {t(errorKey[error])}
    </p>
  )
}
