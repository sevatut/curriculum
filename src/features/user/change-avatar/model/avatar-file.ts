const avatarMaxBytes = 500 * 1024
const avatarTypes = ['image/png', 'image/jpeg', 'image/gif'] as const
const avatarMaxLength =
  Math.ceil((avatarMaxBytes * 4) / 3) + 'data:image/jpeg;base64,'.length

export const avatarAccept = avatarTypes.join(',')

export function isAvatarDataUrl(value: string) {
  const comma = value.indexOf(',')
  if (comma < 0 || comma === value.length - 1 || value.length > avatarMaxLength)
    return false

  const header = value.slice(0, comma + 1)
  return avatarTypes.some((type) => header === `data:${type};base64,`)
}

export function readAvatarFile(file: File): Promise<string> {
  if (!isAvatarType(file.type) || file.size > avatarMaxBytes) {
    return Promise.reject(new Error('invalid'))
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('invalid'))
    }
    reader.onerror = () => reject(new Error('invalid'))
    reader.readAsDataURL(file)
  })
}

function isAvatarType(type: string): type is (typeof avatarTypes)[number] {
  return avatarTypes.some((item) => item === type)
}
