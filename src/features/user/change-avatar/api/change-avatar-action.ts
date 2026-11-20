'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { canEditProfile, deleteAvatar, getActor, uploadAvatar } from '@/entities/user'
import { avatarError } from '@/features/user/change-avatar/model/avatar-error'
import { isAvatarDataUrl } from '@/features/user/change-avatar/model/avatar-file'
import type { AvatarActionResult } from '@/features/user/change-avatar/model/types'
import { resolveLocale } from '@/shared/i18n/settings'
import { appRoutes } from '@/shared/routes'

export async function uploadAvatarAction(
  lng: string,
  userId: string,
  base64: string,
): Promise<AvatarActionResult> {
  if (!isAvatarDataUrl(base64)) return { error: avatarError.invalid }

  return runAvatarChange(lng, userId, () => uploadAvatar(userId, base64))
}

export async function deleteAvatarAction(
  lng: string,
  userId: string,
): Promise<AvatarActionResult> {
  return runAvatarChange(lng, userId, () => deleteAvatar(userId))
}

async function runAvatarChange(
  lng: string,
  userId: string,
  change: () => Promise<void>,
): Promise<AvatarActionResult> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: avatarError.forbidden }

  try {
    await change()
  } catch (error) {
    unstable_rethrow(error)
    return { error: avatarError.generic }
  }

  revalidateAvatar(lng, userId)
  return {}
}

function revalidateAvatar(lng: string, userId: string) {
  const locale = resolveLocale(lng)
  revalidatePath(appRoutes.home(locale), 'layout')
  revalidatePath(appRoutes.employees.list(locale), 'page')
  revalidatePath(appRoutes.employees.item(locale, userId), 'layout')
}
