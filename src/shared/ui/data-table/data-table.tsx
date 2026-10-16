'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from 'cn'

import type { DataTableColumn, DataTableProps, DataTableSort } from './types'

const cellClassName = 'py-7 pl-4 text-left text-sm leading-5'

function nextSort(current: DataTableSort | null, id: string): DataTableSort {
  if (current?.id !== id) {
    return { id, direction: 'asc' }
  }

  return {
    id,
    direction: current.direction === 'asc' ? 'desc' : 'asc',
  }
}

function sortRows<Row>(
  rows: readonly Row[],
  columns: readonly DataTableColumn<Row>[],
  sort: DataTableSort | null,
  locale: string,
): readonly Row[] {
  if (!sort) {
    return rows
  }

  const sortValue = columns.find((column) => column.id === sort.id)?.sortValue

  if (!sortValue) {
    return rows
  }

  const direction = sort.direction === 'asc' ? 1 : -1

  return [...rows].sort(
    (left, right) =>
      sortValue(left).localeCompare(sortValue(right), locale, {
        sensitivity: 'base',
      }) * direction,
  )
}

function DataTableColumnHeader<Row>({
  column,
  direction,
  onSort,
}: {
  column: DataTableColumn<Row>
  direction: DataTableSort['direction'] | null
  onSort: (id: string) => void
}) {
  const SortIcon = direction === 'desc' ? ArrowDown : ArrowUp

  return (
    <th
      scope="col"
      aria-sort={
        column.sortValue
          ? direction === 'asc'
            ? 'ascending'
            : direction === 'desc'
              ? 'descending'
              : 'none'
          : undefined
      }
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
      {sortedRows.length === 0 ? (
        <tbody>
          <tr>
            <td
              colSpan={columnCount}
              className="px-4 py-7 text-sm leading-5 text-muted-foreground"
            >
              {emptyLabel}
            </td>
          </tr>
        </tbody>
      ) : (
        sortedRows.map((row) => (
          <tbody key={row.id} className="border-b border-border">
            <tr>
              {columns.map((column) => (
                <td key={column.id} className={cn(cellClassName, column.className)}>
                  {column.cell(row)}
                </td>
              ))}
              {renderActions ? (
                <td className={cellClassName}>{renderActions(row)}</td>
              ) : null}
            </tr>
            {renderDetails ? (
              <tr>
                <td
                  colSpan={columnCount}
                  className="px-4 pb-5 text-base leading-6 tracking-basic text-muted-foreground"
                >
                  {renderDetails(row)}
                </td>
              </tr>
            ) : null}
          </tbody>
        ))
      )}
    </table>
  )
}
