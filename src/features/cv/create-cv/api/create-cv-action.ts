'use server'

import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

import { createCv } from '@/entities/cv'
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

export async function createCvAction(
  lng: string,
  _state: CvFormState,
  formData: FormData,
): Promise<CvFormState> {
  const actor = await getActor()
  if (!actor) return { error: cvFormError.forbidden }

  const parsed = parseFormData(cvDetailsSchema, formData)
  if (!parsed.success) return { error: cvFormParseError(parsed.formError) }

  try {
    await createCv({ userId: actor.id, ...parsed.data })
  } catch (error) {
    unstable_rethrow(error)
    return { error: cvFormError.generic }
  }

  revalidatePath(appRoutes.cvs.list(resolveLocale(lng)), 'page')
  return {}
}
