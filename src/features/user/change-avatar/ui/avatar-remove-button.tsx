import { cn } from 'cn'
import type { ReactNode } from 'react'

import { sizeClassName } from '@/entities/user/ui/user-avatar-classes'

type AvatarRemoveButtonProps = {
  pending: boolean
  label: string
  onDelete: () => void
  children: ReactNode
}

export function AvatarRemoveButton({
  pending,
  label,
  onDelete,
  children,
}: AvatarRemoveButtonProps) {
  return (
    <button
      type="button"
      disabled={pending}
      onClick={onDelete}
      aria-label={label}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-full p-0 disabled:opacity-50',
        sizeClassName.lg,
      )}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/50 px-3 text-center text-xs leading-4 text-white opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}
