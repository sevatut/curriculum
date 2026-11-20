import type { Mastery } from '@/entities/skill/model/types'

export const masteryLevels = [
  'Novice',
  'Advanced',
  'Competent',
  'Expert',
  'Master',
] as const satisfies readonly Mastery[]

export type ProfileSkill = {
  id: string
  name: string
  categoryId: string
  mastery: Mastery
}

export type SkillCategory = {
  id: string
  name: string
  order: number
}

export type Skill = {
  id: string
  name: string
  category: { id: string; name: string }
}
