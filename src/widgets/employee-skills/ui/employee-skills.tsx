'use client'

import { cn } from 'cn'
import { Plus, Trash } from 'lucide-react'
import { useT } from 'next-i18next/client'
import { useState, useTransition } from 'react'

import type { ProfileSkill } from '@/entities/skill/model/skill'
import { Button } from '@/shared/ui/button'
import { deleteEmployeeSkills } from '@/widgets/employee-skills/api/delete-employee-skills'
import { availableSkills } from '@/widgets/employee-skills/model/available-skills'
import { errorKey } from '@/widgets/employee-skills/model/skill-error'
import type { SkillActionError } from '@/widgets/employee-skills/model/skill-form'
import { groupSkillsByCategory } from '@/widgets/employee-skills/model/skill-groups'
import { AddSkillModal } from '@/widgets/employee-skills/ui/add-skill-modal'
import { SkillGroupList } from '@/widgets/employee-skills/ui/skill-group-list'
import { UpdateSkillModal } from '@/widgets/employee-skills/ui/update-skill-modal'
import type { EmployeeSkillsProps } from '@/widgets/employee-skills/ui/types'

export function EmployeeSkills({
  lng,
  userId,
  skills,
  categories,
  catalog,
  editable,
}: EmployeeSkillsProps) {
  const { t } = useT('employees')
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<ProfileSkill | null>(null)
  const [removing, setRemoving] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<SkillActionError>()
  const [pending, startTransition] = useTransition()

  const groups = groupSkillsByCategory(skills, categories)
  const available = availableSkills(catalog, skills)

  function toggle(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    )
  }

  function stopRemoving() {
    setRemoving(false)
    setSelected([])
    setError(undefined)
  }

  function removeSelected() {
    startTransition(async () => {
      const result = await deleteEmployeeSkills(lng, userId, selected)

      if (result.error) setError(result.error)
      else stopRemoving()
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-310 flex-1 flex-col px-6 pt-8">
      {groups.length > 0 && (
        <SkillGroupList
          groups={groups}
          selectable={removing}
          selected={selected}
          onToggle={toggle}
          onOpen={editable ? setEditing : undefined}
        />
      )}

      {editable && (
        <div className="mt-10 flex flex-col items-end gap-3">
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {t(errorKey[error])}
            </p>
          )}

          <div
            className={cn(
              'flex flex-wrap justify-end',
              removing ? 'gap-x-4' : 'gap-x-35',
            )}
          >
            {removing ? (
              <>
                <Button
                  type="button"
                  variant="outlined"
                  className="border-border text-muted-foreground hover:border-muted-foreground hover:bg-muted-foreground/10"
                  disabled={pending}
                  onClick={stopRemoving}
                >
                  {t('skills.cancel')}
                </Button>
                <Button
                  type="button"
                  disabled={pending || selected.length === 0}
                  onClick={removeSelected}
                >
                  {t('skills.delete')}
                  {selected.length > 0 && (
                    <span
                      aria-hidden
                      className="ml-7 inline-flex size-6 items-center justify-center rounded-full bg-primary-foreground text-sm text-primary"
                    >
                      {selected.length}
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
                  disabled={available.length === 0}
                  title={available.length === 0 ? t('skills.noAvailable') : undefined}
                  onClick={() => setAdding(true)}
                >
                  <Plus aria-hidden className="size-5 shrink-0 mr-2" />
                  {t('skills.add')}
                </Button>

                <Button
                  type="button"
                  variant="link"
                  size="compact"
                  disabled={skills.length === 0}
                  onClick={() => setRemoving(true)}
                >
                  <Trash aria-hidden className="size-5 shrink-0 mr-2" />
                  {t('skills.remove')}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {editing && (
        <UpdateSkillModal
          key={editing.id}
          lng={lng}
          userId={userId}
          skill={editing}
          onClose={() => setEditing(null)}
        />
      )}

      {adding && (
        <AddSkillModal
          lng={lng}
          userId={userId}
          available={available}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  )
}
