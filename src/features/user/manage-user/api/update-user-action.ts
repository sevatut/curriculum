'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { getActor, isAdmin } from '@/entities/user'
import { saveUserDetails } from '@/features/user/manage-user/api/save-user-details'
import type { UserFormState } from '@/features/user/manage-user/model/types'
import { userDetailsSchema } from '@/features/user/manage-user/model/user-form'
import {
  userFormError,
  userFormParseError,
} from '@/features/user/manage-user/model/user-form-error'
import { syncSessionUserName } from '@/shared/api/session-store'
import { resolveLocale } from '@/shared/i18n/settings'
import { parseFormData } from '@/shared/validation'

export async function updateUserAction(
  lng: string,
  userId: string,
  _state: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  if (!isAdmin(await getActor())) return { error: userFormError.forbidden }

  const parsed = parseFormData(userDetailsSchema, formData)
  if (!parsed.success) return { error: userFormParseError(parsed.formError) }

  try {
    const fullName = await saveUserDetails(userId, parsed.data)
    await syncSessionUserName(userId, fullName)
  } catch (error) {
    unstable_rethrow(error)
    return { error: userFormError.generic }
  }

  const locale = resolveLocale(lng)
  revalidatePath(`/${locale}/employees`, 'page')
  revalidatePath(`/${locale}/employees/${userId}`, 'layout')
  return {}
}
