import type { ComponentProps } from 'react'
import { cn } from 'cn'

function Breadcrumb({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

export { Breadcrumb }
