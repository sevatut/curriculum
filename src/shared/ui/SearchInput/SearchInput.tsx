'use client'

import { Search } from 'lucide-react'
import Input from '@/shared/ui/Input/Input'

export default function SearchInput({
  className = '',
  ...props
}: React.ComponentProps<typeof Input>) {
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
        border-[#646464]
        px-4

        ${className}
      `}
    >
      <Search size={20} color="white" />

      <Input {...props} type="search" className="placeholder:text-[#9a9a9a]" />
    </div>
  )
}
