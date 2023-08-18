import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Navbar } from './Navbar'

export default {
    title: 'widgets/Navbar',
    component: Navbar,
} as ComponentMeta<typeof Navbar>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})]

export const AuthNavbar = Template.bind({})
AuthNavbar.args = {}
AuthNavbar.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        user: { authData: {} },
    }),
]
