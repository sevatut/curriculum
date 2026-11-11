import { getClient } from '@/shared/api/apollo-client'
import { UPDATE_USER } from '@/entities/user/api/update-user-mutation'
import type { UpdateUserInput } from '@/entities/user/api/types'

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
      },
    },
  })

  if (!data?.updateUser) {
    throw new Error('GraphQL response does not contain data')
  }
}
