import { cn } from 'cn'

import type { NavIconProps } from '@/widgets/app-sidebar/ui/types'

export function NavIcon({ shape, className, ...props }: NavIconProps) {
  return (
    <svg
      width={shape.width}
      height={shape.height}
      viewBox={`0 0 ${shape.width} ${shape.height}`}
      fill="none"
      aria-hidden="true"
      className={cn(shape.className, className)}
      {...props}
    >
      <path d={shape.path} fill="currentColor" />
    </svg>
  )
}
