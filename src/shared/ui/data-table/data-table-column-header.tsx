import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from 'cn'

import type { DataTableColumn, DataTableSort } from '@/shared/ui/data-table/types'

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

  function sortColumn() {
    onSort(column.id)
  }

  return (
    <th
      scope="col"
      aria-sort={ariaSort(Boolean(column.sortValue), direction)}
      className={cn('px-4 py-4 text-left text-sm', column.className)}
    >
      {column.sortValue ? (
        <button
          type="button"
          onClick={sortColumn}
          className="inline-flex cursor-pointer items-center gap-1 rounded-sm font-semibold text-foreground outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[var(--scale-active)]"
        >
          {column.label}
          {direction && <SortIcon className="size-3.5" aria-hidden />}
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
