'use client'

import { useT } from 'next-i18next/client'

import type { CvDetailsValues } from '@/features/cv/cv-form/model/cv-form'
import { TextField } from '@/shared/ui/text-field/text-field'

const fieldClassName = 'max-w-none'

type CvFormFieldsProps = {
  values?: CvDetailsValues
  disabled?: boolean
  descriptionRows?: number
}

export function CvFormFields({
  values,
  disabled = false,
  descriptionRows,
}: CvFormFieldsProps) {
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
      {descriptionRows ? (
        <div
          className={`${fieldClassName} relative flex w-full border border-input-border px-3 pt-3 pb-2 transition-colors duration-300 focus-within:border-focus`}
        >
          <textarea
            name="description"
            aria-label={t('cvForm.description')}
            defaultValue={values?.description}
            disabled={disabled}
            rows={descriptionRows}
            placeholder=" "
            className="peer w-full resize-y bg-transparent text-lg text-input-text outline-none placeholder:text-transparent disabled:opacity-70"
          />
          <label className="pointer-events-none absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-sm text-placeholder transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-focus">
            {t('cvForm.description')}
          </label>
        </div>
      ) : (
        <TextField
          name="description"
          label={t('cvForm.description')}
          aria-label={t('cvForm.description')}
          defaultValue={values?.description}
          disabled={disabled}
          className={fieldClassName}
        />
      )}
    </>
  )
}
