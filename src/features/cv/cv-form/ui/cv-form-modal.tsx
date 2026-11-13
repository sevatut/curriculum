'use client'

import { useT } from 'next-i18next/client'
import { useActionState, useRef, type ReactNode } from 'react'

import { cvFormErrorKey } from '@/features/cv/cv-form/model/cv-form-error'
import type { CvFormState } from '@/features/cv/cv-form/model/cv-form-error'
import { Modal } from '@/shared/ui/modal/modal'

type CvFormModalProps = {
  title: string
  confirmText: string
  save: (state: CvFormState, formData: FormData) => Promise<CvFormState>
  onClose: () => void
  children: ReactNode
}

export function CvFormModal({
  title,
  confirmText,
  save,
  onClose,
  children,
}: CvFormModalProps) {
  const { t } = useT('cvs')
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, pending] = useActionState(
    async (previous: CvFormState, formData: FormData) => {
      const next = await save(previous, formData)
      if (!next.error) onClose()
      return next
    },
    {},
  )

  return (
    <Modal
      title={title}
      confirmText={confirmText}
      confirmDisabled={pending}
      onCancel={onClose}
      onConfirm={() => formRef.current?.requestSubmit()}
      className="w-full max-w-2xl"
    >
      <form ref={formRef} action={action} className="flex flex-col gap-6">
        {children}
        {state.error && (
          <p role="alert" className="text-sm text-destructive">
            {t(cvFormErrorKey[state.error])}
          </p>
        )}
      </form>
    </Modal>
  )
}
