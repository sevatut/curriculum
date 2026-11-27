import { gql, type TypedDocumentNode } from '@apollo/client'

import type {
  ProfileLanguageInput,
  ProfileLanguageMutationData,
  ProfileLanguageMutationVariables,
} from '@/entities/language/api/profile-language-mutation.types'
import { getClient } from '@/shared/api/apollo-client'
import type { ProfileLanguage } from '@/entities/language/model/language'

const ADD_PROFILE_LANGUAGE: TypedDocumentNode<
  ProfileLanguageMutationData<'addProfileLanguage'>,
  ProfileLanguageMutationVariables
> = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      languages {
        id
        name
        proficiency
      }
    }
  }
`

export async function addProfileLanguage(
  input: ProfileLanguageInput,
): Promise<ProfileLanguage[]> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: ADD_PROFILE_LANGUAGE,
    variables: { language: input },
  })

  if (!data?.addProfileLanguage) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.addProfileLanguage.languages
}
