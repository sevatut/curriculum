export const themeCookieName = 'theme'

export const themeMode = {
  light: 'light',
  dark: 'dark',
} as const

export type ThemeMode = (typeof themeMode)[keyof typeof themeMode]

export function parseTheme(value: string | undefined): ThemeMode {
  return value === themeMode.dark ? themeMode.dark : themeMode.light
}

export function nextTheme(mode: ThemeMode): ThemeMode {
  return mode === themeMode.dark ? themeMode.light : themeMode.dark
}
