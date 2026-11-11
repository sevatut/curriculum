import { appRoutes } from '@/shared/routes'
import type { Crumb } from '@/widgets/app-header/model/crumb'

const sections = {
  employees: { labelKey: 'nav.employees', href: appRoutes.employees.list },
  skills: { labelKey: 'nav.skills', href: appRoutes.skills.list },
  languages: { labelKey: 'nav.languages', href: appRoutes.languages.list },
  cvs: { labelKey: 'nav.cvs', href: appRoutes.cvs.list },
} as const

type SectionKey = keyof typeof sections

function isSectionKey(value: string | undefined): value is SectionKey {
  return value !== undefined && value in sections
}

export function staticBreadcrumbsFromPath(
  pathname: string,
  lng: string,
  translate: (key: (typeof sections)[SectionKey]['labelKey']) => string,
  homeLabel: string,
): readonly Crumb[] {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === lng) segments.shift()

  const [section] = segments
  if (!isSectionKey(section)) {
    return [{ label: homeLabel }]
  }

  return [
    {
      label: translate(sections[section].labelKey),
      href: segments.length > 1 ? sections[section].href(lng) : undefined,
    },
  ]
}
