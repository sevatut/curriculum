import { gql, type TypedDocumentNode } from '@apollo/client'

import type {
  ProfileSkillInput,
  ProfileSkillMutationData,
  ProfileSkillMutationVariables,
} from '@/entities/skill/api/profile-skill-mutation.types'
import { getClient } from '@/shared/api/apollo-client'
import type { ProfileSkill } from '@/entities/skill/model/skill'

const UPDATE_PROFILE_SKILL: TypedDocumentNode<
  ProfileSkillMutationData<'updateProfileSkill'>,
  ProfileSkillMutationVariables
> = gql`
  mutation UpdateProfileSkill($skill: AddProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      skills {
        id
        name
        categoryId
        mastery
      }
    }
  }
`

export async function updateProfileSkill(
  input: ProfileSkillInput,
): Promise<ProfileSkill[]> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: UPDATE_PROFILE_SKILL,
    variables: { skill: input },
  })

  if (!data?.updateProfileSkill) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.updateProfileSkill.skills
}
