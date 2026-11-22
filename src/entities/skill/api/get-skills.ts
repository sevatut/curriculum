import { gql, type TypedDocumentNode } from '@apollo/client'

import type { GetSkillsData } from '@/entities/skill/api/get-skills.types'
import { query } from '@/shared/api/apollo-client'
import { formatCategoryName } from '@/entities/skill/model/category-name'
import type { Skill } from '@/entities/skill/model/skill'

const GET_SKILLS: TypedDocumentNode<GetSkillsData, Record<string, never>> = gql`
  query GetSkills {
    skills {
      id
      name
      category {
        id
        name
      }
    }
  }
`

export async function getSkills(): Promise<Skill[]> {
  const { data } = await query({ query: GET_SKILLS })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.skills
    .map((skill) => ({
      ...skill,
      category: {
        ...skill.category,
        name: formatCategoryName(skill.category.name),
      },
    }))
    .sort((left, right) => left.name.localeCompare(right.name))
}
