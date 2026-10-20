import type { ReactNode } from 'react'
import { cn } from 'cn'

import type { DataTableColumn } from './types'

const cellClassName = 'py-7 pl-4 text-left text-sm leading-5'

type DataTableBodyProps<Row extends { id: string }> = {
  columns: readonly DataTableColumn<Row>[]
  rows: readonly Row[]
  columnCount: number
  emptyLabel: string
  renderActions?: (row: Row) => ReactNode
  renderDetails?: (row: Row) => ReactNode
}

export function DataTableBody<Row extends { id: string }>({
  columns,
  rows,
  columnCount,
  emptyLabel,
  renderActions,
  renderDetails,
}: DataTableBodyProps<Row>) {
  if (rows.length === 0) {
    return (
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
    )
  }

  return rows.map((row) => (
    <tbody key={row.id} className="border-b border-border">
      <tr>
        {columns.map((column) => (
          <td key={column.id} className={cn(cellClassName, column.className)}>
            {column.cell(row)}
          </td>
        ))}
        {renderActions ? <td className={cellClassName}>{renderActions(row)}</td> : null}
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
}
