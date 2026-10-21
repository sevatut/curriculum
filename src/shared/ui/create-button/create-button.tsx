import { Plus } from 'lucide-react'
import type { ComponentProps } from 'react'

import { Button } from '@/shared/ui/button'

type CreateButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size'>

function CreateButton({ children, className, ...props }: CreateButtonProps) {
  return (
    <Button
      {...props}
      type="button"
      variant="link"
      size="compact"
      className={className}
    >
      <Plus aria-hidden className="size-4 shrink-0" />
      <span className="leading-none max-[1100px]:sr-only">{children}</span>
    </Button>
  )
}

export { CreateButton }
