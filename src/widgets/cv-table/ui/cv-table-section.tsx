'use client'

import { useState } from 'react'
import { useT } from 'next-i18next/client'

import { CreateButton } from '@/shared/ui/create-button'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'

import { filterCvTableRows } from '../model/filter-cv-table-rows'
import type { CvTableRow } from '../model/cv-table-row'
import { CvTable } from './cv-table'

type CvTableSectionProps = {
  rows: readonly CvTableRow[]
}

export function CvTableSection({ rows }: CvTableSectionProps) {
  const { i18n, t } = useT('cvs')
  const [query, setQuery] = useState('')
  const filteredRows = filterCvTableRows(rows, query, i18n.language)

  return (
    <div className="flex flex-1 flex-col tracking-basic">
      <div className="my-2 flex items-center justify-between gap-6">
        <SearchInput
          className="ml-5 max-w-[320px]"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={t('search')}
        />
        <CreateButton className="mr-6">{t('create')}</CreateButton>
      </div>
      <CvTable rows={filteredRows} />
    </div>
  )
}
