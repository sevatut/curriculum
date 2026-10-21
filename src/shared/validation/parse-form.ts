import { z } from 'zod'

import { formErrorCode } from './fields'

export type FormParseResult<T> =
  { success: true; data: T } | { success: false; formError: string }

const errorPriority = [
  formErrorCode.required,
  formErrorCode.invalidEmail,
  formErrorCode.weakPassword,
] as const

export function parseFormData<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  formData: FormData,
): FormParseResult<z.infer<z.ZodObject<T>>> {
  const parsed = schema.safeParse(formInput(formData, schema))
  if (parsed.success) return { success: true, data: parsed.data }

  const messages = parsed.error.issues.map((issue) => issue.message)
  return { success: false, formError: chooseError(messages) ?? 'generic' }
}

export function readFormData<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  formData: FormData,
): z.infer<z.ZodObject<T>> {
  return schema.parse(formInput(formData, schema))
}

function formInput(formData: FormData, schema: { shape: object }) {
  const input: Record<string, string> = {}
  for (const key of Object.keys(schema.shape)) {
    const value = formData.get(key)
    input[key] = typeof value === 'string' ? value : ''
  }
  return input
}

function chooseError(messages: string[]) {
  for (const code of errorPriority) {
    if (messages.includes(code)) return code
  }
  return messages[0]
}
