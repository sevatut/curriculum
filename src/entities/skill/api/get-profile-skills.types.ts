import type { ProfileSkill } from '@/entities/skill/model/skill'

export type GetProfileSkillsData = {
  profile: { skills: ProfileSkill[] } | null
}

export type GetProfileSkillsVariables = {
  userId: string
}
