'use client'

import { useT } from 'next-i18next/client'
import { Button } from '../button'
import { X } from 'lucide-react'

interface ModalProps {
  title: string
  confirmText: string
  children: React.ReactNode
  onCancel: () => void
  onConfirm: () => void
  confirmDisabled?: boolean
  className?: string
}

export function Modal({
  title,
  confirmText,
  confirmDisabled,
  onCancel,
  onConfirm,
  children,
  className = '',
}: ModalProps) {
  const { t } = useT('common')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`
          flex
          flex-col
          gap-6
          rounded-sm
          bg-background
          p-2
          px-5
          ${className}
        `}
        role="dialog"
        aria-modal="true"
      >
        <div className="mt-2 flex justify-between">
          <h3 className="text-lg text-foreground">{title}</h3>

          <button
            aria-label={t('modal.close')}
            type="button"
            className="cursor-pointer"
            onClick={onCancel}
          >
            <X size={24} className="stroke-foreground" />
          </button>
        </div>

        {children}

        <div className="-mx-3 flex justify-end gap-2">
          <Button
            onClick={onCancel}
            variant="outlined"
            className="cursor-pointer border-foreground text-foreground opacity-30"
          >
            {t('modal.cancel')}
          </Button>

          <Button
            onClick={confirmDisabled ? () => {} : onConfirm}
            disabled={confirmDisabled}
            className="cursor-pointer"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
