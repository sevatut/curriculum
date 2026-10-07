import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from 'cn'

import type { CvTableSortDirection, CvTableSortKey } from '../model/sort-cv-table-rows'

type CvTableColumnHeaderProps = {
  label: string
  sortKey: CvTableSortKey
  className: string
  direction: CvTableSortDirection | null
  onSort: (key: CvTableSortKey) => void
}

export function CvTableColumnHeader({
  label,
  sortKey,
  className,
  direction,
  onSort,
}: CvTableColumnHeaderProps) {
  const SortIcon = direction === 'desc' ? ArrowDown : ArrowUp

  return (
    <th
      scope="col"
      aria-sort={
        direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none'
      }
      className={cn('px-4 py-4 text-left text-sm', className)}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex cursor-pointer items-center gap-1 font-semibold"
      >
        {label}
        {direction ? <SortIcon className="size-3.5" aria-hidden /> : null}
      </button>
    </th>
  )
}
