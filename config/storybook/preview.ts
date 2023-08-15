import type { Preview } from '@storybook/react'
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
    },
    decorators: [
        StyleDecorator,
        // Глобально будем использовать всетлую тему. А там, где надо - локально в историях добавлять темную тему через Story.decorators
        RouterDecorator,
        
        // Декоратор для комопнентов, которые имеют lazy() загрузку, но Suspense для этой lazy-загрузки находится где-то выше по дереву
        SuspenseDecorator,
    ],
}

export default preview
