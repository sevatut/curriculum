'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { createUser, getActor, isAdmin } from '@/entities/user'
import { saveUserDetails } from '@/features/user/manage-user/api/save-user-details'
import type { UserFormState } from '@/features/user/manage-user/model/types'
import { newUserSchema } from '@/features/user/manage-user/model/user-form'
import {
  userFormError,
  userFormParseError,
} from '@/features/user/manage-user/model/user-form-error'
import { isEmailTakenError } from '@/shared/api/graphql-errors'
import { resolveLocale } from '@/shared/i18n/settings'
import { parseFormData } from '@/shared/validation'

export async function createUserAction(
  lng: string,
  _state: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  if (!isAdmin(await getActor())) return { error: userFormError.forbidden }

  const parsed = parseFormData(newUserSchema, formData)
  if (!parsed.success) return { error: userFormParseError(parsed.formError) }

  const { email, password, ...details } = parsed.data
  let userId: string

  try {
    userId = await createUser({ email, password, role: details.role })
  } catch (error) {
    unstable_rethrow(error)
    return {
      error: isEmailTakenError(error)
        ? userFormError.emailTaken
        : userFormError.generic,
    }
  }

  revalidatePath(`/${resolveLocale(lng)}/employees`, 'page')

  try {
    await saveUserDetails(userId, details)
  } catch (error) {
    unstable_rethrow(error)
    return { error: userFormError.detailsNotSaved }
  }

  return {}
}
