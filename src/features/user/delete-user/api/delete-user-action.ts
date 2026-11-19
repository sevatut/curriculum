'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { canDeleteUser, deleteUser, getActor } from '@/entities/user'
import { deleteUserError } from '@/features/user/delete-user/model/delete-user-error'
import type { DeleteUserResult } from '@/features/user/delete-user/model/types'
import { resolveLocale } from '@/shared/i18n/settings'
import { appRoutes } from '@/shared/routes'

export async function deleteUserAction(
  lng: string,
  userId: string,
): Promise<DeleteUserResult> {
  if (!canDeleteUser(await getActor(), userId))
    return { error: deleteUserError.forbidden }

  try {
    await deleteUser(userId)
  } catch (error) {
    unstable_rethrow(error)
    return { error: deleteUserError.generic }
  }

  revalidatePath(appRoutes.employees.list(resolveLocale(lng)), 'page')
  return {}
}
