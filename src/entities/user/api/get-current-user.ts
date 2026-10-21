import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'

import type { Actor } from '../model/access'

type GetCurrentUserData = {
  user: Actor | null
}

type GetCurrentUserVariables = {
  userId: string
}

const GET_CURRENT_USER: TypedDocumentNode<GetCurrentUserData, GetCurrentUserVariables> =
  gql`
    query GetCurrentUser($userId: ID!) {
      user(userId: $userId) {
        id
        role
      }
    }
  `

export async function getCurrentUser(userId: string): Promise<Actor | null> {
  const { data } = await query({
    query: GET_CURRENT_USER,
    variables: { userId },
    fetchPolicy: 'network-only',
  })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.user
}
