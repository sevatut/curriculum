import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  type OperationVariables,
} from '@apollo/client'
import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors'
import { registerApolloClient } from '@apollo/client-integration-nextjs'
import type { GraphQLFormattedError } from 'graphql'
import { headers } from 'next/headers'
import { redirect, unstable_rethrow } from 'next/navigation'

import { defaultLocale, resolveLocale } from '@/shared/i18n/settings'

import { authLogoutPath } from './session'
import { readSession } from './session-store'

const UNAUTHORIZED_MESSAGE = 'Unauthorized'

function isUnauthorizedGraphqlError(error: GraphQLFormattedError) {
  if (error.message === UNAUTHORIZED_MESSAGE) return true

  const original = error.extensions?.originalError
  if (!original || typeof original !== 'object' || !('message' in original))
    return false

  return original.message === UNAUTHORIZED_MESSAGE
}

function parsedBody(bodyText: string) {
  try {
    return JSON.parse(bodyText) as unknown
  } catch {
    return undefined
  }
}

function jsonHasUnauthorized(value: unknown) {
  if (!value || typeof value !== 'object') return false
  if ('message' in value && value.message === UNAUTHORIZED_MESSAGE) return true
  if (!('errors' in value) || !Array.isArray(value.errors)) return false

  return value.errors.some(
    (item) =>
      !!item &&
      typeof item === 'object' &&
      'message' in item &&
      item.message === UNAUTHORIZED_MESSAGE,
  )
}

function isUnauthorizedError(error: unknown) {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some(isUnauthorizedGraphqlError)
  }

  if (ServerError.is(error)) {
    return error.statusCode === 401 || jsonHasUnauthorized(parsedBody(error.bodyText))
  }

  return false
}

function resultHasUnauthorized(result: unknown) {
  return (
    !!result &&
    typeof result === 'object' &&
    'error' in result &&
    isUnauthorizedError(result.error)
  )
}

async function redirectAfterUnauthorized(): Promise<never> {
  const headerStore = await headers()
  const lng = resolveLocale(
    headerStore.get('x-i18next-current-language') ?? defaultLocale,
  )

  redirect(authLogoutPath(lng))
}

async function runAuthorized<T>(
  hasSession: boolean,
  run: () => Promise<T>,
): Promise<T> {
  try {
    const result = await run()

    if (hasSession && resultHasUnauthorized(result)) {
      await redirectAfterUnauthorized()
    }

    return result
  } catch (error) {
    unstable_rethrow(error)

    if (hasSession && isUnauthorizedError(error)) {
      await redirectAfterUnauthorized()
    }

    throw error
  }
}

function getGraphqlUrl() {
  return process.env.GRAPHQL_URL ?? ''
}

export const { getClient, query } = registerApolloClient(async () => {
  const session = await readSession()
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: getGraphqlUrl(),
      headers: session ? { Authorization: `Bearer ${session.accessToken}` } : {},
      fetchOptions: { cache: 'no-store' },
    }),
  })

  const queryOperation = client.query.bind(client)
  const mutateOperation = client.mutate.bind(client)
  const hasSession = session !== null

  client.query = (<TData, TVariables extends OperationVariables>(
    options: ApolloClient.QueryOptions<TData, TVariables>,
  ) => runAuthorized(hasSession, () => queryOperation(options))) as typeof client.query

  client.mutate = ((options: Parameters<ApolloClient['mutate']>[0]) =>
    runAuthorized(hasSession, () => mutateOperation(options))) as typeof client.mutate

  return client
})
