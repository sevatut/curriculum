import type { Language, ProfileLanguage } from '@/entities/language/model/language'
import type { LanguageActionError } from '@/widgets/employee-languages/model/language-form'

export type EmployeeLanguagesProps = {
  lng: string
  userId: string
  languages: ProfileLanguage[]
  catalog: Language[]
  editable: boolean
}

export type AddLanguageModalProps = {
  lng: string
  userId: string
  available: Language[]
  onClose: () => void
}

export type UpdateLanguageModalProps = {
  lng: string
  userId: string
  language: ProfileLanguage
  onClose: () => void
}

export type LanguageListProps = {
  languages: readonly ProfileLanguage[]
  selectable: boolean
  selected: readonly string[]
  onToggle: (name: string) => void
  onOpen?: (language: ProfileLanguage) => void
}

export type LanguageEntryProps = {
  language: ProfileLanguage
  label: string
  selectable: boolean
  selected: boolean
  onToggle: (name: string) => void
  onOpen?: (language: ProfileLanguage) => void
}

export type LanguageActionsProps = {
  removing: boolean
  pending: boolean
  error?: LanguageActionError
  selectedCount: number
  canAdd: boolean
  canRemove: boolean
  onAdd: () => void
  onStartRemoving: () => void
  onCancelRemoving: () => void
  onDelete: () => void
}
