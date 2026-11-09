import { navIconShapes } from '@/widgets/app-sidebar/ui/nav-icon-shapes'
import type { NavIconShape } from '@/widgets/app-sidebar/ui/types'

export const navItems = [
  { path: '/employees', labelKey: 'nav.employees', icon: navIconShapes.employees },
  { path: '/skills', labelKey: 'nav.skills', icon: navIconShapes.skills },
  { path: '/languages', labelKey: 'nav.languages', icon: navIconShapes.languages },
  { path: '/cvs', labelKey: 'nav.cvs', icon: navIconShapes.cvs },
] as const satisfies ReadonlyArray<{
  path: string
  labelKey: 'nav.employees' | 'nav.skills' | 'nav.languages' | 'nav.cvs'
  icon: NavIconShape
}>
