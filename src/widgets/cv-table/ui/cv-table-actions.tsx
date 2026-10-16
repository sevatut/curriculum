import { EllipsisVertical } from 'lucide-react'

type CvTableActionsProps = {
  label: string
}

export function CvTableActions({ label }: CvTableActionsProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="mr-6 inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground"
    >
      <EllipsisVertical className="size-4" aria-hidden />
    </button>
  )
}
