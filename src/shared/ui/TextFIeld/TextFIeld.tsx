import { forwardRef, ReactNode } from 'react'
import Input from '@/shared/ui/Input/Input'

interface TextFieldProps extends React.ComponentProps<typeof Input> {
  rightElement?: ReactNode
  label: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className = '', rightElement, label, ...props }, ref) => {
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
        border-input-border
        pl-3
        pr-4

        transition-colors
        duration-300
        focus-within:border-focus

        ${className}
      `}
      >
        <Input {...props} placeholder=" " className="peer" ref={ref} />

        <label
          className="
          pointer-events-none
          absolute
          left-3
          top-0
          -translate-y-1/2
          bg-background
          px-1
          text-sm
          text-placeholder

          transition-all
          duration-200

          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-lg

          peer-focus:top-0
          peer-focus:-translate-y-1/2
          peer-focus:text-sm
          peer-focus:text-focus
        "
        >
          {label}
        </label>

        {rightElement}
      </div>
    )
  },
)

TextField.displayName = 'TextField'

export { TextField }
