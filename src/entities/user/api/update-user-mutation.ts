import { gql, type TypedDocumentNode } from '@apollo/client'

import type { UpdateUserData, UpdateUserVariables } from '@/entities/user/api/types'

export const UPDATE_USER: TypedDocumentNode<UpdateUserData, UpdateUserVariables> = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`
