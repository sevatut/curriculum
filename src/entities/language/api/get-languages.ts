import { gql, type TypedDocumentNode } from '@apollo/client'

import type { GetLanguagesData } from '@/entities/language/api/get-languages.types'
import { query } from '@/shared/api/apollo-client'
import type { Language } from '@/entities/language/model/language'

const GET_LANGUAGES: TypedDocumentNode<GetLanguagesData, Record<string, never>> = gql`
  query GetLanguages {
    languages {
      id
      name
      native_name
      iso2
    }
  }
`

export async function getLanguages(): Promise<Language[]> {
  const { data } = await query({ query: GET_LANGUAGES })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return [...data.languages].sort((left, right) => left.name.localeCompare(right.name))
}
