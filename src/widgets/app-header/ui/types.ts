import type { Crumb } from '@/widgets/app-header/model/crumb'

export type BreadcrumbContextValue = {
  items: readonly Crumb[] | null
  setItems: (items: readonly Crumb[] | null) => void
}
