'use client'

import { useT } from 'next-i18next/client'
import { useState, useTransition } from 'react'

import { masteryLevels } from '@/entities/skill/model/mastery'
import { Modal } from '@/shared/ui/modal/modal'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { addEmployeeSkill } from '@/widgets/employee-skills/api/add-employee-skill'
import { errorKey } from '@/widgets/employee-skills/model/skill-error'
import type { SkillActionError } from '@/widgets/employee-skills/model/skill-form'
import type { AddSkillModalProps } from '@/widgets/employee-skills/ui/types'

export function AddSkillModal({ lng, userId, available, onClose }: AddSkillModalProps) {
  const { t } = useT('employees')
  const [skillId, setSkillId] = useState('')
  const [mastery, setMastery] = useState('Novice')
  const [error, setError] = useState<SkillActionError>()
  const [pending, startTransition] = useTransition()

  const skillOptions = available.map((skill) => ({
    value: skill.id,
    label: skill.name,
  }))

  const levelOptions = masteryLevels.map((level) => ({
    value: level,
    label: t(`skills.levels.${level}`),
  }))

  function onConfirm() {
    const skill = available.find((item) => item.id === skillId)
    if (!skill) return

    const formData = new FormData()
    formData.set('name', skill.name)
    formData.set('categoryId', skill.category.id)
    formData.set('mastery', mastery)

    startTransition(async () => {
      const result = await addEmployeeSkill(lng, userId, {}, formData)

      if (result.error) setError(result.error)
      else onClose()
    })
  }

  return (
    <Modal
      title={t('skills.modal.title')}
      confirmText={t('skills.modal.confirm')}
      confirmDisabled={pending || !skillId}
      onCancel={onClose}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-6 pt-2">
        <SelectField
          name="skillId"
          label={t('skills.modal.skill')}
          options={skillOptions}
          allowEmpty={false}
          className="max-w-none"
          onValueChange={(value) => {
            setSkillId(value)
            setError(undefined)
          }}
        />
        <SelectField
          name="mastery"
          label={t('skills.modal.level')}
          options={levelOptions}
          defaultValue="Novice"
          allowEmpty={false}
          className="max-w-none"
          onValueChange={setMastery}
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
