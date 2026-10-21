'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from 'cn'

const sizeClassName = {
  sm: 'size-6 text-xs leading-none',
  md: 'size-10 text-[20px] leading-5',
  lg: 'size-32 text-5xl leading-none',
} as const

const toneClassName = {
  primary: 'bg-primary text-primary-foreground',
  muted: 'bg-[#c6c6c6] text-[#3a3a3a]',
} as const

type UserAvatarProps = {
  src: string
  initial: string
  size?: keyof typeof sizeClassName
  tone?: keyof typeof toneClassName
}

export function UserAvatar({
  src,
  initial,
  size = 'md',
  tone = 'primary',
}: UserAvatarProps) {
  const [failed, setFailed] = useState(false)
  const className = cn('shrink-0 rounded-full', sizeClassName[size])

  if (!src || failed) {
    return (
      <span
        aria-hidden
        className={cn(
          'flex items-center justify-center font-medium',
          className,
          toneClassName[tone],
        )}
      >
        {initial}
      </span>
    )
  }

  return (
    <span className={cn('relative inline-block overflow-hidden', className)}>
      <Image
        src={avatarSrc(src)}
        alt=""
        fill
        unoptimized
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </span>
  )
}

function avatarSrc(src: string) {
  if (
    src.startsWith('data:') ||
    src.startsWith('http://') ||
    src.startsWith('https://')
  ) {
    return src
  }

  return `data:image/jpeg;base64,${src}`
}
