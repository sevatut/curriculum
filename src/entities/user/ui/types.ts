import type { sizeClassName, toneClassName } from './user-avatar-classes'

export type UserAvatarProps = {
  src: string
  initial: string
  size?: keyof typeof sizeClassName
  tone?: keyof typeof toneClassName
}
