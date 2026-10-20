import { CvTableSection, getCvTableRows } from '@/widgets/cv-table'

export default async function CvsPage() {
  const rows = await getCvTableRows()

  return <CvTableSection rows={rows} />
}
