export const authError = {
  required: 'required',
  generic: 'generic',
  emailTaken: 'emailTaken',
  invalidEmail: 'invalidEmail',
  weakPassword: 'weakPassword',
  invalidCredentials: 'invalidCredentials',
} as const

export type AuthError = (typeof authError)[keyof typeof authError]
