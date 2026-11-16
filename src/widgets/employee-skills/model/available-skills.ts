import type { ProfileSkill, Skill } from '@/entities/skill/model/skill'

export function availableSkills(
  catalog: readonly Skill[],
  owned: readonly ProfileSkill[],
): Skill[] {
  const taken = new Set(owned.map((skill) => skill.name.toLowerCase()))
  return catalog.filter((skill) => !taken.has(skill.name.toLowerCase()))
}
