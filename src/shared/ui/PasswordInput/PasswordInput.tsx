'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useT } from 'next-i18next/client'
import { TextField } from '../TextFIeld/TextFIeld'

export function PasswordInput({
  className = '',
  ...props
}: React.ComponentProps<typeof TextField>) {
  const [isVisible, setIsVisible] = useState(false)

  const { t } = useT('common')

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <TextField
      {...props}
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
            text-white/70
            transition-colors
            hover:text-white
          "
        >
          {isVisible ? (
            <EyeOff color="#707071" size={24} />
          ) : (
            <Eye color="#707071" size={24} />
          )}
        </button>
      }
    />
  )
}
