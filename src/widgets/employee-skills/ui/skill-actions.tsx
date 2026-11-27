'use client'

import { cn } from 'cn'
import { Plus, Trash } from 'lucide-react'
import { useT } from 'next-i18next/client'

import { Button } from '@/shared/ui/button'
import { errorKey } from '@/widgets/employee-skills/model/skill-error'
import type { SkillActionsProps } from '@/widgets/employee-skills/ui/types'

export function SkillActions({
  removing,
  pending,
  error,
  selectedCount,
  canAdd,
  canRemove,
  onAdd,
  onStartRemoving,
  onCancelRemoving,
  onDelete,
}: SkillActionsProps) {
  const { t } = useT('employees')

  return (
    <div className="mt-10 flex flex-col items-end gap-3">
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {t(errorKey[error])}
        </p>
      )}

      <div
        className={cn('flex flex-wrap justify-end', removing ? 'gap-x-4' : 'gap-x-35')}
      >
        {removing ? (
          <>
            <Button
              type="button"
              variant="outlined"
              className="border-border text-muted-foreground hover:border-muted-foreground hover:bg-muted-foreground/10"
              disabled={pending}
              onClick={onCancelRemoving}
            >
              {t('skills.cancel')}
            </Button>
            <Button
              type="button"
              disabled={pending || selectedCount === 0}
              onClick={onDelete}
            >
              {t('skills.delete')}
              {selectedCount > 0 && (
                <span
                  aria-hidden
                  className="ml-7 inline-flex size-6 items-center justify-center rounded-full bg-primary-foreground text-sm text-primary"
                >
                  {selectedCount}
                </span>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="transparent"
              size="compact"
              disabled={!canAdd}
              title={canAdd ? undefined : t('skills.noAvailable')}
              onClick={onAdd}
            >
              <Plus aria-hidden className="size-5 shrink-0 mr-2" />
              {t('skills.add')}
            </Button>

            <Button
              type="button"
              variant="link"
              size="compact"
              disabled={!canRemove}
              onClick={onStartRemoving}
            >
              <Trash aria-hidden className="size-5 shrink-0 mr-2" />
              {t('skills.remove')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
