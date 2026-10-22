import type { Crumb } from './crumb'

const SECTION_LABEL_KEYS = {
  employees: 'nav.employees',
  skills: 'nav.skills',
  languages: 'nav.languages',
  cvs: 'nav.cvs',
} as const

type SectionKey = keyof typeof SECTION_LABEL_KEYS

function isSectionKey(value: string | undefined): value is SectionKey {
  return value !== undefined && value in SECTION_LABEL_KEYS
}

export function staticBreadcrumbsFromPath(
  pathname: string,
  lng: string,
  translate: (key: (typeof SECTION_LABEL_KEYS)[SectionKey]) => string,
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
      label: translate(SECTION_LABEL_KEYS[section]),
      href: segments.length > 1 ? `/${lng}/${section}` : undefined,
    },
  ]
}
