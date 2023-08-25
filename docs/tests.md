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
