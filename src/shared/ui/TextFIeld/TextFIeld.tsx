import { ReactNode } from 'react'
import Input from '@/shared/ui/Input/Input'

interface TextFieldProps extends React.ComponentProps<typeof Input> {
  rightElement?: ReactNode
  label: string
}

export function TextField({
  className = '',
  rightElement,
  label,
  ...props
}: TextFieldProps) {
  return (
    <div
      className={`
        relative
        flex
        h-12
        w-full
        max-w-140
        items-center
        justify-between
        gap-4
        border
        border-[#646464]
        pl-3
        pr-4

        transition-colors
        duration-300
        focus-within:border-[#c63031]

        ${className}
      `}
    >
      <Input {...props} placeholder=" " className="peer" />

      <label
        className="
          pointer-events-none
          absolute
          left-3
          top-0
          -translate-y-1/2
          bg-white
          px-1
          text-sm
          text-[#626263]

          transition-all
          duration-200

          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-lg

          peer-focus:top-0
          peer-focus:-translate-y-1/2
          peer-focus:text-sm
          peer-focus:text-[#c63031]
        "
      >
        {label}
      </label>

      {rightElement}
    </div>
  )
}
