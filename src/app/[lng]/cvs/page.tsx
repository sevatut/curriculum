import { getActor } from '@/entities/user'
import { CvTableSection, getCvTableRows } from '@/widgets/cv-table'

export default async function CvsPage() {
  const [actor, rows] = await Promise.all([getActor(), getCvTableRows()])

  return <CvTableSection rows={rows} actor={actor} />
}
