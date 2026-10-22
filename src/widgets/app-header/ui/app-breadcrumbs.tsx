'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from 'next-i18next/client'
import { Fragment } from 'react'
import { cn } from 'cn'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb'
import { ChevronLeftIcon } from '@/shared/ui/chevron-left-icon'

import { staticBreadcrumbsFromPath } from '../model/static-section'
import { useBreadcrumbs } from './breadcrumb-context'

const TAB_TRAIL_LENGTH = 3

export function AppBreadcrumbs({ lng }: { lng: string }) {
  const pathname = usePathname()
  const { items: customItems } = useBreadcrumbs()
  const { t: tCommon } = useT('common')
  const { t: tHome } = useT('home')

  const items =
    customItems ?? staticBreadcrumbsFromPath(pathname, lng, tCommon, tHome('title'))

  const lastIndex = items.length - 1
  const hasTab = items.length >= TAB_TRAIL_LENGTH
  const primaryIndex = hasTab ? lastIndex - 1 : lastIndex

  return (
    <Breadcrumb aria-label={tCommon('breadcrumb.label')}>
      <BreadcrumbList className="gap-2 pb-1 text-base leading-6 tracking-basic">
        {items.map((item, index) => {
          const isPrimary = index === primaryIndex
          const href = hasTab && index === lastIndex ? undefined : item.href

          return (
            <Fragment key={index}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  <span className="flex size-5 items-center justify-center">
                    <ChevronLeftIcon width={6.17} height={10} className="rotate-180" />
                  </span>
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem className="min-w-0">
                {href ? (
                  <BreadcrumbLink
                    render={<Link href={href} />}
                    className={cn(
                      'truncate',
                      isPrimary
                        ? 'text-primary hover:text-primary/80'
                        : 'hover:text-primary',
                    )}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage
                    className={cn(
                      'truncate',
                      isPrimary ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
