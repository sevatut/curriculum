import { z } from 'zod'

import { optionalTextSchema, personNameSchema } from '@/shared/validation'

export const cvDetailsSchema = z.object({
  name: personNameSchema,
  education: optionalTextSchema,
  description: optionalTextSchema,
})

export type CvDetailsValues = z.infer<typeof cvDetailsSchema>
