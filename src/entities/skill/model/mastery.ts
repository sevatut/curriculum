export const masteryLevels = [
  'Novice',
  'Advanced',
  'Competent',
  'Expert',
  'Master',
] as const

export type Mastery = (typeof masteryLevels)[number]
