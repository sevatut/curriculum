import type { Language, ProfileLanguage } from '@/entities/language/model/language'
import { normalizeLanguageName } from '@/widgets/employee-languages/model/language-name'

export function availableLanguages(
  catalog: readonly Language[],
  owned: readonly ProfileLanguage[],
): Language[] {
  const taken = new Set(owned.map((language) => normalizeLanguageName(language.name)))
  return catalog.filter((language) => !taken.has(normalizeLanguageName(language.name)))
}
