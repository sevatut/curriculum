export type DeleteUserError = 'forbidden' | 'generic'

export type DeleteUserResult = {
  error?: DeleteUserError
}
