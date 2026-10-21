export type ProfileFormError = 'required' | 'generic' | 'forbidden' | 'assignment'

export const errorKey = {
  required: 'profile.errorRequired',
  generic: 'profile.errorGeneric',
  forbidden: 'profile.errorForbidden',
  assignment: 'profile.errorAssignment',
} as const satisfies Record<ProfileFormError, `profile.error${string}`>
