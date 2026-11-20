import type { ProfileSkill, Skill, SkillCategory } from '@/entities/skill/model/skill'

export type EmployeeSkillsProps = {
  lng: string
  userId: string
  skills: ProfileSkill[]
  categories: SkillCategory[]
  catalog: Skill[]
  editable: boolean
}

export type AddSkillModalProps = {
  lng: string
  userId: string
  available: Skill[]
  onClose: () => void
}

export type UpdateSkillModalProps = {
  lng: string
  userId: string
  skill: ProfileSkill
  onClose: () => void
}
