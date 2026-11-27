import { notFound } from 'next/navigation'

import { getLanguages, getProfileLanguages } from '@/entities/language'
import { canEditProfile, getActor } from '@/entities/user'
import { EmployeeLanguages } from '@/widgets/employee-languages'

export default async function EmployeeLanguagesPage({
  params,
}: {
  params: Promise<{ lng: string; userId: string }>
}) {
  const { lng, userId } = await params
  const [languages, catalog, actor] = await Promise.all([
    getProfileLanguages(userId),
    getLanguages(),
    getActor(),
  ])

  if (!languages) notFound()

  return (
    <EmployeeLanguages
      lng={lng}
      userId={userId}
      languages={languages}
      catalog={catalog}
      editable={canEditProfile(actor, userId)}
    />
  )
}
