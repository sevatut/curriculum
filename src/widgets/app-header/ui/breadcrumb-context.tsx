'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import type { Crumb } from '../model/crumb'
import type { BreadcrumbContextValue } from './types'

const breadcrumbContext = createContext<BreadcrumbContextValue | null>(null)

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<readonly Crumb[] | null>(null)
  const value = useMemo(() => ({ items, setItems }), [items])

  return (
    <breadcrumbContext.Provider value={value}>{children}</breadcrumbContext.Provider>
  )
}

export function useBreadcrumbs() {
  const context = useContext(breadcrumbContext)
  if (!context) {
    throw new Error('useBreadcrumbs must be used within BreadcrumbProvider')
  }
  return context
}
