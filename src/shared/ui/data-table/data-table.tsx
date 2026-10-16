'use client'

import { useState } from 'react'
import { cn } from 'cn'

import { DataTableBody } from './data-table-body'
import { DataTableColumnHeader } from './data-table-column-header'
import { nextSort, sortRows } from './sort-rows'
import type { DataTableProps, DataTableSort } from './types'

export function DataTable<Row extends { id: string }>({
  columns,
  rows,
  caption,
  emptyLabel,
  locale,
  className,
  actionsLabel,
  renderActions,
  renderDetails,
}: DataTableProps<Row>) {
  const [sort, setSort] = useState<DataTableSort | null>(null)
  const sortedRows = sortRows(rows, columns, sort, locale)
  const columnCount = columns.length + (renderActions ? 1 : 0)

  function handleSort(id: string) {
    setSort((current) => nextSort(current, id))
  }

  return (
    <table className={cn('w-full border-collapse', className)}>
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-border">
        <tr>
          {columns.map((column) => (
            <DataTableColumnHeader
              key={column.id}
              column={column}
              direction={sort?.id === column.id ? sort.direction : null}
              onSort={handleSort}
            />
          ))}
          {renderActions ? (
            <th scope="col" className="py-5">
              <span className="sr-only">{actionsLabel}</span>
            </th>
          ) : null}
        </tr>
      </thead>
      <DataTableBody
        columns={columns}
        rows={sortedRows}
        columnCount={columnCount}
        emptyLabel={emptyLabel}
        renderActions={renderActions}
        renderDetails={renderDetails}
      />
    </table>
  )
}
