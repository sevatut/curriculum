'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { createCvAction } from '@/features/cv/create-cv/api/create-cv-action'
import { CvFormFields } from '@/features/cv/cv-form/ui/cv-form-fields'
import { CvFormModal } from '@/features/cv/cv-form/ui/cv-form-modal'

type CreateCvModalProps = {
  onClose: () => void
}

export function CreateCvModal({ onClose }: CreateCvModalProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('cvs')

  return (
    <CvFormModal
      title={t('createCv.title')}
      confirmText={t('createCv.submit')}
      save={createCvAction.bind(null, lng)}
      onClose={onClose}
    >
      <CvFormFields />
    </CvFormModal>
  )
}
