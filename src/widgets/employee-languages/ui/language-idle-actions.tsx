'use client'

import { Plus, Trash } from 'lucide-react'
import { useT } from 'next-i18next/client'

import { Button } from '@/shared/ui/button'
import { LanguageActionErrorMessage } from '@/widgets/employee-languages/ui/language-action-error'
import type { LanguageActionsProps } from '@/widgets/employee-languages/ui/types'

export function LanguageIdleActions({
  error,
  canAdd,
  canRemove,
  onAdd,
  onStartRemoving,
}: LanguageActionsProps) {
  const { t } = useT('employees')
  const addTitle = canAdd ? undefined : t('languages.noAvailable')

  return (
    <div className="mt-10 flex flex-col items-end gap-3">
      <LanguageActionErrorMessage error={error} />
      <div className="flex flex-wrap justify-end gap-x-35">
        <Button
          type="button"
          variant="transparent"
          size="compact"
          disabled={!canAdd}
          title={addTitle}
          onClick={onAdd}
        >
          <Plus aria-hidden className="mr-2 size-5 shrink-0" />
          {t('languages.add')}
        </Button>
        <Button
          type="button"
          variant="link"
          size="compact"
          disabled={!canRemove}
          onClick={onStartRemoving}
        >
          <Trash aria-hidden className="mr-2 size-5 shrink-0" />
          {t('languages.remove')}
        </Button>
      </div>
    </div>
  )
}
