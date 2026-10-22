'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { useLayoutEffect } from 'react'

import type { PageTab } from '@/shared/ui/page-tabs'

import type { Crumb } from '../model/crumb'
import { useBreadcrumbs } from './breadcrumb-context'

export function TabbedSetBreadcrumbs({
  items,
  tabs,
}: {
  items: readonly Crumb[]
  tabs: readonly Pick<PageTab, 'segment' | 'label'>[]
}) {
  const segment = useSelectedLayoutSegment()
  const { setItems } = useBreadcrumbs()

  useLayoutEffect(() => {
    const tab = tabs.find((item) => item.segment === segment)
    setItems(tab ? [...items, { label: tab.label }] : items)
    return () => setItems(null)
  }, [items, tabs, segment, setItems])

  return null
}
