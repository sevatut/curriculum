import { z } from 'zod'

import {
  emailSchema,
  newPasswordSchema,
  parseFormData,
  passwordSchema,
} from '@/shared/validation'

const loginCredentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

const signupCredentialsSchema = loginCredentialsSchema.extend({
  password: newPasswordSchema,
})

export type Credentials = z.infer<typeof loginCredentialsSchema>

export type CredentialsIntent = 'login' | 'signup'

export function parseCredentials(formData: FormData, intent: CredentialsIntent) {
  const schema = intent === 'signup' ? signupCredentialsSchema : loginCredentialsSchema
  return parseFormData(schema, formData)
}
