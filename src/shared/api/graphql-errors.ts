import { CombinedGraphQLErrors } from '@apollo/client/errors'

const INVALID_CREDENTIALS_MESSAGES = [
  'Пользователь с таким email не найден',
  'Неверный пароль',
]

export function isEmailTakenError(error: unknown) {
  return (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some(
      ({ message }) =>
        /unique constraint failed/i.test(message) && /email/i.test(message),
    )
  )
}

export function isInvalidCredentialsError(error: unknown) {
  return (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some(({ message }) => INVALID_CREDENTIALS_MESSAGES.includes(message))
  )
}
