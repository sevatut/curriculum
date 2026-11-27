export const proficiencyLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'] as const

export type Proficiency = (typeof proficiencyLevels)[number]
