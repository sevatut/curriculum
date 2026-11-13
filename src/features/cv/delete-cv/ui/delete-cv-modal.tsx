'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'
import { useState, useTransition } from 'react'

import { deleteCvAction } from '@/features/cv/delete-cv/api/delete-cv-action'
import {
  deleteCvErrorKey,
  type DeleteCvError,
} from '@/features/cv/delete-cv/model/delete-cv-error'
import type { DeleteCvModalProps } from '@/features/cv/delete-cv/ui/types'
import { Modal } from '@/shared/ui/modal/modal'

export function DeleteCvModal({ cvId, cvName, onClose }: DeleteCvModalProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('cvs')
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<DeleteCvError | null>(null)

  function onConfirm() {
    startTransition(async () => {
      const result = await deleteCvAction(lng, cvId)
      if (result.error) {
        setError(result.error)
        return
      }
      onClose()
    })
  }

  return (
    <Modal
      title={t('deleteCv.title')}
      confirmText={t('deleteCv.submit')}
      confirmDisabled={pending}
      onCancel={onClose}
      onConfirm={onConfirm}
      className="w-full max-w-xl"
    >
      <p className="text-base text-foreground">
        {t('deleteCv.message', {
          name: cvName,
          interpolation: { escapeValue: false },
        })}
      </p>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {t(deleteCvErrorKey[error])}
        </p>
      )}
    </Modal>
  )
}
