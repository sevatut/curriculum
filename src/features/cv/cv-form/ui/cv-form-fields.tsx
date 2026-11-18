'use client'

import { useT } from 'next-i18next/client'

import type { CvFormFieldsProps } from '@/features/cv/cv-form/ui/types'
import { TextField } from '@/shared/ui/text-field/text-field'

const fieldClassName = 'max-w-none'

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
