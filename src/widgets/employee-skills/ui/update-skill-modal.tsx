'use client'

import { useT } from 'next-i18next/client'
import { useState, useTransition } from 'react'

import { masteryLevels } from '@/entities/skill/model/skill'
import { Modal } from '@/shared/ui/modal/modal'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { updateEmployeeSkill } from '@/widgets/employee-skills/api/update-employee-skill'
import { errorKey } from '@/widgets/employee-skills/model/skill-error'
import type { SkillActionError } from '@/widgets/employee-skills/model/skill-form'
import type { UpdateSkillModalProps } from '@/widgets/employee-skills/ui/types'

export function UpdateSkillModal({
  lng,
  userId,
  skill,
  onClose,
}: UpdateSkillModalProps) {
  const { t } = useT('employees')
  const [mastery, setMastery] = useState<string>(skill.mastery)
  const [error, setError] = useState<SkillActionError>()
  const [pending, startTransition] = useTransition()

  const levelOptions = masteryLevels.map((level) => ({
    value: level,
    label: t(`skills.levels.${level}`),
  }))

  function onConfirm() {
    startTransition(async () => {
      const result = await updateEmployeeSkill(lng, userId, {
        name: skill.name,
        categoryId: skill.categoryId,
        mastery,
      })

      if (result.error) setError(result.error)
      else onClose()
    })
  }

  return (
    <Modal
      title={t('skills.modal.updateTitle')}
      confirmDisabled={pending || mastery === skill.mastery}
      onCancel={onClose}
      onConfirm={onConfirm}
      confirmText={t('modal.confirm')}
    >
      <div className="flex flex-col gap-6 pt-2">
        <SelectField
          name="skillId"
          label={t('skills.modal.skill')}
          options={[{ value: skill.id, label: skill.name }]}
          defaultValue={skill.id}
          allowEmpty={false}
          disabled
          className="max-w-none"
        />
        <SelectField
          name="mastery"
          label={t('skills.modal.level')}
          options={levelOptions}
          defaultValue={skill.mastery}
          allowEmpty={false}
          className="max-w-none"
          onValueChange={(value) => {
            setMastery(value)
            setError(undefined)
          }}
        />
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {t(errorKey[error])}
          </p>
        )}
      </div>
    </Modal>
  )
}
