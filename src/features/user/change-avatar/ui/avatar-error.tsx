'use client'

import { useT } from 'next-i18next/client'

import {
  avatarErrorKey,
  type AvatarError as AvatarErrorCode,
} from '@/features/user/change-avatar/model/avatar-error'

type AvatarErrorProps = {
  editable: boolean
  error: AvatarErrorCode | null
}

export function AvatarError({ editable, error }: AvatarErrorProps) {
  const { t } = useT('employees')
  if (!editable || !error) return null

  return <p className="text-xs text-destructive">{t(avatarErrorKey[error])}</p>
}
