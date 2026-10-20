import type { ComponentType, SVGProps } from 'react'

import { CvsIcon, EmployeesIcon, LanguagesIcon, SkillsIcon } from './nav-icons'

export const NAV_ITEMS = [
  { path: '/employees', labelKey: 'nav.employees', icon: EmployeesIcon },
  { path: '/skills', labelKey: 'nav.skills', icon: SkillsIcon },
  { path: '/languages', labelKey: 'nav.languages', icon: LanguagesIcon },
  { path: '/cvs', labelKey: 'nav.cvs', icon: CvsIcon },
] as const satisfies ReadonlyArray<{
  path: string
  labelKey: 'nav.employees' | 'nav.skills' | 'nav.languages' | 'nav.cvs'
  icon: ComponentType<SVGProps<SVGSVGElement>>
}>
