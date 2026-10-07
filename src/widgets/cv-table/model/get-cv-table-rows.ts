import { getCvs } from '@/entities/cv'

import type { CvTableRow } from './cv-table-row'

export async function getCvTableRows(): Promise<readonly CvTableRow[]> {
  const cvs = await getCvs()

  return cvs.map((cv) => ({
    id: cv.id,
    name: cv.name,
    education: cv.education ?? '',
    employee: cv.user.email,
    description: cv.description ?? '',
  }))
}
