import type { ProfileSkill, Skill } from '@/entities/skill/model/skill'
import { normalizeSkillName } from '@/widgets/employee-skills/model/skill-name'

export function availableSkills(
  catalog: readonly Skill[],
  owned: readonly ProfileSkill[],
): Skill[] {
  const taken = new Set(owned.map((skill) => normalizeSkillName(skill.name)))
  return catalog.filter((skill) => !taken.has(normalizeSkillName(skill.name)))
}
