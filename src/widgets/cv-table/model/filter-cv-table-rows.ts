import type { CvTableRow } from './cv-table-row'

export function filterCvTableRows(
  rows: readonly CvTableRow[],
  query: string,
  locale: string,
): readonly CvTableRow[] {
  const normalizedQuery = query.trim().toLocaleLowerCase(locale)

  if (!normalizedQuery) {
    return rows
  }

  return rows.filter((row) => {
    const name = row.name.toLocaleLowerCase(locale)
    const description = row.description.toLocaleLowerCase(locale)

    return name.includes(normalizedQuery) || description.includes(normalizedQuery)
  })
}
