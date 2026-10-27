import { SkillItemProps } from './types'
import { masteryConfig } from './mastery-config'

export function SkillItem({ name, mastery }: SkillItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className={`h-1 w-20 ${masteryConfig[mastery].bgClass}`}>
        <div
          className={`h-1 ${masteryConfig[mastery].barClass}`}
          style={{ width: `${masteryConfig[mastery].progress}%` }}
        />
      </div>
      <h2 className="text-skill-text">{name}</h2>
    </div>
  )
}
