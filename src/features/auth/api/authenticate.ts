import { gql, type TypedDocumentNode } from '@apollo/client'
import { unstable_rethrow } from 'next/navigation'

import { getClient } from '@/shared/api/apollo-client'
import {
  isEmailTakenError,
  isInvalidCredentialsError,
} from '@/shared/api/graphql-errors'
import type { AuthAttempt } from '@/features/auth/model/auth-attempt'
import { authError, type AuthError } from '@/features/auth/model/auth-error'
import type { Credentials } from '@/features/auth/model/credentials'
import { toSession, type AuthResult } from '@/features/auth/api/auth-result'

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

function backendMessage(error: unknown): AuthError {
  if (isEmailTakenError(error)) return authError.emailTaken
  if (isInvalidCredentialsError(error)) return authError.invalidCredentials
  return authError.generic
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
      return { error: authError.generic }
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
