import { gql, type TypedDocumentNode } from '@apollo/client'

import type { UpdateCvData, UpdateCvVariables } from '@/entities/cv/api/types'

export const UPDATE_CV: TypedDocumentNode<UpdateCvData, UpdateCvVariables> = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
    }
  }
`
