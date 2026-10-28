import type { ComponentProps } from 'react'
import { cn } from 'cn'
import { ChevronRightIcon } from 'lucide-react'

function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

export { BreadcrumbSeparator }
