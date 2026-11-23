'use client'

import { useT } from 'next-i18next/client'

import { userInitial } from '@/entities/user/model/user-name'
import { UserAvatar } from '@/entities/user/ui/user-avatar'

import { AvatarError } from './avatar-error'
import { AvatarRemoveButton } from './avatar-remove-button'
import { AvatarUpload } from './avatar-upload'
import type { ProfileAvatarProps } from './types'
import { useChangeAvatar } from './use-change-avatar'

export function ProfileAvatar({
  lng,
  userId,
  name,
  src,
  editable,
}: ProfileAvatarProps) {
  const { t } = useT('employees')
  const avatar = useChangeAvatar(lng, userId)
  const face = (
    <UserAvatar src={src} initial={userInitial(name)} size="lg" tone="muted" />
  )
  const empty = !src

  return (
    <div className="flex items-center gap-8">
      {editable && src ? (
        <AvatarRemoveButton
          pending={avatar.pending}
          label={t('profile.remove')}
          onDelete={avatar.onDelete}
        >
          {face}
        </AvatarRemoveButton>
      ) : editable && empty ? (
        <button
          type="button"
          disabled={avatar.pending}
          onClick={avatar.pickFile}
          aria-label={t('profile.upload')}
          className="cursor-pointer rounded-full disabled:opacity-50"
        >
          {face}
        </button>
      ) : (
        face
      )}
      <AvatarUpload
        editable={editable}
        empty={empty}
        pending={avatar.pending}
        inputRef={avatar.inputRef}
        uploadLabel={t('profile.upload')}
        hint={t('profile.uploadHint')}
        onPick={avatar.pickFile}
        onFile={avatar.onFile}
      />
      <AvatarError editable={editable} error={avatar.error} />
    </div>
  )
}
