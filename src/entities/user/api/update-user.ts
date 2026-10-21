import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'

type UpdateUserData = {
  updateUser: {
    id: string
  } | null
}

type UpdateUserVariables = {
  user: {
    userId: string
    department_id: string | null
    position_id: string | null
    department_name: string | null
    position_name: string | null
  }
}

const UPDATE_USER: TypedDocumentNode<UpdateUserData, UpdateUserVariables> = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`

export async function updateUser(input: {
  userId: string
  departmentId: string
  positionId: string
  departmentName: string
  positionName: string
}) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: UPDATE_USER,
    variables: {
      user: {
        userId: input.userId,
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
