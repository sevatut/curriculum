'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import type { Crumb } from '../model/crumb'

type BreadcrumbContextValue = {
  items: readonly Crumb[] | null
  setItems: (items: readonly Crumb[] | null) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null)

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<readonly Crumb[] | null>(null)
  const value = useMemo(() => ({ items, setItems }), [items])

  return (
    <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumbs must be used within BreadcrumbProvider')
  }
  return context
}
