'use client'

import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { cn } from 'cn'

function DropdownMenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        'flex origin-left cursor-pointer items-center px-4 py-2 text-base outline-none select-none active:scale-[0.95] data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { DropdownMenuItem }
