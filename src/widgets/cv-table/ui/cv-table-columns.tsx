import Link from 'next/link'

import type { DataTableColumn } from '@/shared/ui/data-table'

import type { CvTableRow } from '../model/cv-table-row'

type CvTableColumnLabels = {
  name: string
  education: string
  employee: string
}

export function getCvTableColumns(
  lng: string,
  labels: CvTableColumnLabels,
): DataTableColumn<CvTableRow>[] {
  return [
    {
      id: 'name',
      label: labels.name,
      className: 'w-[35%] max-[1100px]:w-[50%]',
      cell: (row) => (
        <Link href={`/${lng}/cvs/${row.id}/details`} className="hover:text-primary">
          {row.name}
        </Link>
      ),
      sortValue: (row) => row.name,
    },
    {
      id: 'education',
      label: labels.education,
      className: 'w-[28.2%] max-[1100px]:hidden',
      cell: (row) => row.education,
      sortValue: (row) => row.education,
    },
    {
      id: 'employee',
      label: labels.employee,
      className: 'w-[31.3%] max-[1100px]:w-[45%]',
      cell: (row) => row.employee,
      sortValue: (row) => row.employee,
    },
  ]
}
