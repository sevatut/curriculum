'use client'

import { Search } from 'lucide-react'
import Input from '@/shared/ui/Input/Input'

export function SearchInput({
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
        text-[#0000008A]
        focus-within:border-[#c63031]
        duration-300
        ${className}
      `}
    >
      <Search size={20} color="#0000008A" />

      <Input {...props} type="search" className="placeholder:text-[#0000008A]" />
    </div>
  )
}
