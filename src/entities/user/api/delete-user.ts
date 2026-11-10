import { getClient } from '@/shared/api/apollo-client'
import { DELETE_USER } from '@/entities/user/api/delete-user-mutation'

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
