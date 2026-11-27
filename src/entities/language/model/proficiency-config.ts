import type { Proficiency } from '@/entities/language/model/proficiency'

export const proficiencyConfig: Record<Proficiency, string> = {
  A1: 'text-skill-text',
  A2: 'text-lang-a2',
  B1: 'text-lang-b1',
  B2: 'text-lang-b2',
  C1: 'text-lang-c1',
  C2: 'text-lang-c2',
  Native: 'text-primary',
}
