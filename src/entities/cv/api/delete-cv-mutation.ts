import { gql, type TypedDocumentNode } from '@apollo/client'

import type { DeleteCvData, DeleteCvVariables } from '@/entities/cv/api/types'

export const DELETE_CV: TypedDocumentNode<DeleteCvData, DeleteCvVariables> = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`
