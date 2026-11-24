'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { supportedLngs } from '@/shared/i18n'
import { Button } from '@/shared/ui/button'

function hrefForLocale(pathname: string, lng: string) {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    return `/${lng}`
  }
  if (supportedLngs.includes(segments[0] as (typeof supportedLngs)[number])) {
    segments[0] = lng
  } else {
    segments.unshift(lng)
  }
  return `/${segments.join('/')}`
}

export function LocaleSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const { i18n, t } = useT('common')
  const current = i18n.language
  const nextLng = supportedLngs.find((lng) => lng !== current) ?? 'en'

  function switchLocale() {
    router.push(hrefForLocale(pathname, nextLng))
  }

  return (
    <Button type="button" variant="base" onClick={switchLocale}>
      {t('switchLocale')}
    </Button>
  )
}
