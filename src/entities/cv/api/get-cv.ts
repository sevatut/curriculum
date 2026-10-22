import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'

import type { CvDetails } from '../model/cv'

type GetCvData = {
  cv: CvDetails | null
}

type GetCvVariables = {
  cvId: string
}

const GET_CV: TypedDocumentNode<GetCvData, GetCvVariables> = gql`
  query GetCv($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`

export async function getCv(cvId: string): Promise<CvDetails | null> {
  const { data } = await query({
    query: GET_CV,
    variables: { cvId },
  })

  return data?.cv ?? null
}
