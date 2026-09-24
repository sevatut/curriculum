'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  'aria-label': string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`
          w-full
          min-w-0
          bg-transparent
          text-lg
          text-white
          outline-none
          placeholder:text-white/70

          transition-all
          duration-200

          focus:ring-2
          focus:ring-white/20

          ${className}
        `}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
