import { gql, type TypedDocumentNode } from '@apollo/client'

import type { UploadAvatarData, UploadAvatarVariables } from '@/entities/user/api/types'

export const UPLOAD_AVATAR: TypedDocumentNode<UploadAvatarData, UploadAvatarVariables> =
  gql`
    mutation UploadAvatar($avatar: UploadAvatarInput!) {
      uploadAvatar(avatar: $avatar)
    }
  `
