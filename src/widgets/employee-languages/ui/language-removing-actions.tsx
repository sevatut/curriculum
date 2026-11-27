'use client'

import { useT } from 'next-i18next/client'

import { Button } from '@/shared/ui/button'
import { LanguageActionErrorMessage } from '@/widgets/employee-languages/ui/language-action-error'
import type { LanguageActionsProps } from '@/widgets/employee-languages/ui/types'

export function LanguageRemovingActions({
  pending,
  error,
  selectedCount,
  onCancelRemoving,
  onDelete,
}: LanguageActionsProps) {
  const { t } = useT('employees')

  return (
    <div className="mt-10 flex flex-col items-end gap-3">
      <LanguageActionErrorMessage error={error} />
      <div className="flex flex-wrap justify-end gap-x-4">
        <Button
          type="button"
          variant="outlined"
          className="border-border text-muted-foreground hover:border-muted-foreground hover:bg-muted-foreground/10"
          disabled={pending}
          onClick={onCancelRemoving}
        >
          {t('languages.cancel')}
        </Button>
        <Button
          type="button"
          disabled={pending || selectedCount === 0}
          onClick={onDelete}
        >
          {t('languages.delete')}
          <SelectedCount count={selectedCount} />
        </Button>
      </div>
    </div>
  )
}

function SelectedCount({ count }: { count: number }) {
  if (count === 0) return null

  return (
    <span
      aria-hidden
      className="ml-7 inline-flex size-6 items-center justify-center rounded-full bg-primary-foreground text-sm text-primary"
    >
      {count}
    </span>
  )
}
