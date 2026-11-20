const prefixedName = /^Category\s+\d+\s*\((.+)\)$/i

export function formatCategoryName(name: string): string {
  const match = prefixedName.exec(name.trim())
  return match ? match[1].trim() : name
}
