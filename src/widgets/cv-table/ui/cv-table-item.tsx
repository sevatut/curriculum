import { cn } from 'cn'

import type { CvTableColumnKey, CvTableRow } from '../model/cv-table-row'

const cellClassName = 'py-7 pl-4 text-left text-sm leading-5'

type CvTableItemProps = {
  row: CvTableRow
  actionsLabel: string
  columns: readonly { key: CvTableColumnKey; className: string }[]
}

export function CvTableItem({ row, actionsLabel, columns }: CvTableItemProps) {
  return (
    <tbody className="border-b border-border">
      <tr>
        {columns.map((column) => (
          <td key={column.key} className={cn(cellClassName, column.className)}>
            {row[column.key]}
          </td>
        ))}
        <td className={cellClassName}>
          <button
            type="button"
            aria-label={actionsLabel}
            className="inline-flex size-8 items-center justify-center rounded-full text-foreground mr-6"
          >
            <svg
              width="4"
              height="16"
              viewBox="0 0 4 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z"
                fill="#0000008A"
              />
            </svg>
          </button>
        </td>
      </tr>
      <tr>
        <td
          colSpan={columns.length + 1}
          className="pb-5 text-base leading-6 tracking-basic text-muted-foreground px-4"
        >
          {row.description}
        </td>
      </tr>
    </tbody>
  )
}
