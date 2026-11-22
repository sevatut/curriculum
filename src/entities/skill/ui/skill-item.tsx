import { cn } from 'cn'

import { masteryConfig } from '@/entities/skill/model/mastery-config'
import type { SkillItemProps } from '@/entities/skill/model/types'

export function SkillItem({ name, mastery, selected = false }: SkillItemProps) {
  const config = masteryConfig[mastery]

  return (
    <div
      className="flex items-center gap-4"
      role="group"
      aria-label={`${name} — ${mastery}`}
    >
      <div
        className={cn('h-1 w-20', selected ? 'bg-novice' : config.bgClass)}
        aria-hidden="true"
      >
        {!selected && (
          <div
            className={`h-1 ${config.barClass}`}
            aria-hidden="true"
            style={{ width: `${config.progress}%` }}
          />
        )}
      </div>
      <span className={selected ? 'text-foreground' : 'text-skill-text'}>{name}</span>
    </div>
  )
}
