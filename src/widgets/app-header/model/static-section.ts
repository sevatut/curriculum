import type { Crumb } from './crumb'

const sectionLabelKeys = {
  employees: 'nav.employees',
  skills: 'nav.skills',
  languages: 'nav.languages',
  cvs: 'nav.cvs',
} as const

type SectionKey = keyof typeof sectionLabelKeys

function isSectionKey(value: string | undefined): value is SectionKey {
  return value !== undefined && value in sectionLabelKeys
}

export function staticBreadcrumbsFromPath(
  pathname: string,
  lng: string,
  translate: (key: (typeof sectionLabelKeys)[SectionKey]) => string,
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
      label: translate(sectionLabelKeys[section]),
      href: segments.length > 1 ? `/${lng}/${section}` : undefined,
    },
  ]
}
