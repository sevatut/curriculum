'use client'

import { useActionState, useState, type InputEvent } from 'react'

import {
  isCvDetailsChanged,
  readCvDetailsForm,
  type CvDetailsValues,
} from '@/features/cv/cv-form/model/cv-form'
import { CvFormFields } from '@/features/cv/cv-form/ui/cv-form-fields'
import { updateCvAction } from '@/features/cv/update-cv/api/update-cv-action'
import { CvDetailsSubmit } from '@/features/cv/update-cv/ui/cv-details-submit'

type CvDetailsFormProps = {
  lng: string
  cvId: string
  editable: boolean
  values: CvDetailsValues
}

export function CvDetailsForm({ lng, cvId, editable, values }: CvDetailsFormProps) {
  const save = updateCvAction.bind(null, lng, cvId)
  const [state, action, pending] = useActionState(save, {})
  const [editedAt, setEditedAt] = useState(0)
  const dirty = editedAt > (state.savedAt ?? 0)

  function syncDirty(event: InputEvent<HTMLFormElement>) {
    const current = readCvDetailsForm(new FormData(event.currentTarget))
    setEditedAt(isCvDetailsChanged(current, values) ? Date.now() : 0)
  }

  return (
    <form
      action={editable ? action : undefined}
      className="mx-auto flex w-full max-w-(--cv-details-width) flex-col gap-6 px-6 py-12 md:px-0"
      onInput={syncDirty}
    >
      <CvFormFields values={values} disabled={!editable} />
      {editable && <CvDetailsSubmit error={state.error} disabled={!dirty || pending} />}
    </form>
  )
}
