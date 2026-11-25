'use client'

import { useT } from 'next-i18next/client'
import { Button } from '@/shared/ui/button'
import { X } from 'lucide-react'
import { useEffect, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])

  function keepDialogOpen(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation()
  }

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
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
        onClick={keepDialogOpen}
      >
        <div className="mt-2 flex justify-between">
          <h3 className="text-lg text-foreground">{title}</h3>

          <button
            aria-label={t('modal.close')}
            type="button"
            className="cursor-pointer text-foreground transition-transform hover:scale-140 active:scale-[var(--scale-active)]"
            onClick={onCancel}
          >
            <X size={24} />
          </button>
        </div>

        {children}

        <div className="mb-1.25 flex justify-end gap-2">
          <Button
            onClick={onCancel}
            variant="outlined"
            className="cursor-pointer border-foreground text-foreground uppercase opacity-90 hover:text-primary"
            type="button"
          >
            {t('modal.cancel')}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={confirmDisabled}
            className="cursor-pointer uppercase transition-all hover:scale-[var(--scale-hover)]"
            type="button"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
