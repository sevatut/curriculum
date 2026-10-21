import Link from 'next/link'
import { ChevronRight, EllipsisVertical } from 'lucide-react'

type EmployeeTableActionsProps = {
  href: string
  label: string
  own: boolean
}

export function EmployeeTableActions({ href, label, own }: EmployeeTableActionsProps) {
  const Icon = own ? EllipsisVertical : ChevronRight

  return (
    <Link
      href={href}
      aria-label={label}
      className="mr-6 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground"
    >
      <Icon className="size-4" aria-hidden />
    </Link>
  )
}
