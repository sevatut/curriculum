import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'

type GetUserAvatarData = {
  user: {
    profile: { avatar: string | null } | null
  } | null
}

type GetUserAvatarVariables = {
  userId: string
}

const GET_USER_AVATAR: TypedDocumentNode<GetUserAvatarData, GetUserAvatarVariables> =
  gql`
    query GetUserAvatar($userId: ID!) {
      user(userId: $userId) {
        profile {
          avatar
        }
      }
    }
  `

export async function getUserAvatar(userId: string): Promise<string | null> {
  const { data } = await query({
    query: GET_USER_AVATAR,
    variables: { userId },
    fetchPolicy: 'network-only',
  })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.user?.profile?.avatar ?? null
}
