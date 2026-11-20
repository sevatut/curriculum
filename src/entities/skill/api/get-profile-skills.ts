import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'
import type { ProfileSkill } from '@/entities/skill/model/skill'

type GetProfileSkillsData = {
  profile: { skills: ProfileSkill[] } | null
}

type GetProfileSkillsVariables = {
  userId: string
}

const GET_PROFILE_SKILLS: TypedDocumentNode<
  GetProfileSkillsData,
  GetProfileSkillsVariables
> = gql`
  query GetProfileSkills($userId: ID!) {
    profile(userId: $userId) {
      skills {
        id
        name
        categoryId
        mastery
      }
    }
  }
`

export async function getProfileSkills(userId: string): Promise<ProfileSkill[] | null> {
  const { data } = await query({
    query: GET_PROFILE_SKILLS,
    variables: { userId },
    fetchPolicy: 'network-only',
  })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.profile?.skills ?? null
}
