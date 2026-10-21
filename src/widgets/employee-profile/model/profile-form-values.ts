import { z } from 'zod'

import { personNameSchema, readFormData } from '@/shared/validation'

const profileDraftSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  departmentId: z.string(),
  positionId: z.string(),
})

export const profileSchema = profileDraftSchema.extend({
  firstName: personNameSchema,
  lastName: personNameSchema,
})

export type ProfileFormValues = z.infer<typeof profileDraftSchema>

export function profileValues(user: {
  profile: { first_name: string; last_name: string } | null
  department: { id: string } | null
  position: { id: string } | null
}): ProfileFormValues {
  return {
    firstName: user.profile?.first_name ?? '',
    lastName: user.profile?.last_name ?? '',
    departmentId: user.department?.id ?? '',
    positionId: user.position?.id ?? '',
  }
}

export function readProfileForm(formData: FormData): ProfileFormValues {
  return readFormData(profileDraftSchema, formData)
}

export function isProfileChanged(
  current: ProfileFormValues,
  initial: ProfileFormValues,
) {
  return (
    current.firstName !== initial.firstName ||
    current.lastName !== initial.lastName ||
    current.departmentId !== initial.departmentId ||
    current.positionId !== initial.positionId
  )
}
