# my-app

Стартовый проект под продуктовую разработку.

## Стек

| Слой      | Технология                                        |
| --------- | ------------------------------------------------- |
| Язык      | **TypeScript**                                    |
| Фреймворк | **Next.js 16** (App Router)                       |
| UI        | **shadcn/ui** (Base UI + Tailwind CSS v4)         |
| i18n      | **next-i18next** v16 (`i18next`, `react-i18next`) |

## Запуск

```bash
pnpm install
pnpm dev
```

Откройте http://localhost:3000 — proxy перенаправит на `/en` или `/ru` по cookie / `Accept-Language`.

## Структура

```
src/
  app/
    layout.tsx          # корневой html/body, lang из proxy
    [lng]/
      layout.tsx        # I18nProvider, initServerI18next
      page.tsx          # страницы с getT() (Server Components)
  shared/
    ui/                 # shadcn/ui
    i18n/
      locales/{en,ru}/  # JSON namespaces
      settings.ts       # supportedLngs (безопасно для client)
  features/
    locale/switch-locale/
  proxy.ts              # next-i18next createProxy (Next.js 16)
i18n.config.ts          # конфиг i18n + resourceLoader
```

## i18n

- Добавьте namespace в `i18n.config.ts` (`ns`) и файлы в `src/shared/i18n/locales/<lng>/<ns>.json`.
- **Server Components:** `const { t } = await getT('home')`.
- **Client Components:** `'use client'` + `useT('common')`.
- Переключатель языка: `LocaleSwitcher` (префикс `/en`, `/ru`).

## shadcn/ui

```bash
pnpm dlx shadcn@latest add card
```

Компоненты попадают в `src/shared/ui/`.

## Сборка

```bash
pnpm build
pnpm start
```

## Форматирование и git hooks

```bash
pnpm format          # Prettier по всему проекту
pnpm format:check    # проверка без записи
pnpm lint            # ESLint
pnpm lint:fix        # ESLint с автоисправлением
```

**Husky** + **lint-staged**: перед коммитом на staged-файлах запускаются `eslint --fix` и `prettier --write`. После `pnpm install` срабатывает `prepare` → `husky`.
