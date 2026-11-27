import type { Language, ProfileLanguage } from '@/entities/language/model/language'
import { AddLanguageModal } from '@/widgets/employee-languages/ui/add-language-modal'
import { UpdateLanguageModal } from '@/widgets/employee-languages/ui/update-language-modal'

type LanguageDialogsProps = {
  lng: string
  userId: string
  editing: ProfileLanguage | null
  adding: boolean
  available: Language[]
  onCloseEditing: () => void
  onCloseAdding: () => void
}

export function LanguageDialogs({
  lng,
  userId,
  editing,
  adding,
  available,
  onCloseEditing,
  onCloseAdding,
}: LanguageDialogsProps) {
  return (
    <>
      {editing && (
        <UpdateLanguageModal
          key={editing.id}
          lng={lng}
          userId={userId}
          language={editing}
          onClose={onCloseEditing}
        />
      )}
      {adding && (
        <AddLanguageModal
          lng={lng}
          userId={userId}
          available={available}
          onClose={onCloseAdding}
        />
      )}
    </>
  )
}
