import { CombinedGraphQLErrors } from '@apollo/client/errors'

export function isEmailTakenError(error: unknown) {
  return (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some(
      ({ message }) =>
        /unique constraint failed/i.test(message) && /email/i.test(message),
    )
  )
}
