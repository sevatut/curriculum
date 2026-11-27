import type { Proficiency } from '@/entities/language/model/proficiency'

export type ProfileLanguage = {
  id: string
  name: string
  proficiency: Proficiency
}

export type Language = {
  id: string
  name: string
  native_name: string
  iso2: string
}
