'use client'

import { useT } from 'next-i18next/client'
import { useState } from 'react'

import { CreateCvModal } from '@/features/cv/create-cv/ui/create-cv-modal'
import { CreateButton } from '@/shared/ui/create-button'

type CreateCvButtonProps = {
  className?: string
}

export function CreateCvButton({ className }: CreateCvButtonProps) {
  const { t } = useT('cvs')
  const [open, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <>
      <CreateButton className={className} onClick={openModal}>
        {t('create')}
      </CreateButton>
      {open && <CreateCvModal onClose={closeModal} />}
    </>
  )
}
