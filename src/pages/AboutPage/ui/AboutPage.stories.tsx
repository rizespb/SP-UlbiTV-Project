import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import AboutPage from './AboutPage'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
    title: 'pages/AboutPage',
    component: AboutPage,
} as ComponentMeta<typeof AboutPage>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator({})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]
