# my-app

Фронт приложения: вход, сотрудники и резюме. Каталоги навыков и языков и часть вкладок карточек пока заглушки.

## Стек

| Слой       | Технология                                        |
| ---------- | ------------------------------------------------- |
| Язык       | **TypeScript**                                    |
| UI-рантайм | **React 19**                                      |
| Фреймворк  | **Next.js 16** (App Router)                       |
| Данные     | **Apollo Client**, GraphQL                        |
| Стили      | **Tailwind CSS v4**                               |
| UI         | **shadcn/ui** (стиль `base-nova`, Base UI)        |
| Иконки     | **lucide-react**                                  |
| i18n       | **next-i18next** v16 (`i18next`, `react-i18next`) |

## Именование

- **Файлы и папки:** `kebab-case` (`app-sidebar.tsx`, `use-mobile.ts`)
- **Компоненты, типы, интерфейсы:** `PascalCase` (`AppSidebar`, `User`)
- **Функции, переменные (включая объекты, массивы и строковые константы модуля):** `camelCase` (`getUsers`, `resolveLocale`, `formErrorCode`, `navItems`, `defaultLocale = 'en'`)
- **Хуки:** `camelCase` с префиксом `use` (`useIsMobile`)
- **Исключение, константы модуля:** числа, regex и GraphQL-документы пишутся в `UPPER_SNAKE_CASE` (`MIN_PASSWORD_LENGTH = 8`, `EMAIL_PATTERN`, `GET_USERS`)
- **Исключение, сгенерированный код shadcn:** имена не меняются, чтобы не расходиться с генератором (`SIDEBAR_COOKIE_NAME`, `SidebarContext` в `src/shared/ui/sidebar/sidebar.tsx`)
- **Исключение, динамические сегменты маршрутов:** `camelCase`, потому что имя папки становится ключом в `params` (`[cvId]` → `params.cvId`, `[userId]`)
- **Импорты:** только через алиас `@/` (`@/entities/user/model/user`), относительные пути (`./`, `../`) не используются

## Запуск

```bash
pnpm install
pnpm dev
```

Откройте http://localhost:3000 - proxy перенаправит на `/en` или `/ru` по cookie / `Accept-Language`.

## Маршруты

Все страницы живут под префиксом локали (`/en`, `/ru`). Список путей - `src/shared/routes/routes.ts`. Оболочка с сайдбаром и крошками - `AppFrame` в `src/app/[lng]/app-frame.tsx`. На `/auth/*` сайдбара нет.

| Путь                                            | Раздел             |
| ----------------------------------------------- | ------------------ |
| `/`                                             | Главная            |
| `/auth/login`, `/auth/signup`                   | Вход и регистрация |
| `/employees`                                    | Сотрудники         |
| `/employees/[userId]/profile`                   | Профиль            |
| `/employees/[userId]/skills`, `…/languages`     | Заглушки вкладок   |
| `/skills`                                       | Навыки             |
| `/languages`                                    | Языки              |
| `/cvs`                                          | Резюме             |
| `/cvs/[cvId]/details`                           | Детали резюме      |
| `/cvs/[cvId]/skills`, `…/projects`, `…/preview` | Заглушки вкладок   |
| `/settings`                                     | Настройки          |

Неизвестный адрес внутри локали отдаёт локализованную 404 (`src/app/[lng]/[...rest]/page.tsx`). На узком экране сайдбар открывается как sheet, на широком сворачивается в иконки. Свой аватар виден в сайдбаре.

## Структура

Слои близки к Feature-Sliced Design. Импорты - через алиас `@/*` → `src/*`.

```
src/
  app/
    layout.tsx                 # html/body, lang из proxy, шрифт Roboto
    globals.css
    [lng]/
      layout.tsx               # I18nProvider + AppFrame
      app-frame.tsx            # сайдбар, шапка, крошки; auth без оболочки
      page.tsx
      auth/login, auth/signup
      employees/
        [userId]/(tabs)/profile
        [userId]/(tabs)/skills, languages   # заглушки
      cvs/
        [cvId]/(tabs)/details
        [cvId]/(tabs)/skills, projects, preview   # заглушки
      skills/page.tsx          # заглушка
      languages/page.tsx       # заглушка
      settings/page.tsx
      [...rest]/page.tsx       # 404
  proxy.ts                     # next-i18next createProxy (Next.js 16)
  widgets/
    app-sidebar/               # навигация и пользователь в футере
    app-header/                # крошки
    employee-table/
    employee-profile/
    cv-table/
  features/
    auth/                      # вход и регистрация
      logout/                  # кнопка выхода, отдельной страницы нет
    locale/switch-locale/
    theme/switch-theme/
    user/
      manage-user/
      delete-user/
      change-avatar/
    cv/
      create-cv/
      update-cv/
      delete-cv/
  entities/
    user, cv, department, position, skill
  shared/
    api/                       # Apollo, сессия
    routes/
    validation/
    ui/                        # shadcn и поля форм
    lib/                       # cn, useIsMobile
    i18n/
      config.ts                # ns + resourceLoader
      settings.ts              # supportedLngs
      locales/{en,ru}/
```

## i18n

- Локали: `en` (по умолчанию), `ru`. Список - `src/shared/i18n/settings.ts`.
- Namespace: `common`, `home`, `auth`, `cvs`, `employees`. Новый namespace добавляется в `src/shared/i18n/config.ts` (`ns`) и в `src/shared/i18n/locales/<lng>/<ns>.json`.
- **Server Components:** `const { t } = await getT('home')`.
- **Client Components:** `'use client'` + `useT('common')`.
- Переключатель языка: `LocaleSwitcher` в настройках (префикс `/en`, `/ru`).
- Переключатель темы: `ThemeSwitcher` в настройках (`light` / `dark`, cookie `theme`).

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
