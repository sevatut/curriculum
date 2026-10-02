# my-app

Стартовый каркас под продуктовую разработку: оболочка с боковым меню и заготовками разделов.

## Стек

| Слой       | Технология                                        |
| ---------- | ------------------------------------------------- |
| Язык       | **TypeScript**                                    |
| UI-рантайм | **React 19**                                      |
| Фреймворк  | **Next.js 16** (App Router)                       |
| Стили      | **Tailwind CSS v4**                               |
| UI         | **shadcn/ui** (стиль `base-nova`, Base UI)        |
| Иконки     | **lucide-react**                                  |
| i18n       | **next-i18next** v16 (`i18next`, `react-i18next`) |

## Запуск

```bash
pnpm install
pnpm dev
```

Откройте http://localhost:3000 - proxy перенаправит на `/en` или `/ru` по cookie / `Accept-Language`.

## Маршруты

Все страницы живут под префиксом локали (`/en`, `/ru`). Оболочка с сайдбаром общая: `AppSidebarLayout` в `src/app/[lng]/layout.tsx`.

| Путь         | Раздел     |
| ------------ | ---------- |
| `/`          | Главная    |
| `/employees` | Сотрудники |
| `/skills`    | Навыки     |
| `/languages` | Языки      |
| `/cvs`       | Резюме     |

На узком экране сайдбар открывается как sheet, на широком - сворачивается в иконки.

## Структура

Слои близки к Feature-Sliced Design. Импорты - через алиас `@/*` → `src/*`.

```
src/
  app/
    layout.tsx              # html/body, lang из proxy, шрифт Roboto
    globals.css
    [lng]/
      layout.tsx            # I18nProvider + AppSidebarLayout
      page.tsx              # главная
      employees/page.tsx
      skills/page.tsx
      languages/page.tsx
      cvs/page.tsx
  widgets/
    app-sidebar/            # навигация и оболочка страниц
  features/
    locale/switch-locale/   # LocaleSwitcher
  shared/
    ui/                     # shadcn: button, sidebar, sheet, tooltip
    lib/                    # cn, useIsMobile
    i18n/
      locales/{en,ru}/      # JSON namespaces
      settings.ts           # supportedLngs (безопасно для client)
  proxy.ts                  # next-i18next createProxy (Next.js 16)
i18n.config.ts              # конфиг i18n + resourceLoader
```

## i18n

- Локали: `en` (по умолчанию), `ru`. Список - `src/shared/i18n/settings.ts`.
- Добавьте namespace в `i18n.config.ts` (`ns`) и файлы в `src/shared/i18n/locales/<lng>/<ns>.json`.
- **Server Components:** `const { t } = await getT('home')`.
- **Client Components:** `'use client'` + `useT('common')`.
- Переключатель языка: `LocaleSwitcher` (префикс `/en`, `/ru`).

## shadcn/ui

```bash
pnpm dlx shadcn@latest add card
```

Компоненты попадают в `src/shared/ui/` (`components.json`: алиасы `ui`, `lib`, `hooks`).

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
