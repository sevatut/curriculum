'use client'

import { useState, type ChangeEvent } from 'react'
import { useT } from 'next-i18next/client'

import type { Actor } from '@/entities/user/model/access'
import { CreateCvButton } from '@/features/cv/create-cv'
import { SearchInput } from '@/shared/ui/search-input/search-input'
import { filterCvTableRows } from '@/widgets/cv-table/model/filter-cv-table-rows'
import type { CvTableRow } from '@/widgets/cv-table/model/cv-table-row'
import { CvTable } from '@/widgets/cv-table/ui/cv-table'

type CvTableSectionProps = {
  rows: readonly CvTableRow[]
  actor: Actor | null
}

export function CvTableSection({ rows, actor }: CvTableSectionProps) {
  const { i18n, t } = useT('cvs')
  const [query, setQuery] = useState('')
  const filteredRows = filterCvTableRows(rows, query, i18n.language)

  function onQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  return (
    <div className="flex flex-1 flex-col tracking-basic">
      <div className="my-2 flex items-center justify-between gap-6">
        <SearchInput
          className="ml-5 max-w-(--search-max-width)"
          value={query}
          onChange={onQueryChange}
          aria-label={t('search')}
        />
        {actor && <CreateCvButton className="mr-6" />}
      </div>
      <CvTable rows={filteredRows} actor={actor} />
    </div>
  )
}
