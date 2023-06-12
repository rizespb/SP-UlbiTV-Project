import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ErrorPage } from './ErrorPage'

export default {
    title: 'widgets/ErrorPage',
    component: ErrorPage,
} as ComponentMeta<typeof ErrorPage>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ErrorPage> = (args) => <ErrorPage {...args} />

// Мы глобально оборачиваем Storybook в storybook/preview.ts в ThemeDecorator декоратор, который прокидывает светлую тему
export const Light = Template.bind({})
Light.args = {}

// А вот темную тему указываем индивидуально
export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
