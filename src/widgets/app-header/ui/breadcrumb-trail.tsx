import Link from 'next/link'
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

import { crumbTrail } from '../model/crumb-trail'
import type { Crumb } from '../model/crumb'

export function BreadcrumbTrail({
  items,
  label,
}: {
  items: readonly Crumb[]
  label: string
}) {
  return (
    <Breadcrumb aria-label={label}>
      <BreadcrumbList className="gap-2 pb-1 text-base leading-6 tracking-basic">
        {crumbTrail(items).map((item, index) => (
          <Fragment key={index}>
            {item.withSeparator && (
              <BreadcrumbSeparator>
                <span className="flex size-5 items-center justify-center">
                  <ChevronLeftIcon width={6.17} height={10} className="rotate-180" />
                </span>
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem className="min-w-0">
              {item.href ? (
                <BreadcrumbLink
                  render={<Link href={item.href} />}
                  className={cn(
                    'truncate',
                    item.isPrimary
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
                    item.isPrimary ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
