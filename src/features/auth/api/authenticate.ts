import { gql, type TypedDocumentNode } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { unstable_rethrow } from 'next/navigation'

import { getClient } from '@/shared/api/apollo-client'

import type { AuthAttempt } from '../model/auth-attempt'
import type { Credentials } from '../model/credentials'
import { serverErrorKey, toSession, type AuthResult } from './auth-result'

type AuthVariables = {
  auth: {
    email: string
    password_hash: string
  }
}

type AuthField = 'login' | 'signup'

const authResultFields = `
  access_token
  user {
    id
    email
    profile {
      full_name
    }
  }
`

const LOGIN: TypedDocumentNode<Record<'login', AuthResult>, AuthVariables> = gql`
  mutation Login($auth: AuthInput!) {
    login(auth: $auth) {
      ${authResultFields}
    }
  }
`

const SIGN_UP: TypedDocumentNode<Record<'signup', AuthResult>, AuthVariables> = gql`
  mutation SignUp($auth: AuthInput!) {
    signup(auth: $auth) {
      ${authResultFields}
    }
  }
`

function backendMessage(error: unknown) {
  if (!CombinedGraphQLErrors.is(error)) return 'generic'

  for (const item of error.errors) {
    const code = item.extensions?.code
    if (typeof code === 'string' && code in serverErrorKey) {
      return serverErrorKey[code as keyof typeof serverErrorKey]
    }
    if (item.message in serverErrorKey) {
      return serverErrorKey[item.message as keyof typeof serverErrorKey]
    }
  }

  const message = error.errors
    .map((item) => item.message)
    .filter(Boolean)
    .join('\n')

  if (/unique constraint failed/i.test(message) && /email/i.test(message))
    return 'emailTaken'

  return 'generic'
}

async function requestSession<Field extends AuthField>(
  mutation: TypedDocumentNode<Record<Field, AuthResult>, AuthVariables>,
  field: Field,
  credentials: Credentials,
): Promise<AuthAttempt> {
  try {
    const client = await getClient()
    const { data } = await client.mutate({
      mutation,
      variables: {
        auth: {
          email: credentials.email,
          password_hash: credentials.password,
        },
      },
    })
    const result = data?.[field]

    if (!result?.access_token || !result.user) {
      return { error: 'generic' }
    }

    return { session: toSession(result) }
  } catch (error) {
    unstable_rethrow(error)
    return { error: backendMessage(error) }
  }
}

export function signIn(credentials: Credentials) {
  return requestSession(LOGIN, 'login', credentials)
}

export function signUp(credentials: Credentials) {
  return requestSession(SIGN_UP, 'signup', credentials)
}
