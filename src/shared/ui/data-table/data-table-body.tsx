import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from 'cn'

import type { DataTableColumn } from '@/shared/ui/data-table/types'

const cellClassName = 'py-7 pl-4 text-left text-sm leading-5'
const rowLinkClassName = 'absolute inset-0 z-10 cursor-pointer'
const linkedCellClassName =
  'pointer-events-none origin-left transition-[scale,color] duration-[var(--transition-duration)] ease-[var(--transition-timing-function)] group-hover/row:scale-[1.15] group-active/row:scale-[1] group-active/row:text-primary'

type DataTableBodyProps<Row extends { id: string }> = {
  columns: readonly DataTableColumn<Row>[]
  rows: readonly Row[]
  columnCount: number
  emptyLabel: string
  renderActions?: (row: Row) => ReactNode
  renderDetails?: (row: Row) => ReactNode
  rowHref?: (row: Row) => string
  rowLabel?: (row: Row) => string
}

export function DataTableBody<Row extends { id: string }>({
  columns,
  rows,
  columnCount,
  emptyLabel,
  renderActions,
  renderDetails,
  rowHref,
  rowLabel,
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
    <DataTableRow
      key={row.id}
      row={row}
      columns={columns}
      columnCount={columnCount}
      href={rowHref?.(row)}
      label={rowLabel?.(row) ?? row.id}
      renderActions={renderActions}
      renderDetails={renderDetails}
    />
  ))
}

type DataTableRowProps<Row extends { id: string }> = {
  row: Row
  columns: readonly DataTableColumn<Row>[]
  columnCount: number
  href?: string
  label: string
  renderActions?: (row: Row) => ReactNode
  renderDetails?: (row: Row) => ReactNode
}

function DataTableRow<Row extends { id: string }>({
  row,
  columns,
  columnCount,
  href,
  label,
  renderActions,
  renderDetails,
}: DataTableRowProps<Row>) {
  return (
    <tbody className="border-b border-border">
      <tr className={cn(href && 'group/row')}>
        {columns.map((column, index) => (
          <td
            key={column.id}
            className={cn(cellClassName, column.className, href && 'relative')}
          >
            {href && (
              <DataTableRowLink href={href} label={index === 0 ? label : undefined} />
            )}
            <LinkedCellContent linked={Boolean(href)}>
              {column.cell(row)}
            </LinkedCellContent>
          </td>
        ))}
        {renderActions && (
          <td className={cn(cellClassName, 'relative z-20')}>{renderActions(row)}</td>
        )}
      </tr>
      {renderDetails && (
        <tr>
          <td
            colSpan={columnCount}
            className="px-4 pb-5 text-base leading-6 tracking-basic text-muted-foreground"
          >
            {renderDetails(row)}
          </td>
        </tr>
      )}
    </tbody>
  )
}

type LinkedCellContentProps = {
  linked: boolean
  children: ReactNode
}

function LinkedCellContent({ linked, children }: LinkedCellContentProps) {
  if (!linked) {
    return children
  }

  return <div className={linkedCellClassName}>{children}</div>
}

type DataTableRowLinkProps = {
  href: string
  label?: string
}

function DataTableRowLink({ href, label }: DataTableRowLinkProps) {
  if (!label) {
    return <Link href={href} tabIndex={-1} aria-hidden className={rowLinkClassName} />
  }

  return (
    <Link href={href} className={rowLinkClassName}>
      <span className="sr-only">{label}</span>
    </Link>
  )
}
