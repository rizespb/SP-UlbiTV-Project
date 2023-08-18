import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import MainPage from './MainPage'

export default {
    title: 'pages/MainPage',
    component: MainPage,
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof MainPage>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof MainPage> = () => <MainPage />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
