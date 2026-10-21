'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from 'cn'

import type { UserAvatarProps } from './types'
import { sizeClassName, toneClassName } from './user-avatar-classes'

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
