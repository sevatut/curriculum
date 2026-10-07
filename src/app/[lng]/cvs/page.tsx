import { Plus } from 'lucide-react'
import { getT } from 'next-i18next/server'

import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'
import { CvTable, getCvTableRows } from '@/widgets/cv-table'

export default async function CvsPage() {
  const { t } = await getT('common')
  const rows = await getCvTableRows()

  return (
    <div className="flex flex-1 flex-col tracking-basic">
      <div className="my-2 flex items-center justify-between gap-6">
        <SearchInput className="ml-5 max-w-[320px]" />
        <Button variant="link" size="compact" className="mr-6">
          <Plus className="size-4" aria-hidden />
          {t('cv.create')}
        </Button>
      </div>
      <CvTable rows={rows} />
    </div>
  )
}
