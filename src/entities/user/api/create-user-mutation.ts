import { gql, type TypedDocumentNode } from '@apollo/client'

import type { CreateUserData, CreateUserVariables } from '@/entities/user/api/types'

export const CREATE_USER: TypedDocumentNode<CreateUserData, CreateUserVariables> = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`
