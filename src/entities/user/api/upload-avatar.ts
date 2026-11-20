import { getClient } from '@/shared/api/apollo-client'
import { UPLOAD_AVATAR } from '@/entities/user/api/upload-avatar-mutation'

export async function uploadAvatar(userId: string, base64: string) {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: UPLOAD_AVATAR,
    variables: { avatar: { userId, base64 } },
  })

  if (!data?.uploadAvatar) {
    throw new Error('GraphQL response does not contain data')
  }
}
