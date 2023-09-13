import type { Preview } from '@storybook/react'
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator'
import { Theme } from '../../src/shared/const/theme'
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        layout: 'fullscreen',
        // После установки аддона storybook-addon-themes и добавления его в main.ts подключаем классы с темами
        // Глобально будем использовать светлую тему. А там, где надо - локально в историях добавлять темную тему через Story.decorators
        themes: {
            default: 'light',
            list: [
                { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
                { name: 'dark', class: Theme.DARK, color: '#000000' },
                { name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
            ],
        },
    },
    decorators: [
        StyleDecorator,

        RouterDecorator,

        // Декоратор для комопнентов, которые имеют lazy() загрузку, но Suspense для этой lazy-загрузки находится где-то выше по дереву
        SuspenseDecorator,

        // Отключил после добавления storybook-addon-themes
        // Декоратор для глобальной темы
        // ThemeDecorator(Theme.LIGHT),

        // Storybook - это приложение
        // Если мы в каком-то компоненте применили FeaturesFlagsDecorator и инициализировали isAppRedesigned как true, то глобальная переменная featureFlags инициализировалась как true для всего приложения Storybook
        // И во всех кейсах, даже там, где мы не используем новый дизайн, применяться значение on в компоненте ToggleFeature
        // Поэтому применяем глобально декоратор, чтобы он обнулял значения ФТ
        FeaturesFlagsDecorator({}),
    ],
}

export default preview
