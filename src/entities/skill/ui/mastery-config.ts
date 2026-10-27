import { Mastery } from './types'

export const masteryConfig: Record<
  Mastery,
  { bgClass: string; barClass: string; progress: number }
> = {
  Novice: {
    bgClass: 'bg-novice',
    barClass: 'bg-novice-bar',
    progress: 20,
  },
  Advanced: {
    bgClass: 'bg-advanced',
    barClass: 'bg-advanced-bar',
    progress: 40,
  },
  Competent: {
    bgClass: 'bg-competent',
    barClass: 'bg-competent-bar',
    progress: 60,
  },
  Expert: {
    bgClass: 'bg-expert',
    barClass: 'bg-expert-bar',
    progress: 80,
  },
  Master: {
    bgClass: 'bg-master',
    barClass: 'bg-master',
    progress: 100,
  },
}
