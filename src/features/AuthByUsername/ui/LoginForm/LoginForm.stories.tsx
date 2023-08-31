import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import LoginForm from './LoginForm'

export default {
    title: 'features/LoginForm',
    component: LoginForm,
} as ComponentMeta<typeof LoginForm>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        loginForm: {
            username: 'User Name',
            password: 'Secret password',
        },
    }),
]

export const WithError = Template.bind({})
WithError.args = {}
WithError.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        loginForm: {
            username: 'User Name',
            password: 'Secret password',
            error: 'ERROR',
        },
    }),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        loginForm: {
            isLoading: true,
        },
    }),
]
