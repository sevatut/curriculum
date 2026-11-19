import { appRoutes } from '@/shared/routes'
import { navIconShapes } from '@/widgets/app-sidebar/ui/nav-icon-shapes'
import type { NavIconShape } from '@/widgets/app-sidebar/ui/types'

export const navItems = [
  {
    href: appRoutes.employees.list,
    labelKey: 'nav.employees',
    icon: navIconShapes.employees,
  },
  { href: appRoutes.skills.list, labelKey: 'nav.skills', icon: navIconShapes.skills },
  {
    href: appRoutes.languages.list,
    labelKey: 'nav.languages',
    icon: navIconShapes.languages,
  },
  { href: appRoutes.cvs.list, labelKey: 'nav.cvs', icon: navIconShapes.cvs },
] as const satisfies ReadonlyArray<{
  href: (lng: string) => string
  labelKey: 'nav.employees' | 'nav.skills' | 'nav.languages' | 'nav.cvs'
  icon: NavIconShape
}>
