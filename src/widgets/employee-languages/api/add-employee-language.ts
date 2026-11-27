'use server'

import { unstable_rethrow } from 'next/navigation'

import { addProfileLanguage, getProfileLanguages } from '@/entities/language'
import { canEditProfile, getActor } from '@/entities/user'
import { parseFormData } from '@/shared/validation'
import { revalidateEmployee } from '@/widgets/employee-languages/api/revalidate-employee'
import {
  type AddLanguageState,
  profileLanguageSchema,
} from '@/widgets/employee-languages/model/language-form'
import { normalizeLanguageName } from '@/widgets/employee-languages/model/language-name'

export async function addEmployeeLanguage(
  lng: string,
  userId: string,
  _state: AddLanguageState,
  formData: FormData,
): Promise<AddLanguageState> {
  const actor = await getActor()
  if (!canEditProfile(actor, userId)) return { error: 'forbidden' }

  const parsed = parseFormData(profileLanguageSchema, formData)
  if (!parsed.success) return { error: 'required' }

  try {
    const current = await getProfileLanguages(userId)
    if (!current) return { error: 'generic' }

    const name = normalizeLanguageName(parsed.data.name)
    const exists = current.some(
      (language) => normalizeLanguageName(language.name) === name,
    )
    if (exists) return { error: 'duplicate' }

    await addProfileLanguage({ userId, ...parsed.data })
  } catch (error) {
    unstable_rethrow(error)
    return { error: 'generic' }
  }

  revalidateEmployee(lng, userId)
  return { savedAt: Date.now() }
}
