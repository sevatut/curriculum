import type { Crumb } from '../model/crumb'

export type BreadcrumbContextValue = {
  items: readonly Crumb[] | null
  setItems: (items: readonly Crumb[] | null) => void
}
