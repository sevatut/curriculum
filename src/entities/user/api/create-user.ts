import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'
import type {
  CreateUserData,
  CreateUserInput,
  CreateUserVariables,
} from '@/entities/user/api/types'

const CREATE_USER: TypedDocumentNode<CreateUserData, CreateUserVariables> = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`

export async function createUser(input: CreateUserInput): Promise<string> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: CREATE_USER,
    variables: {
      user: {
        email: input.email,
        password_hash: input.password,
        role: input.role,
      },
    },
  })

  if (!data?.createUser) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.createUser.id
}
