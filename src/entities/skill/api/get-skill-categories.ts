import { gql, type TypedDocumentNode } from '@apollo/client'

import { query } from '@/shared/api/apollo-client'
import { formatCategoryName } from '@/entities/skill/model/category-name'
import type { SkillCategory } from '@/entities/skill/model/skill'

type GetSkillCategoriesData = {
  skillCategories: SkillCategory[]
}

const GET_SKILL_CATEGORIES: TypedDocumentNode<
  GetSkillCategoriesData,
  Record<string, never>
> = gql`
  query GetSkillCategories {
    skillCategories {
      id
      name
      order
    }
  }
`

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const { data } = await query({ query: GET_SKILL_CATEGORIES })

  if (!data) {
    throw new Error('GraphQL response does not contain data')
  }

  return data.skillCategories
    .map((category) => ({
      ...category,
      name: formatCategoryName(category.name),
    }))
    .sort(
      (left, right) => left.order - right.order || left.name.localeCompare(right.name),
    )
}
