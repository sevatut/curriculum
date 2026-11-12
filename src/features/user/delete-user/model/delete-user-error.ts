export const deleteUserError = {
  forbidden: 'forbidden',
  generic: 'generic',
} as const

export type DeleteUserError = (typeof deleteUserError)[keyof typeof deleteUserError]

export const deleteUserErrorKey = {
  forbidden: 'deleteUser.errorForbidden',
  generic: 'deleteUser.errorGeneric',
} as const satisfies Record<DeleteUserError, `deleteUser.error${string}`>
