'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from 'cn'

import type { PageTabsProps } from './types'

const tabClassName =
  'flex h-full w-full min-w-0 items-center justify-center border-b-2 border-transparent px-2 text-sm font-medium uppercase leading-(--page-tab-leading) tracking-page-tabs text-foreground outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-inset'

export function PageTabs({ tabs, label, children, className }: PageTabsProps) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className={cn('flex flex-1 flex-col', className)}>
      <nav aria-label={label} className="overflow-x-auto">
        <ul className="flex h-(--page-tab-height) w-max px-5">
          {tabs.map((tab) => {
            const active = tab.segment === segment

            return (
              <li key={tab.href} className="h-full w-(--page-tab-width) shrink-0">
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    tabClassName,
                    active ? 'border-primary text-primary' : 'hover:text-primary/80',
                  )}
                >
                  <span className="min-w-0 truncate">{tab.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {children}
    </div>
  )
}
