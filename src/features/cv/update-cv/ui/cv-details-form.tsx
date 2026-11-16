'use client'

import { useT } from 'next-i18next/client'
import { useActionState, useState } from 'react'

import {
  isCvDetailsChanged,
  readCvDetailsForm,
  type CvDetailsValues,
} from '@/features/cv/cv-form/model/cv-form'
import { cvFormErrorKey } from '@/features/cv/cv-form/model/cv-form-error'
import { CvFormFields } from '@/features/cv/cv-form/ui/cv-form-fields'
import { updateCvAction } from '@/features/cv/update-cv/api/update-cv-action'
import { Button } from '@/shared/ui/button'

type CvDetailsFormProps = {
  lng: string
  cvId: string
  editable: boolean
  values: CvDetailsValues
}

export function CvDetailsForm({ lng, cvId, editable, values }: CvDetailsFormProps) {
  const { t } = useT('cvs')
  const save = updateCvAction.bind(null, lng, cvId)
  const [state, action, pending] = useActionState(save, {})
  const [editedAt, setEditedAt] = useState(0)
  const dirty = editedAt > (state.savedAt ?? 0)

  function syncDirty(form: HTMLFormElement) {
    const current = readCvDetailsForm(new FormData(form))
    setEditedAt(isCvDetailsChanged(current, values) ? Date.now() : 0)
  }

  return (
    <form
      action={editable ? action : undefined}
      className="mx-auto flex w-full max-w-(--cv-details-width) flex-col gap-6 px-6 py-12 md:px-0"
      onInput={(event) => syncDirty(event.currentTarget)}
    >
      <CvFormFields values={values} disabled={!editable} />
      {editable && (
        <div className="flex flex-col items-end gap-2">
          {state.error && (
            <p role="alert" className="text-sm text-destructive">
              {t(cvFormErrorKey[state.error])}
            </p>
          )}
          <Button
            type="submit"
            disabled={!dirty || pending}
            className="w-(--button-width-action)"
          >
            {t('details.update')}
          </Button>
        </div>
      )}
    </form>
  )
}
