import type { EmployeeTableRow } from './employee-table-row'

export function filterEmployeeTableRows(
  rows: readonly EmployeeTableRow[],
  query: string,
  locale: string,
): readonly EmployeeTableRow[] {
  const normalizedQuery = query.trim().replace(/\s+/g, ' ').toLocaleLowerCase(locale)

  if (!normalizedQuery) {
    return rows
  }

  return rows.filter((row) => {
    const fullName = `${row.firstName} ${row.lastName}`
      .replace(/\s+/g, ' ')
      .trim()
      .toLocaleLowerCase(locale)

    return fullName.includes(normalizedQuery)
  })
}
