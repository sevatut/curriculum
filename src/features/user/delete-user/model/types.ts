import type { DeleteUserError } from '@/features/user/delete-user/model/delete-user-error'

export type DeleteUserResult = {
  error?: DeleteUserError
}
