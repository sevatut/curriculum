import type { ProfileSkill, SkillCategory } from '@/entities/skill/model/skill'

export type SkillGroup = {
  id: string
  name: string
  skills: ProfileSkill[]
}

export function groupSkillsByCategory(
  skills: readonly ProfileSkill[],
  categories: readonly SkillCategory[],
): SkillGroup[] {
  return categories
    .map((category) => ({
      id: category.id,
      name: category.name,
      skills: skills.filter((skill) => skill.categoryId === category.id),
    }))
    .filter((group) => group.skills.length > 0)
}
