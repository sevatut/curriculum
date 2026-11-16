import { gql, type TypedDocumentNode } from '@apollo/client'

import { getClient } from '@/shared/api/apollo-client'
import type { ProfileSkill } from '@/entities/skill/model/skill'

type DeleteProfileSkillData = {
  deleteProfileSkill: { skills: ProfileSkill[] } | null
}

type DeleteProfileSkillVariables = {
  skill: {
    userId: string
    name: string
  }
}

const DELETE_PROFILE_SKILL: TypedDocumentNode<
  DeleteProfileSkillData,
  DeleteProfileSkillVariables
> = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      skills {
        id
        name
        categoryId
        mastery
      }
    }
  }
`

export async function deleteProfileSkill(input: {
  userId: string
  name: string
}): Promise<ProfileSkill[]> {
  const client = await getClient()
  const { data } = await client.mutate({
    mutation: DELETE_PROFILE_SKILL,
    variables: { skill: input },
  })

  if (!data?.deleteProfileSkill) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.deleteProfileSkill.skills
}
