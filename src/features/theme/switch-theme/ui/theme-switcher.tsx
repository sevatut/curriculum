'use client'

import { useState } from 'react'
import { useT } from 'next-i18next/client'

import {
  nextTheme,
  themeCookieName,
  themeMode,
  type ThemeMode,
} from '@/features/theme/switch-theme/model/theme'
import { Button } from '@/shared/ui/button'

const themeCookieMaxAge = 60 * 60 * 24 * 365

type ThemeSwitcherProps = {
  theme: ThemeMode
}

export function ThemeSwitcher({ theme }: ThemeSwitcherProps) {
  const { t } = useT('common')
  const [mode, setMode] = useState(theme)
  const label = mode === themeMode.dark ? t('theme.toLight') : t('theme.toDark')

  function toggleTheme() {
    const next = nextTheme(mode)
    document.documentElement.classList.toggle('dark', next === themeMode.dark)
    document.cookie = `${themeCookieName}=${next}; Path=/; Max-Age=${themeCookieMaxAge}; SameSite=Lax`
    setMode(next)
  }

  return (
    <Button type="button" variant="base" onClick={toggleTheme}>
      {label}
    </Button>
  )
}
