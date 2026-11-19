import { gql, type TypedDocumentNode } from '@apollo/client'

import type { DeleteUserData, DeleteUserVariables } from '@/entities/user/api/types'

export const DELETE_USER: TypedDocumentNode<DeleteUserData, DeleteUserVariables> = gql`
  mutation DeleteUser($user: DeleteUserInput!) {
    deleteUser(user: $user) {
      affected
    }
  }
`
