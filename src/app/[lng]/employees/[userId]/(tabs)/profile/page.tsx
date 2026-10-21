import { notFound } from 'next/navigation'

import { getDepartments } from '@/entities/department'
import { getPositions } from '@/entities/position'
import { canEditProfile, getActor, getUser } from '@/entities/user'
import { EmployeeProfile } from '@/widgets/employee-profile'

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ lng: string; userId: string }>
}) {
  const { lng, userId } = await params
  const [user, departments, positions, actor] = await Promise.all([
    getUser(userId),
    getDepartments(),
    getPositions(),
    getActor(),
  ])

  if (!user) notFound()

  return (
    <EmployeeProfile
      lng={lng}
      user={user}
      editable={canEditProfile(actor, user.id)}
      departments={departments}
      positions={positions}
    />
  )
}
