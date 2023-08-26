import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ErrorPage } from './ErrorPage'

export default {
    title: 'widgets/ErrorPage',
    component: ErrorPage,
} as ComponentMeta<typeof ErrorPage>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ErrorPage> = (args) => <ErrorPage {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
