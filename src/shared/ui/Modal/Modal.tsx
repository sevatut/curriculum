'use client'

import { useT } from 'next-i18next/client'
import { Button } from '../button'
import { X } from 'lucide-react'
import { useEffect } from 'react'

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

  return (
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
        onClick={(event) => event.stopPropagation()}
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
            className="cursor-pointer border-foreground text-foreground opacity-30 uppercase"
          >
            {t('modal.cancel')}
          </Button>

          <Button
            onClick={confirmDisabled ? () => {} : onConfirm}
            disabled={confirmDisabled}
            className="cursor-pointer uppercase"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Test() {
  return (
    <Modal
      title="Remove project"
      confirmText="Confirm"
      confirmDisabled={true}
      onCancel={() => {
        console.log('Yep')
      }}
      onConfirm={() => {
        console.log('Yeah')
      }}
    >
      <p className="text-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia a vel modi atque
        officia, dolores incidunt voluptates illum debitis!
      </p>
    </Modal>
  )
}
