'use client'

import { useT } from 'next-i18next/client'

import { LanguageEntry } from '@/widgets/employee-languages/ui/language-entry'
import type { LanguageListProps } from '@/widgets/employee-languages/ui/types'

export function LanguageList({
  languages,
  selectable,
  selected,
  onToggle,
  onOpen,
}: LanguageListProps) {
  const { t } = useT('employees')

  if (languages.length === 0) {
    return <p className="text-muted-foreground">{t('languages.empty')}</p>
  }

  return (
    <ul className="grid grid-cols-3 gap-x-0 gap-y-6 pl-4">
      {languages.map((language) => (
        <LanguageEntry
          key={language.id}
          language={language}
          label={t(`languages.levels.${language.proficiency}`)}
          selectable={selectable}
          selected={selected.includes(language.name)}
          onToggle={onToggle}
          onOpen={onOpen}
        />
      ))}
    </ul>
  )
}
