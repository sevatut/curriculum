import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'
import type { DeleteUserData, DeleteUserVariables } from '@/entities/user/api/types'

const DELETE_USER: TypedDocumentNode<DeleteUserData, DeleteUserVariables> = gql`
  mutation DeleteUser($user: DeleteUserInput!) {
    deleteUser(user: $user) {
      affected
    }
  }
`

export async function deleteUser(userId: string) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: DELETE_USER,
    variables: { user: { userId } },
  })

  if (!data?.deleteUser?.affected) {
    throw new Error('User was not deleted')
  }
}
