'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { canManageCv, getCv, updateCv } from '@/entities/cv'
import { getActor } from '@/entities/user'
import { cvDetailsSchema } from '@/features/cv/cv-form/model/cv-form'
import {
  cvFormError,
  cvFormParseError,
  type CvFormState,
} from '@/features/cv/cv-form/model/cv-form-error'
import { resolveLocale } from '@/shared/i18n/settings'
import { appRoutes } from '@/shared/routes'
import { parseFormData } from '@/shared/validation'

export async function updateCvAction(
  lng: string,
  cvId: string,
  _state: CvFormState,
  formData: FormData,
): Promise<CvFormState> {
  const cv = await getCv(cvId)
  if (!cv || !canManageCv(await getActor(), cv.user.id)) {
    return { error: cvFormError.forbidden }
  }

  const parsed = parseFormData(cvDetailsSchema, formData)
  if (!parsed.success) return { error: cvFormParseError(parsed.formError) }

  try {
    await updateCv({ cvId, ...parsed.data })
  } catch (error) {
    unstable_rethrow(error)
    return { error: cvFormError.generic }
  }

  const locale = resolveLocale(lng)
  revalidatePath(appRoutes.cvs.list(locale), 'page')
  revalidatePath(appRoutes.cvs.details(locale, cvId), 'layout')
  return { savedAt: Date.now() }
}
