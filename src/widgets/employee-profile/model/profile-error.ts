export const profileFormError = {
  required: 'required',
  generic: 'generic',
  forbidden: 'forbidden',
  assignment: 'assignment',
} as const

export type ProfileFormError = (typeof profileFormError)[keyof typeof profileFormError]

export const errorKey = {
  required: 'profile.errorRequired',
  generic: 'profile.errorGeneric',
  forbidden: 'profile.errorForbidden',
  assignment: 'profile.errorAssignment',
} as const satisfies Record<ProfileFormError, `profile.error${string}`>
