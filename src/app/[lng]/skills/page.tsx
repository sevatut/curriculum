import { notFound, redirect } from 'next/navigation'

import { getProfileSkills, getSkillCategories, getSkills } from '@/entities/skill'
import { getActor } from '@/entities/user'
import { authLogoutPath } from '@/shared/api/session'
import { EmployeeSkills } from '@/widgets/employee-skills'

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params
  const actor = await getActor()

  if (!actor) redirect(authLogoutPath(lng))

  const [skills, categories, catalog] = await Promise.all([
    getProfileSkills(actor.id),
    getSkillCategories(),
    getSkills(),
  ])

  if (!skills) notFound()

  return (
    <EmployeeSkills
      lng={lng}
      userId={actor.id}
      skills={skills}
      categories={categories}
      catalog={catalog}
      editable
    />
  )
}
