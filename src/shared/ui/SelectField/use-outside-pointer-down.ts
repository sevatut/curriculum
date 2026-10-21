import { useEffect, type RefObject } from 'react'

export function useOutsidePointerDown(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onOutside: () => void,
) {
  useEffect(() => {
    if (!active) return
    const handle = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) onOutside()
    }
    document.addEventListener('pointerdown', handle)
    return () => document.removeEventListener('pointerdown', handle)
  }, [ref, active, onOutside])
}
