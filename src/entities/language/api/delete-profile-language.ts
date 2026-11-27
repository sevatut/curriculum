import { gql, type TypedDocumentNode } from '@apollo/client'

import type {
  DeleteProfileLanguageData,
  DeleteProfileLanguageInput,
  DeleteProfileLanguageVariables,
} from '@/entities/language/api/delete-profile-language.types'
import { getClient } from '@/shared/api/apollo-client'
import type { ProfileLanguage } from '@/entities/language/model/language'

const DELETE_PROFILE_LANGUAGE: TypedDocumentNode<
  DeleteProfileLanguageData,
  DeleteProfileLanguageVariables
> = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      languages {
        id
        name
        proficiency
      }
    }
  }
`

export async function deleteProfileLanguage(
  input: DeleteProfileLanguageInput,
): Promise<ProfileLanguage[]> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: DELETE_PROFILE_LANGUAGE,
    variables: { language: input },
  })

  if (!data?.deleteProfileLanguage) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.deleteProfileLanguage.languages
}
