export const avatarError = {
  invalid: 'invalid',
  forbidden: 'forbidden',
  generic: 'generic',
} as const

export type AvatarError = (typeof avatarError)[keyof typeof avatarError]

export const avatarErrorKey = {
  invalid: 'profile.errorAvatarInvalid',
  forbidden: 'profile.errorAvatarForbidden',
  generic: 'profile.errorAvatarGeneric',
} as const satisfies Record<AvatarError, `profile.${string}`>
