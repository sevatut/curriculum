'use server'

import { revalidatePath } from 'next/cache'

import { canEditProfile, getActor, getUser, userDisplayName } from '@/entities/user'
import { readSession, writeSession } from '@/shared/api/session-store'
import type { Session } from '@/shared/api/session.types'
import { resolveLocale } from '@/shared/i18n/settings'
import { parseFormData } from '@/shared/validation'

import type { ProfileFormError } from '../model/profile-error'
import {
  isProfileChanged,
  profileSchema,
  profileValues,
} from '../model/profile-form-values'
import { applyProfileChanges } from './apply-profile-changes'

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
  const [session, actor] = await Promise.all([readSession(), getActor()])
  if (!canEditProfile(actor, userId)) return { error: 'forbidden' }

  const parsed = parseFormData(profileSchema, formData)
  if (!parsed.success) return { error: 'required' }

  const next = parsed.data

  const current = await getUser(userId)
  if (!current) return { error: 'generic' }

  const initial = profileValues(current)
  if (!isProfileChanged(next, initial)) return { savedAt: Date.now() }

  const saved = await applyProfileChanges(userId, next, initial)
  if ('error' in saved) return saved

  if (session?.user.id === userId) {
    await syncSessionName(session, saved.fullName ?? userDisplayName(current))
  }

  revalidateEmployee(lng, userId)
  return { savedAt: Date.now() }
}

async function syncSessionName(session: Session, fullName: string | null) {
  if (!fullName || fullName === session.user.name) return

  await writeSession({
    ...session,
    user: { ...session.user, name: fullName },
  })
}

function revalidateEmployee(lng: string, userId: string) {
  const locale = resolveLocale(lng)
  revalidatePath(`/${locale}/employees`, 'page')
  revalidatePath(`/${locale}/employees/${userId}`, 'layout')
}
