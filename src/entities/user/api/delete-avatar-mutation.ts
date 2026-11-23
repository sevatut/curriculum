import { gql, type TypedDocumentNode } from '@apollo/client'

import type { DeleteAvatarData, DeleteAvatarVariables } from '@/entities/user/api/types'

export const DELETE_AVATAR: TypedDocumentNode<DeleteAvatarData, DeleteAvatarVariables> =
  gql`
    mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
      deleteAvatar(avatar: $avatar) {
        avatar
      }
    }
  `
