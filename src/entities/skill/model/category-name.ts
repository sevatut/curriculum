const PREFIXED_NAME = /^Category\s+\d+\s*\((.+)\)$/i

export function formatCategoryName(name: string): string {
  const match = PREFIXED_NAME.exec(name.trim())
  return match ? match[1].trim() : name
}
