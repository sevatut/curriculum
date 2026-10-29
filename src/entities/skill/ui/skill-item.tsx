import type { SkillItemProps } from '../model/types'
import { masteryConfig } from '../model/mastery-config'

export function SkillItem({ name, mastery }: SkillItemProps) {
  return (
    <div
      className="flex items-center gap-4"
      role="group"
      aria-label={`${name} — ${mastery}`}
    >
      <div className={`h-1 w-20 ${masteryConfig[mastery].bgClass}`} aria-hidden="true">
        <div
          className={`h-1 ${masteryConfig[mastery].barClass}`}
          aria-hidden="true"
          style={{ width: `${masteryConfig[mastery].progress}%` }}
        />
      </div>
      <h2 className="text-skill-text">{name}</h2>
    </div>
  )
}
