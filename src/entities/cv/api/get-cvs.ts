import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'

import type { Cv } from '../model/cv'

type GetCvsData = {
  cvs: Cv[]
}

const GET_CVS: TypedDocumentNode<GetCvsData, Record<string, never>> = gql`
  query GetCvs {
    cvs {
      id
      name
      education
      description
      user {
        email
      }
    }
  }
`

export async function getCvs(): Promise<Cv[]> {
  const { data } = await query({ query: GET_CVS })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.cvs
}
