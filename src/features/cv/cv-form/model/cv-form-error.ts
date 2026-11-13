import { formErrorCode } from '@/shared/validation'

export const cvFormError = {
  required: 'required',
  forbidden: 'forbidden',
  generic: 'generic',
} as const

export type CvFormError = (typeof cvFormError)[keyof typeof cvFormError]

export type CvFormState = {
  error?: CvFormError
  savedAt?: number
}

export const cvFormErrorKey = {
  required: 'cvForm.errorRequired',
  forbidden: 'cvForm.errorForbidden',
  generic: 'cvForm.errorGeneric',
} as const satisfies Record<CvFormError, `cvForm.error${string}`>

export function cvFormParseError(code: string): CvFormError {
  return code === formErrorCode.required ? cvFormError.required : cvFormError.generic
}
