import { notFound } from 'next/navigation'

import { canManageCv, getCv } from '@/entities/cv'
import { getActor } from '@/entities/user'
import { CvDetailsForm } from '@/features/cv/update-cv'

export default async function CvDetailsPage({
  params,
}: {
  params: Promise<{ lng: string; cvId: string }>
}) {
  const { lng, cvId } = await params
  const [cv, actor] = await Promise.all([getCv(cvId), getActor()])

  if (!cv) notFound()

  return (
    <CvDetailsForm
      key={`${cv.name}\0${cv.education ?? ''}\0${cv.description ?? ''}`}
      lng={lng}
      cvId={cv.id}
      editable={canManageCv(actor, cv.user.id)}
      values={{
        name: cv.name,
        education: cv.education ?? '',
        description: cv.description ?? '',
      }}
    />
  )
}
