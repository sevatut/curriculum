import type { CvTableRow } from './cv-table-row'

export type CvTableSortKey = 'name' | 'education' | 'employee'

export type CvTableSortDirection = 'asc' | 'desc'

export type CvTableSort = {
  key: CvTableSortKey
  direction: CvTableSortDirection
}

export function nextCvTableSort(
  current: CvTableSort | null,
  key: CvTableSortKey,
): CvTableSort {
  if (current?.key !== key) {
    return { key, direction: 'asc' }
  }

  return {
    key,
    direction: current.direction === 'asc' ? 'desc' : 'asc',
  }
}

export function sortCvTableRows(
  rows: readonly CvTableRow[],
  sort: CvTableSort | null,
  locale: string,
): readonly CvTableRow[] {
  if (!sort) {
    return rows
  }

  const direction = sort.direction === 'asc' ? 1 : -1

  return [...rows].sort(
    (left, right) =>
      left[sort.key].localeCompare(right[sort.key], locale, {
        sensitivity: 'base',
      }) * direction,
  )
}
