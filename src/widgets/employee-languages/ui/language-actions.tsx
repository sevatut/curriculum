import { LanguageIdleActions } from '@/widgets/employee-languages/ui/language-idle-actions'
import { LanguageRemovingActions } from '@/widgets/employee-languages/ui/language-removing-actions'
import type { LanguageActionsProps } from '@/widgets/employee-languages/ui/types'

export function LanguageActions(props: LanguageActionsProps) {
  if (props.removing) return <LanguageRemovingActions {...props} />

  return <LanguageIdleActions {...props} />
}
