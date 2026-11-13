'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { canManageCv, deleteCv, getCv } from '@/entities/cv'
import { getActor } from '@/entities/user'
import { deleteCvError } from '@/features/cv/delete-cv/model/delete-cv-error'
import type { DeleteCvResult } from '@/features/cv/delete-cv/model/types'
import { resolveLocale } from '@/shared/i18n/settings'
import { appRoutes } from '@/shared/routes'

export async function deleteCvAction(
  lng: string,
  cvId: string,
): Promise<DeleteCvResult> {
  const cv = await getCv(cvId)
  if (!cv || !canManageCv(await getActor(), cv.user.id)) {
    return { error: deleteCvError.forbidden }
  }

  try {
    await deleteCv(cvId)
  } catch (error) {
    unstable_rethrow(error)
    return { error: deleteCvError.generic }
  }

  revalidatePath(appRoutes.cvs.list(resolveLocale(lng)), 'page')
  return {}
}
