import type { Mastery } from '@/entities/skill/model/types'
import type { ProfileSkill } from '@/entities/skill/model/skill'

export type ProfileSkillInput = {
  userId: string
  name: string
  categoryId: string
  mastery: Mastery
}

export type ProfileSkillMutationVariables = {
  skill: ProfileSkillInput
}

export type ProfileSkillMutationData<Field extends string> = Record<
  Field,
  { skills: ProfileSkill[] } | null
>
