import { formErrorCode } from '@/shared/validation'

export const userFormError = {
  required: 'required',
  invalidEmail: 'invalidEmail',
  weakPassword: 'weakPassword',
  emailTaken: 'emailTaken',
  detailsNotSaved: 'detailsNotSaved',
  forbidden: 'forbidden',
  generic: 'generic',
} as const

export type UserFormError = (typeof userFormError)[keyof typeof userFormError]

export const userFormErrorKey = {
  required: 'userForm.errorRequired',
  invalidEmail: 'userForm.errorInvalidEmail',
  weakPassword: 'userForm.errorWeakPassword',
  emailTaken: 'userForm.errorEmailTaken',
  detailsNotSaved: 'userForm.errorDetailsNotSaved',
  forbidden: 'userForm.errorForbidden',
  generic: 'userForm.errorGeneric',
} as const satisfies Record<UserFormError, `userForm.error${string}`>

export function userFormParseError(code: string): UserFormError {
  return code === formErrorCode.invalidEmail || code === formErrorCode.weakPassword
    ? code
    : userFormError.required
}
