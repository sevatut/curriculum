'use client'

import { useT } from 'next-i18next/client'

import {
  cvFormErrorKey,
  type CvFormError,
} from '@/features/cv/cv-form/model/cv-form-error'
import { Button } from '@/shared/ui/button'

type CvDetailsSubmitProps = {
  error?: CvFormError
  disabled: boolean
}

export function CvDetailsSubmit({ error, disabled }: CvDetailsSubmitProps) {
  const { t } = useT('cvs')

  return (
    <div className="flex flex-col items-end gap-2">
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {t(cvFormErrorKey[error])}
        </p>
      )}
      <Button type="submit" disabled={disabled} className="w-(--button-width-action)">
        {t('details.update')}
      </Button>
    </div>
  )
}
