import type { DeleteUserError } from '@/features/user/delete-user/model/types'

export const deleteUserErrorKey = {
  forbidden: 'deleteUser.errorForbidden',
  generic: 'deleteUser.errorGeneric',
} as const satisfies Record<DeleteUserError, `deleteUser.error${string}`>
