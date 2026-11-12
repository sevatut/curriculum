import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { actionClassName } from '@/widgets/employee-table/ui/employee-table-action-classes'
import type { EmployeeProfileLinkProps } from '@/widgets/employee-table/ui/types'

export function EmployeeProfileLink({ href, label }: EmployeeProfileLinkProps) {
  return (
    <Link href={href} aria-label={label} className={actionClassName}>
      <ChevronRight className="size-4" aria-hidden />
    </Link>
  )
}
