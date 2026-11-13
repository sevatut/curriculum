'use client'

import { useParams } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { CvFormFields } from '@/features/cv/cv-form/ui/cv-form-fields'
import { CvFormModal } from '@/features/cv/cv-form/ui/cv-form-modal'
import { updateCvAction } from '@/features/cv/update-cv/api/update-cv-action'

type UpdateCvModalProps = {
  cv: {
    id: string
    name: string
    education: string
    description: string
  }
  onClose: () => void
}

export function UpdateCvModal({ cv, onClose }: UpdateCvModalProps) {
  const { lng } = useParams<{ lng: string }>()
  const { t } = useT('cvs')

  return (
    <CvFormModal
      title={t('updateCv.title')}
      confirmText={t('updateCv.submit')}
      save={updateCvAction.bind(null, lng, cv.id)}
      onClose={onClose}
    >
      <CvFormFields values={cv} />
    </CvFormModal>
  )
}
