'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useT } from 'next-i18next/client'
import { TextField } from '../TextField/TextField'

export const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof TextField>
>(({ className = '', ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const { t } = useT('common')

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <TextField
      {...props}
      ref={ref}
      type={isVisible ? 'text' : 'password'}
      className={className}
      rightElement={
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? t('password.hide') : t('password.show')}
          className="
            shrink-0
            cursor-pointer
            transition-colors
          "
        >
          {isVisible ? (
            <EyeOff className="text-eye" size={24} />
          ) : (
            <Eye className="text-eye" size={24} />
          )}
        </button>
      }
    />
  )
})

PasswordInput.displayName = 'PasswordInput'
