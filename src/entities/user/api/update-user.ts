import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'
import type {
  UpdateUserData,
  UpdateUserInput,
  UpdateUserVariables,
} from '@/entities/user/api/types'

const UPDATE_USER: TypedDocumentNode<UpdateUserData, UpdateUserVariables> = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`

export async function updateUser(input: UpdateUserInput) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: UPDATE_USER,
    variables: {
      user: {
        userId: input.userId,
        role: input.role,
        department_id: input.departmentId || null,
        position_id: input.positionId || null,
        department_name: input.departmentName || null,
        position_name: input.positionName || null,
      },
    },
  })

  if (!data?.updateUser) {
    throw new Error('GraphQL response does not contain data')
  }
}
