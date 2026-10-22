import type { SVGProps } from 'react'
import { cn } from 'cn'

export function ChevronLeftIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="7.4"
      height="12"
      viewBox="0 0 7.4 12"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path
        d="M6.65 0.75L0.75 6L6.65 11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
