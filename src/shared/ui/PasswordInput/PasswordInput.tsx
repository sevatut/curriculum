'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Input from '@/shared/ui/Input/Input'
import { useT } from 'next-i18next/client'

export default function PasswordInput({
  className = '',
  ...props
}: React.ComponentProps<typeof Input>) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  const { t } = useT('common')

  return (
    <div
      className={`
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

        ${className}
      `}
    >
      <Input
        {...props}
        type={isVisible ? 'text' : 'password'}
        className="placeholder:text-white/70"
      />

      <button
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? t('password.hide') : t('password.show')}
        className="shrink-0 text-white/70 transition-colors hover:text-white cursor-pointer"
      >
        {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
      </button>
    </div>
  )
}
