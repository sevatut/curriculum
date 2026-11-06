import type { UserFormError } from '@/features/user/manage-user/model/types'
import { formErrorCode } from '@/shared/validation'

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
    : 'required'
}
