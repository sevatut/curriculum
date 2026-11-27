import { cn } from 'cn'

import { proficiencyConfig } from '@/entities/language/model/proficiency-config'
import type { Proficiency } from '@/entities/language/model/proficiency'

type LanguageItemProps = {
  name: string
  proficiency: Proficiency
  label: string
  selected?: boolean
}

export function LanguageItem({
  name,
  proficiency,
  label,
  selected = false,
}: LanguageItemProps) {
  return (
    <div
      className="flex items-center gap-3"
      role="group"
      aria-label={`${name} — ${label}`}
    >
      <span
        className={cn(
          'font-medium',
          selected ? 'text-foreground' : proficiencyConfig[proficiency],
        )}
      >
        {label}
      </span>
      <span className={selected ? 'text-foreground' : 'text-skill-text'}>{name}</span>
    </div>
  )
}
