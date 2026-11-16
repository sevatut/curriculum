import { notFound } from 'next/navigation'

import { getProfileSkills, getSkillCategories, getSkills } from '@/entities/skill'
import { canEditProfile, getActor } from '@/entities/user'
import { EmployeeSkills } from '@/widgets/employee-skills'

export default async function EmployeeSkillsPage({
  params,
}: {
  params: Promise<{ lng: string; userId: string }>
}) {
  const { lng, userId } = await params
  const [skills, categories, catalog, actor] = await Promise.all([
    getProfileSkills(userId),
    getSkillCategories(),
    getSkills(),
    getActor(),
  ])

  if (!skills) notFound()

  return (
    <EmployeeSkills
      lng={lng}
      userId={userId}
      skills={skills}
      categories={categories}
      catalog={catalog}
      editable={canEditProfile(actor, userId)}
    />
  )
}
