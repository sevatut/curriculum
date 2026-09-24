'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({
  value,
  placeholder,
  onChange,
}: {
  value: string
  placeholder: string
  onChange: (value: string) => void
}) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div className="flex items-center gap-4 justify-between pl-3 pr-6 box-border w-140 h-12 border border-[#646464]">
      <input
        className="w-full text-white text-lg placeholder:text-white/70"
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="button" onClick={toggleVisibility}>
        {isVisible ? (
          <EyeOff size={30} color="white" />
        ) : (
          <Eye size={30} color="white" />
        )}
      </button>
    </div>
  )
}
