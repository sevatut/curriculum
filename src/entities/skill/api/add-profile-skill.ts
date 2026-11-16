import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'
import type { Mastery } from '@/entities/skill/model/types'
import type { ProfileSkill } from '@/entities/skill/model/skill'

type AddProfileSkillData = {
  addProfileSkill: { skills: ProfileSkill[] } | null
}

type AddProfileSkillVariables = {
  skill: {
    userId: string
    name: string
    categoryId: string
    mastery: Mastery
  }
}

const ADD_PROFILE_SKILL: TypedDocumentNode<
  AddProfileSkillData,
  AddProfileSkillVariables
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

export async function addProfileSkill(input: {
  userId: string
  name: string
  categoryId: string
  mastery: Mastery
}): Promise<ProfileSkill[]> {
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
