'use client'

import { usePathname } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { staticBreadcrumbsFromPath } from '@/widgets/app-header/model/static-section'
import { BreadcrumbTrail } from '@/widgets/app-header/ui/breadcrumb-trail'
import { useBreadcrumbs } from '@/widgets/app-header/ui/breadcrumb-context'

export function AppBreadcrumbs({ lng }: { lng: string }) {
  const pathname = usePathname()
  const { items: customItems } = useBreadcrumbs()
  const { t: tCommon } = useT('common')
  const { t: tHome } = useT('home')

  const items =
    customItems ?? staticBreadcrumbsFromPath(pathname, lng, tCommon, tHome('title'))

  return <BreadcrumbTrail items={items} label={tCommon('breadcrumb.label')} />
}
