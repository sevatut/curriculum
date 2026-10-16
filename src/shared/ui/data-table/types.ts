import type { ReactNode } from 'react'

export type DataTableSort = {
  id: string
  direction: 'asc' | 'desc'
}

export type DataTableColumn<Row> = {
  id: string
  label: string
  className?: string
  cell: (row: Row) => ReactNode
  sortValue?: (row: Row) => string
}

export type DataTableProps<Row extends { id: string }> = {
  columns: readonly DataTableColumn<Row>[]
  rows: readonly Row[]
  caption: string
  emptyLabel: string
  locale: string
  className?: string
  actionsLabel?: string
  renderActions?: (row: Row) => ReactNode
  renderDetails?: (row: Row) => ReactNode
}
