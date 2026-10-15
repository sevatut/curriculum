import type { ReactNode } from 'react'

export type PageTab = {
  href: string
  label: string
  segment: string | null
}

export type PageTabsProps = {
  tabs: readonly PageTab[]
  label: string
  children: ReactNode
  className?: string
  centered?: boolean
}
