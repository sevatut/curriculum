import { z } from 'zod'

export const formErrorCode = {
  required: 'required',
  invalidEmail: 'invalidEmail',
  weakPassword: 'weakPassword',
} as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

export const emailSchema = z
  .string()
  .trim()
  .min(1, { error: formErrorCode.required })
  .regex(EMAIL_PATTERN, { error: formErrorCode.invalidEmail })

export const passwordSchema = z.string().min(1, { error: formErrorCode.required })

export const newPasswordSchema = passwordSchema.min(MIN_PASSWORD_LENGTH, {
  error: formErrorCode.weakPassword,
})

export const personNameSchema = z
  .string()
  .trim()
  .min(1, { error: formErrorCode.required })

export const optionalTextSchema = z.string()
