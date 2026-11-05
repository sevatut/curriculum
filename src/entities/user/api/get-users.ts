import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'
import type { User } from '@/entities/user/model/user'

type GetUsersData = {
  users: User[]
}

const GET_USERS: TypedDocumentNode<GetUsersData, Record<string, never>> = gql`
  query GetUsers {
    users {
      id
      email
      role
      department_name
      position_name
      department {
        id
      }
      position {
        id
      }
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`

export async function getUsers(): Promise<User[]> {
  const { data } = await query({ query: GET_USERS })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.users
}
