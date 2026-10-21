import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'

import type { UserDetails } from '../model/user'

type GetUserData = {
  user: UserDetails | null
}

type GetUserVariables = {
  userId: string
}

const GET_USER: TypedDocumentNode<GetUserData, GetUserVariables> = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      id
      email
      department {
        id
        name
      }
      position {
        id
        name
      }
      profile {
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`

export async function getUser(userId: string): Promise<UserDetails | null> {
  const { data } = await query({
    query: GET_USER,
    variables: { userId },
    fetchPolicy: 'network-only',
  })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.user
}
