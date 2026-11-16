import { z } from 'zod'

import { optionalTextSchema, personNameSchema, readFormData } from '@/shared/validation'

const cvDetailsDraftSchema = z.object({
  name: z.string(),
  education: z.string(),
  description: z.string(),
})

export const cvDetailsSchema = z.object({
  name: personNameSchema,
  education: optionalTextSchema,
  description: optionalTextSchema,
})

export type CvDetailsValues = z.infer<typeof cvDetailsSchema>

export function readCvDetailsForm(formData: FormData): CvDetailsValues {
  return readFormData(cvDetailsDraftSchema, formData)
}

export function isCvDetailsChanged(current: CvDetailsValues, initial: CvDetailsValues) {
  return (
    current.name !== initial.name ||
    current.education !== initial.education ||
    current.description !== initial.description
  )
}
