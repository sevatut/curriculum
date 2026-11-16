import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'
import type { ProfileSkill } from '@/entities/skill/model/skill'
import type { Mastery } from '@/entities/skill/model/types'

type UpdateProfileSkillData = {
  updateProfileSkill: { skills: ProfileSkill[] } | null
}

type UpdateProfileSkillVariables = {
  skill: {
    userId: string
    name: string
    categoryId: string
    mastery: Mastery
  }
}

const UPDATE_PROFILE_SKILL: TypedDocumentNode<
  UpdateProfileSkillData,
  UpdateProfileSkillVariables
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

export async function updateProfileSkill(input: {
  userId: string
  name: string
  categoryId: string
  mastery: Mastery
}): Promise<ProfileSkill[]> {
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
