'use client'

import { useT } from 'next-i18next/client'
import { useState, useTransition } from 'react'

import type { Proficiency } from '@/entities/language/model/proficiency'
import { proficiencyLevels } from '@/entities/language/model/proficiency'
import { Modal } from '@/shared/ui/modal/modal'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { updateEmployeeLanguage } from '@/widgets/employee-languages/api/update-employee-language'
import { errorKey } from '@/widgets/employee-languages/model/language-error'
import type { LanguageActionError } from '@/widgets/employee-languages/model/language-form'
import type { UpdateLanguageModalProps } from '@/widgets/employee-languages/ui/types'

export function UpdateLanguageModal({
  lng,
  userId,
  language,
  onClose,
}: UpdateLanguageModalProps) {
  const { t } = useT('employees')
  const [proficiency, setProficiency] = useState<Proficiency>(language.proficiency)
  const [error, setError] = useState<LanguageActionError>()
  const [pending, startTransition] = useTransition()

  const levelOptions = proficiencyLevels.map((level) => ({
    value: level,
    label: t(`languages.levels.${level}`),
  }))

  function onProficiencyChange(value: Proficiency) {
    setProficiency(value)
    setError(undefined)
  }

  function onConfirm() {
    startTransition(async () => {
      const result = await updateEmployeeLanguage(lng, userId, {
        name: language.name,
        proficiency,
      })

      if (result.error) setError(result.error)
      else onClose()
    })
  }

  return (
    <Modal
      title={t('languages.modal.updateTitle')}
      confirmText={t('languages.modal.confirm')}
      confirmDisabled={pending || proficiency === language.proficiency}
      onCancel={onClose}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-6 pt-2">
        <SelectField
          name="languageId"
          label={t('languages.modal.language')}
          options={[{ value: language.id, label: language.name }]}
          defaultValue={language.id}
          allowEmpty={false}
          disabled
          className="max-w-none"
        />
        <SelectField
          name="proficiency"
          label={t('languages.modal.level')}
          options={levelOptions}
          defaultValue={language.proficiency}
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
