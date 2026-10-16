import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from 'cn'

import type { DataTableColumn, DataTableSort } from './types'

type DataTableColumnHeaderProps<Row> = {
  column: DataTableColumn<Row>
  direction: DataTableSort['direction'] | null
  onSort: (id: string) => void
}

export function DataTableColumnHeader<Row>({
  column,
  direction,
  onSort,
}: DataTableColumnHeaderProps<Row>) {
  const SortIcon = direction === 'desc' ? ArrowDown : ArrowUp

  return (
    <th
      scope="col"
      aria-sort={ariaSort(Boolean(column.sortValue), direction)}
      className={cn('px-4 py-4 text-left text-sm', column.className)}
    >
      {column.sortValue ? (
        <button
          type="button"
          onClick={() => onSort(column.id)}
          className="inline-flex cursor-pointer items-center gap-1 font-semibold"
        >
          {column.label}
          {direction ? <SortIcon className="size-3.5" aria-hidden /> : null}
        </button>
      ) : (
        column.label
      )}
    </th>
  )
}

function ariaSort(
  sortable: boolean,
  direction: DataTableSort['direction'] | null,
): 'ascending' | 'descending' | 'none' | undefined {
  if (!sortable) {
    return undefined
  }

  if (direction === 'asc') {
    return 'ascending'
  }

  if (direction === 'desc') {
    return 'descending'
  }

  return 'none'
}
