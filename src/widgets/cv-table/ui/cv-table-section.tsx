'use client'

import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useT } from 'next-i18next/client'

import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'

import { filterCvTableRows } from '../model/filter-cv-table-rows'
import type { CvTableRow } from '../model/cv-table-row'
import { CvTable } from './cv-table'

type CvTableSectionProps = {
  rows: readonly CvTableRow[]
}

export function CvTableSection({ rows }: CvTableSectionProps) {
  const { i18n, t } = useT('common')
  const [query, setQuery] = useState('')
  const filteredRows = useMemo(
    () => filterCvTableRows(rows, query, i18n.language),
    [i18n.language, query, rows],
  )

  return (
    <>
      <div className="my-2 flex items-center justify-between gap-6">
        <SearchInput
          className="ml-5 max-w-[320px]"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={t('cv.search')}
        />
        <Button variant="link" size="compact" className="mr-6">
          <Plus className="size-4" aria-hidden />
          {t('cv.create')}
        </Button>
      </div>
      <CvTable rows={filteredRows} />
    </>
  )
}
