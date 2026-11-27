'use client'

import { useState, useTransition } from 'react'

import type { ProfileLanguage } from '@/entities/language/model/language'
import { deleteEmployeeLanguages } from '@/widgets/employee-languages/api/delete-employee-languages'
import { availableLanguages } from '@/widgets/employee-languages/model/available-languages'
import type { LanguageActionError } from '@/widgets/employee-languages/model/language-form'
import { LanguageActions } from '@/widgets/employee-languages/ui/language-actions'
import { LanguageDialogs } from '@/widgets/employee-languages/ui/language-dialogs'
import { LanguageList } from '@/widgets/employee-languages/ui/language-list'
import type { EmployeeLanguagesProps } from '@/widgets/employee-languages/ui/types'

export function EmployeeLanguages({
  lng,
  userId,
  languages,
  catalog,
  editable,
}: EmployeeLanguagesProps) {
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<ProfileLanguage | null>(null)
  const [removing, setRemoving] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<LanguageActionError>()
  const [pending, startTransition] = useTransition()

  const available = availableLanguages(catalog, languages)

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

  function stopAdding() {
    setAdding(false)
  }

  function stopEditing() {
    setEditing(null)
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
      const result = await deleteEmployeeLanguages(lng, userId, selected)

      if (result.error) setError(result.error)
      else stopRemoving()
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-310 flex-1 flex-col px-6 pt-8">
      <LanguageList
        languages={languages}
        selectable={removing}
        selected={selected}
        onToggle={toggle}
        onOpen={editable ? setEditing : undefined}
      />

      {editable && (
        <LanguageActions
          removing={removing}
          pending={pending}
          error={error}
          selectedCount={selected.length}
          canAdd={available.length > 0}
          canRemove={languages.length > 0}
          onAdd={startAdding}
          onStartRemoving={startRemoving}
          onCancelRemoving={stopRemoving}
          onDelete={removeSelected}
        />
      )}

      <LanguageDialogs
        lng={lng}
        userId={userId}
        editing={editing}
        adding={adding}
        available={available}
        onCloseEditing={stopEditing}
        onCloseAdding={stopAdding}
      />
    </div>
  )
}
