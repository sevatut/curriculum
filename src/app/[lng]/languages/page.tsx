import { notFound, redirect } from 'next/navigation'

import { getLanguages, getProfileLanguages } from '@/entities/language'
import { getActor } from '@/entities/user'
import { appRoutes } from '@/shared/routes/routes'
import { EmployeeLanguages } from '@/widgets/employee-languages'

export default async function LanguagesPage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params
  const actor = await getActor()

  if (!actor) redirect(appRoutes.auth.logout(lng))

  const [languages, catalog] = await Promise.all([
    getProfileLanguages(actor.id),
    getLanguages(),
  ])

  if (!languages) notFound()

  return (
    <EmployeeLanguages
      lng={lng}
      userId={actor.id}
      languages={languages}
      catalog={catalog}
      editable
    />
  )
}
