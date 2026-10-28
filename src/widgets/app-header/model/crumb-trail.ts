import type { Crumb } from './crumb'
import type { CrumbTrailItem } from './crumb-trail-item'

const TAB_TRAIL_LENGTH = 3

export function crumbTrail(items: readonly Crumb[]): readonly CrumbTrailItem[] {
  const lastIndex = items.length - 1
  const hasTab = items.length >= TAB_TRAIL_LENGTH
  const primaryIndex = hasTab ? lastIndex - 1 : lastIndex

  return items.map((item, index) => ({
    label: item.label,
    href: hasTab && index === lastIndex ? undefined : item.href,
    isPrimary: index === primaryIndex,
    withSeparator: index > 0,
  }))
}
