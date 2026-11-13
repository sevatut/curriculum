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

  return (
    <>
      <CreateButton className={className} onClick={() => setOpen(true)}>
        {t('create')}
      </CreateButton>
      {open && <CreateCvModal onClose={() => setOpen(false)} />}
    </>
  )
}
