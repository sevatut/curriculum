import { forwardRef } from 'react'
import { Search } from 'lucide-react'
import Input from '@/shared/ui/Input/Input'

export const SearchInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className = '', ...props }, ref) => {
  return (
    <div
      className={`
        flex
        h-11
        w-full
        max-w-140
        items-center
        gap-3
        rounded-3xl
        border
        border-border
        px-4
        focus-within:border-focus
        transition-colors
        duration-300
        ${className}
      `}
    >
      <Search size={20} className="text-search" />

      <Input {...props} ref={ref} type="search" />
    </div>
  )
})

SearchInput.displayName = 'SearchInput'
