import type { RefObject } from 'react'

import { AvatarUploadPrompt } from './avatar-upload-prompt'

type AvatarUploadProps = {
  editable: boolean
  empty: boolean
  pending: boolean
  inputRef: RefObject<HTMLInputElement | null>
  uploadLabel: string
  hint: string
  onPick: () => void
  onFile: (file: File | undefined) => void
}

export function AvatarUpload({ editable, empty, ...prompt }: AvatarUploadProps) {
  if (!editable || !empty) return null

  return <AvatarUploadPrompt {...prompt} />
}
