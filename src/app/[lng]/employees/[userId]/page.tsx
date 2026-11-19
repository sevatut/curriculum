import { redirect } from 'next/navigation'

import { appRoutes } from '@/shared/routes'

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ lng: string; userId: string }>
}) {
  const { lng, userId } = await params
  redirect(appRoutes.employees.profile(lng, userId))
}
