import type { Mastery } from '@/entities/skill/model/mastery'

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
