import type { DataTableColumn, DataTableSort } from './types'

export function nextSort(current: DataTableSort | null, id: string): DataTableSort {
  if (current?.id !== id) {
    return { id, direction: 'asc' }
  }

  return {
    id,
    direction: current.direction === 'asc' ? 'desc' : 'asc',
  }
}

export function sortRows<Row>(
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
