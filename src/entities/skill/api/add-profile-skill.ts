import { gql, type TypedDocumentNode } from '@apollo/client'

import type {
  ProfileSkillInput,
  ProfileSkillMutationData,
  ProfileSkillMutationVariables,
} from '@/entities/skill/api/profile-skill-mutation.types'
import { getClient } from '@/shared/api/apollo-client'
import type { ProfileSkill } from '@/entities/skill/model/skill'

const ADD_PROFILE_SKILL: TypedDocumentNode<
  ProfileSkillMutationData<'addProfileSkill'>,
  ProfileSkillMutationVariables
> = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      skills {
        id
        name
        categoryId
        mastery
      }
    }
  }
`

export async function addProfileSkill(
  input: ProfileSkillInput,
): Promise<ProfileSkill[]> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: ADD_PROFILE_SKILL,
    variables: { skill: input },
  })

  if (!data?.addProfileSkill) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.addProfileSkill.skills
}
