import { redirect } from 'next/navigation'

import { appRoutes } from '@/shared/routes'

export default async function CvPage({
  params,
}: {
  params: Promise<{ lng: string; cvId: string }>
}) {
  const { lng, cvId } = await params
  redirect(appRoutes.cvs.details(lng, cvId))
}
