import { getClient } from '@/shared/api/apollo-client'
import { DELETE_AVATAR } from '@/entities/user/api/delete-avatar-mutation'

export async function deleteAvatar(userId: string) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: DELETE_AVATAR,
    variables: { avatar: { userId } },
  })

  if (!data?.deleteAvatar) {
    throw new Error('GraphQL response does not contain data')
  }
}
