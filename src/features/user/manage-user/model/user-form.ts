import { z } from 'zod'

import { userRoles } from '@/entities/user/model/user'
import { emailSchema, newPasswordSchema, personNameSchema } from '@/shared/validation'

export const userDetailsSchema = z.object({
  firstName: personNameSchema,
  lastName: personNameSchema,
  departmentId: z.string(),
  positionId: z.string(),
  role: z.enum(userRoles),
})

export const newUserSchema = userDetailsSchema.extend({
  email: emailSchema,
  password: newPasswordSchema,
})

export type UserDetailsValues = z.infer<typeof userDetailsSchema>

export const emptyUserDetails: UserDetailsValues = {
  firstName: '',
  lastName: '',
  departmentId: '',
  positionId: '',
  role: 'Employee',
}
