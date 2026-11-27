'use client'

import { useState, useTransition } from 'react'

import type { ProfileSkill } from '@/entities/skill/model/skill'
import { deleteEmployeeSkills } from '@/widgets/employee-skills/api/delete-employee-skills'
import { availableSkills } from '@/widgets/employee-skills/model/available-skills'
import type { SkillActionError } from '@/widgets/employee-skills/model/skill-form'
import { groupSkillsByCategory } from '@/widgets/employee-skills/model/skill-groups'
import { AddSkillModal } from '@/widgets/employee-skills/ui/add-skill-modal'
import { SkillActions } from '@/widgets/employee-skills/ui/skill-actions'
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

  function startAdding() {
    setAdding(true)
  }

  function startRemoving() {
    setRemoving(true)
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
        <SkillActions
          removing={removing}
          pending={pending}
          error={error}
          selectedCount={selected.length}
          canAdd={available.length > 0}
          canRemove={skills.length > 0}
          onAdd={startAdding}
          onStartRemoving={startRemoving}
          onCancelRemoving={stopRemoving}
          onDelete={removeSelected}
        />
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
