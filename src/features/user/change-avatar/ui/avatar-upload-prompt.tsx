import { Upload } from 'lucide-react'
import type { ChangeEvent, RefObject } from 'react'

import { avatarAccept } from '@/features/user/change-avatar/model/avatar-file'

type AvatarUploadPromptProps = {
  pending: boolean
  inputRef: RefObject<HTMLInputElement | null>
  uploadLabel: string
  hint: string
  onPick: () => void
  onFile: (file: File | undefined) => void
}

export function AvatarUploadPrompt({
  pending,
  inputRef,
  uploadLabel,
  hint,
  onPick,
  onFile,
}: AvatarUploadPromptProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    onFile(event.target.files?.[0])
    event.target.value = ''
  }

  return (
    <div className="flex max-w-40 flex-col items-center gap-2 text-center text-sm text-foreground">
      <button
        type="button"
        disabled={pending}
        onClick={onPick}
        className="flex cursor-pointer flex-col items-center gap-1 disabled:opacity-50"
      >
        <Upload aria-hidden className="size-6" />
        <span>{uploadLabel}</span>
        <span className="text-xs text-muted-foreground">{hint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={avatarAccept}
        className="sr-only"
        onChange={onChange}
      />
    </div>
  )
}
