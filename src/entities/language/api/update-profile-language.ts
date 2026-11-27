import { gql, type TypedDocumentNode } from '@apollo/client'

import type {
  ProfileLanguageInput,
  ProfileLanguageMutationData,
  ProfileLanguageMutationVariables,
} from '@/entities/language/api/profile-language-mutation.types'
import { getClient } from '@/shared/api/apollo-client'
import type { ProfileLanguage } from '@/entities/language/model/language'

const UPDATE_PROFILE_LANGUAGE: TypedDocumentNode<
  ProfileLanguageMutationData<'updateProfileLanguage'>,
  ProfileLanguageMutationVariables
> = gql`
  mutation UpdateProfileLanguage($language: AddProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      languages {
        id
        name
        proficiency
      }
    }
  }
`

export async function updateProfileLanguage(
  input: ProfileLanguageInput,
): Promise<ProfileLanguage[]> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: UPDATE_PROFILE_LANGUAGE,
    variables: { language: input },
  })

  if (!data?.updateProfileLanguage) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.updateProfileLanguage.languages
}
