'use server'

import { revalidatePath } from 'next/cache'

import { canEditProfile, getActor, getUser, userDisplayName } from '@/entities/user'
import { syncSessionUserName } from '@/shared/api/session-store'
import { resolveLocale } from '@/shared/i18n/settings'
import { appRoutes } from '@/shared/routes'
import { parseFormData } from '@/shared/validation'
import {
  profileFormError,
  type ProfileFormError,
} from '@/widgets/employee-profile/model/profile-error'
import {
  isProfileChanged,
  profileSchema,
  profileValues,
} from '@/widgets/employee-profile/model/profile-form-values'
import { applyProfileChanges } from '@/widgets/employee-profile/api/apply-profile-changes'

type SaveEmployeeProfileState = {
  error?: ProfileFormError
  savedAt?: number
}

export async function saveEmployeeProfile(
  lng: string,
  userId: string,
  _state: SaveEmployeeProfileState,
  formData: FormData,
): Promise<SaveEmployeeProfileState> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: profileFormError.forbidden }

  const parsed = parseFormData(profileSchema, formData)
  if (!parsed.success) return { error: profileFormError.required }

  const next = parsed.data

  const current = await getUser(userId)
  if (!current) return { error: profileFormError.generic }

  const initial = profileValues(current)
  if (!isProfileChanged(next, initial)) return { savedAt: Date.now() }

  const saved = await applyProfileChanges(userId, next, initial)
  if ('error' in saved) return saved

  await syncSessionUserName(userId, saved.fullName ?? userDisplayName(current))

  revalidateEmployee(lng, userId)
  return { savedAt: Date.now() }
}

function revalidateEmployee(lng: string, userId: string) {
  const locale = resolveLocale(lng)
  revalidatePath(appRoutes.employees.list(locale), 'page')
  revalidatePath(appRoutes.employees.item(locale, userId), 'layout')
}
