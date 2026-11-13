import { gql, type TypedDocumentNode } from '@apollo/client'

import type { CreateCvData, CreateCvVariables } from '@/entities/cv/api/types'

export const CREATE_CV: TypedDocumentNode<CreateCvData, CreateCvVariables> = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
    }
  }
`
