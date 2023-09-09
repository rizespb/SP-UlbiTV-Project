### Содержание

-   [Запуск проекта](#запуск-проекта)
-   [Скрипты](#скрипты)
-   [Архитектура проекта](#архитектура-проекта)
-   [Работа с переводами](#работа-с-переводами)
-   [Тесты](#тесты)
-   [Линтинг](#линтинг)
-   [Storybook](#storybook)
-   [Конфигурация проекта](#конфигурация-проекта)
-   [CI pipeline и pre commit хуки](#ci-pipeline-и-pre-commit-хуки)
-   [Работа с данными](#работа-с-данными)
-   [Сущности (entities)](#сущности-entities)
-   [Фичи (features)](#фичи-features)

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start или npm run start:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

-   `npm run start` - Запуск frontend проекта на webpack dev server + backend server
-   `npm run start:vite` -Запуск frontend проекта на vite + backend server
-   `npm run start:app` - Запуск frontend проекта на webpack dev server
-   `npm run start:app:vite` - Запуск frontend проекта на vite
-   `npm run start:dev:server` - Запуск backend сервера
-   `npm run build:prod` - Сборка в prod режиме
-   `npm run build:dev` - Сборка в dev режиме (не минимизирован)
-   `npm run lint:ts` - Проверка ts файлов линтером
-   `npm run lint:ts:fix` - Исправление ts файлов линтером
-   `npm run lint:scss` - Проверка scss файлов style линтером
-   `npm run lint:scss:fix` - Исправление scss файлов style линтером
-   `npm run test:unit` - Хапуск unit тестов с jest
-   `npm run test:ui` - Хапуск скриншотных тестов с loki
-   `npm run test:ui:ok` - Подтверждение новых скриншотов
-   `npm run test:ui:ci` - Запуск скриншотных тестов в CI
-   `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
-   `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
-   `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
-   `npm run storybook` - запуск Storybook
-   `npm run storybook:build` - Сборка storybook билда
-   `npm run prepare` - прекоммит хуки
-   `npm run generate:slice` - Скрипт для генерации FSD слайсов

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode (i118next)

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используются 4 вида тестов:

1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`
4. e2e тестирование с Cypress `npm run test:e2e`

### Скриншотное тестирование

Важно! Для того, чтобы выполнить Скриншотное тестирование, должен быть запущен Docker и Storybook.
В package.json надо добавить настройки для loki и указать "target": "chrome.docker"

```
"loki": {
        "diffOnly": true,
        "configurations": {
            "chrome.laptop": {
                "target": "chrome.docker",
                "width": 1366,
                "height": 768,
                "deviceScaleFactor": 1,
                "mobile": false
            },
            "chrome.iphone7": {
                "target": "chrome.docker",
                "preset": "iPhone 7"
            }
        }
    }
```

Выполянем команду:

```
npm run test:ui
```

Если были доработки в UI, то скриншотные тесты не совпадут с предыдущими. Надо оценить, верны ли изменения и подтвердить новые скриншоты командой:

```
npm run test:ui:ok
```

В GitHub CI для запуска скриншотных тестов используется другая команда:

```
npm run test:ui:ci
```

И для подтверждения этих изменений надо выполнятьк команду перед коммитом:

```
npm run test:ui:ci:ok
```

Замечание: в определенный момент `test:ui:ok` и `test:ui:ci:ok` и перестало получаться проходить GitHub CI

Подробнее о тестах - [документация тестирование](/docs/tests.md)

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin _eslint-plugin-ulbi-tv-plugin_,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3. public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров

-   `npm run lint` - Проверка ts и scss файлов линтером
-   `npm run lint:fix` - Исправление ts и scss файлов линтером
-   `npm run lint:ts` - Проверка ts файлов линтером
-   `npm run lint:ts:fix` - Исправление ts файлов линтером
-   `npm run lint:scss` - Проверка scss файлов style линтером
-   `npm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

На shares/ui/redisigned компоненты story-кейсы не писали

Запустить сторибук можно командой:

-   `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Button, ButtonSize, ButtonTheme } from './Button'

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: 'Text',
}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Clear = Template.bind({})
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
}
Clear.decorators = [ThemeDecorator(Theme.LIGHT)]
```

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

-   /config/babel - babel
-   /config/build - конфигурация webpack
-   /config/jest - конфигурация тестовой среды
-   /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга / упрощения написания кода / генерации отчетов и тд.

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky

Замечание:
В GitHub CI для запуска скриншотных тестов используется команда:

```
npm run test:ui:ci
```

И для подтверждения внесенных в UI изменений надо использовать команду

```
npm run test:ui:ci:ok
```

При этом локально тесты запускаются и подверждаются командами:

```
npm run test:ui и npm run test:ui:ok
```

В какой-то момент эти команды стали давать разный результат. Подробнее смотри в разделе Скриншотное тестирование

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---

---

### Работа с feature-flags

Разрешено использование feature flags только с помощью хелпера toggleFeatures

в него передается объект с опциями

{
name: название фича-флага,
on: функция, которая отработает после Включения фичи
of: функция, которая отработает после ВЫключения фичи
}

Для автоматического удаления фичи использовать скрипт remove-feature.ts,
который принимает 2 аргумента

1. Название удаляемого фича-флага
2. Состояние (on\off)

Пример:

```
npx ts-node ./scripts/remove-feature.ts isArticleRatingEnabled on
```

Преобразует код вида:

```
const articleRatingCard = toggleFeatures({
    name: 'isArticleRatingEnabled',
    // eslint-disable-next-line react/no-unstable-nested-components
    on: () => <ArticleRating articleId={id} />,
    // eslint-disable-next-line react/no-unstable-nested-components
    off: () => <Card>{t('Оценка статей скоро появится!')}</Card>,
})
```

в

```
const articleRatingCard =  <Card>{t('Оценка статей скоро появится!')}</Card>
```

## Сущности (entities)

-   [Article](/src/entities/Article)
-   [Comment](/src/entities/Comment)
-   [Counter](/src/entities/Counter)
-   [Country](/src/entities/Country)
-   [Currency](/src/entities/Currency)
-   [Notification](/src/entities/Notification)
-   [Profile](/src/entities/Profile)
-   [Rating](/src/entities/Rating)
-   [User](/src/entities/User)

## Фичи (features)

-   [addCommentForm](/src/features/addCommentForm)
-   [articleEditForm](/src/features/articleEditForm)
-   [articleRating](/src/features/articleRating)
-   [articleRecommendationsList](/src/features/articleRecommendationsList)
-   [AuthByUsername](/src/features/AuthByUsername)
-   [avatarDropdown](/src/features/avatarDropdown)
-   [editableProfileCard](/src/features/editableProfileCard)
-   [LangSwitcher](/src/features/LangSwitcher)
-   [notificationButton](/src/features/notificationButton)
-   [profileRating](/src/features/profileRating)
-   [ThemeSwitcher](/src/features/ThemeSwitcher)
-   [UI](/src/features/UI)

---

### Создание коммита
