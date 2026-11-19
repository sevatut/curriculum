import { getClient } from '@/shared/api/apollo-client'
import { CREATE_USER } from '@/entities/user/api/create-user-mutation'
import type { CreateUserInput } from '@/entities/user/api/types'

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
