'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useT } from 'next-i18next/client'
import { TextField } from '@/shared/ui/text-field/text-field'

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
          className="shrink-0 cursor-pointer rounded-full text-eye outline-none hover:scale-[1.1] hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.90]"
        >
          {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      }
    />
  )
})

PasswordInput.displayName = 'PasswordInput'
