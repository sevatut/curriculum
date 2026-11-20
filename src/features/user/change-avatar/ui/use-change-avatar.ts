'use client'

import { useRef, useState, useTransition } from 'react'

import {
  deleteAvatarAction,
  uploadAvatarAction,
} from '@/features/user/change-avatar/api/change-avatar-action'
import {
  avatarError,
  type AvatarError,
} from '@/features/user/change-avatar/model/avatar-error'
import { readAvatarFile } from '@/features/user/change-avatar/model/avatar-file'

export function useChangeAvatar(lng: string, userId: string) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<AvatarError | null>(null)

  function pickFile() {
    if (!pending) inputRef.current?.click()
  }

  function onFile(file: File | undefined) {
    if (!file) return
    startTransition(async () => {
      try {
        const base64 = await readAvatarFile(file)
        const result = await uploadAvatarAction(lng, userId, base64)
        setError(result.error ?? null)
      } catch {
        setError(avatarError.invalid)
      }
    })
  }

  function onDelete() {
    startTransition(async () => {
      const result = await deleteAvatarAction(lng, userId)
      setError(result.error ?? null)
    })
  }

  return { pending, error, inputRef, pickFile, onFile, onDelete }
}
