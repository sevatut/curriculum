export function departmentDisplayName(name: string) {
  const match = name.match(/\(([^)]+)\)\s*$/)
  const shortName = match?.[1]?.trim()
  return shortName || name.trim()
}
