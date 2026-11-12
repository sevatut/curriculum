'use client'

import { useT } from 'next-i18next/client'
import { useActionState, useRef } from 'react'

import type { UserFormState } from '@/features/user/manage-user/model/types'
import { userFormErrorKey } from '@/features/user/manage-user/model/user-form-error'
import type { UserFormModalProps } from '@/features/user/manage-user/ui/types'
import { Modal } from '@/shared/ui/modal/modal'

export function UserFormModal({
  title,
  confirmText,
  save,
  onClose,
  children,
}: UserFormModalProps) {
  const { t } = useT('employees')
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, pending] = useActionState(
    async (previous: UserFormState, formData: FormData) => {
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
      <form
        ref={formRef}
        action={action}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8"
      >
        {children}
        {state.error && (
          <p role="alert" className="text-sm text-destructive md:col-span-2">
            {t(userFormErrorKey[state.error])}
          </p>
        )}
      </form>
    </Modal>
  )
}
