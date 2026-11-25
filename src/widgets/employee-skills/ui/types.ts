import type { ProfileSkill, Skill, SkillCategory } from '@/entities/skill/'
import type { SkillActionError } from '@/widgets/employee-skills/model/skill-form'

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

export type SkillActionsProps = {
  removing: boolean
  pending: boolean
  error?: SkillActionError
  selectedCount: number
  canAdd: boolean
  canRemove: boolean
  onAdd: () => void
  onStartRemoving: () => void
  onCancelRemoving: () => void
  onDelete: () => void
}
