import { CvTableSection, getCvTableRows } from '@/widgets/cv-table'

export default async function CvsPage() {
  const rows = await getCvTableRows()

  return (
    <div className="flex flex-1 flex-col tracking-basic">
      <CvTableSection rows={rows} />
    </div>
  )
}
