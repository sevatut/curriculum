'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useT } from 'next-i18next/client'

import { supportedLngs } from '@/shared/i18n'

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
  const { i18n, t } = useT('common')
  const current = i18n.language
  const nextLng = supportedLngs.find((lng) => lng !== current) ?? 'en'

  return (
    <Link
      href={hrefForLocale(pathname, nextLng)}
      className="inline-flex h-7 items-center rounded-[40px] border border-border px-2.5 text-sm"
    >
      {t('switchLocale')}
    </Link>
  )
}
