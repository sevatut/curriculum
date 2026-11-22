import type { Mastery } from '@/entities/skill/model/mastery'

export type SkillItemProps = {
  name: string
  mastery: Mastery
  selected?: boolean
}
