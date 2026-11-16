'use client'

import { useT } from 'next-i18next/client'

import type { CvDetailsValues } from '@/features/cv/cv-form/model/cv-form'
import { TextField } from '@/shared/ui/text-field/text-field'

const fieldClassName = 'max-w-none'

type CvFormFieldsProps = {
  values?: CvDetailsValues
  disabled?: boolean
}

export function CvFormFields({ values, disabled = false }: CvFormFieldsProps) {
  const { t } = useT('cvs')

  return (
    <>
      <TextField
        name="name"
        label={t('column.name')}
        aria-label={t('column.name')}
        defaultValue={values?.name}
        required
        disabled={disabled}
        className={fieldClassName}
      />
      <TextField
        name="education"
        label={t('column.education')}
        aria-label={t('column.education')}
        defaultValue={values?.education}
        disabled={disabled}
        className={fieldClassName}
      />
      <TextField
        name="description"
        label={t('cvForm.description')}
        aria-label={t('cvForm.description')}
        defaultValue={values?.description}
        disabled={disabled}
        multiline
        rows={5}
        className={fieldClassName}
      />
    </>
  )
}
