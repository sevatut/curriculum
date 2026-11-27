import { gql, type TypedDocumentNode } from '@apollo/client'

import type {
  GetProfileLanguagesData,
  GetProfileLanguagesVariables,
} from '@/entities/language/api/get-profile-languages.types'
import { query } from '@/shared/api/apollo-client'
import type { ProfileLanguage } from '@/entities/language/model/language'

const GET_PROFILE_LANGUAGES: TypedDocumentNode<
  GetProfileLanguagesData,
  GetProfileLanguagesVariables
> = gql`
  query GetProfileLanguages($userId: ID!) {
    profile(userId: $userId) {
      languages {
        id
        name
        proficiency
      }
    }
  }
`

export async function getProfileLanguages(
  userId: string,
): Promise<ProfileLanguage[] | null> {
  const { data } = await query({
    query: GET_PROFILE_LANGUAGES,
    variables: { userId },
    fetchPolicy: 'network-only',
  })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.profile?.languages ?? null
}
