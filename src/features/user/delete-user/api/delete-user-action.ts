'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { canDeleteUser, deleteUser, getActor } from '@/entities/user'
import type { DeleteUserResult } from '@/features/user/delete-user/model/types'
import { resolveLocale } from '@/shared/i18n/settings'

export async function deleteUserAction(
  lng: string,
  userId: string,
): Promise<DeleteUserResult> {
  if (!canDeleteUser(await getActor(), userId)) return { error: 'forbidden' }

  try {
    await deleteUser(userId)
  } catch (error) {
    unstable_rethrow(error)
    return { error: 'generic' }
  }

  revalidatePath(`/${resolveLocale(lng)}/employees`, 'page')
  return {}
}
