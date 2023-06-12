import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { AppLink, AppLinkTheme } from './AppLink'

export default {
    title: 'shared/AppLink',
    component: AppLink,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

// Светлую тему подключили глобально в config\storybook\preview.ts
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
export const Primary = Template.bind({})
Primary.args = {
    theme: AppLinkTheme.PRIMARY,
    children: 'Text',
}
// А вот темную тему указываем индивидуально
export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
    theme: AppLinkTheme.PRIMARY,
    children: 'Text',
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Secondary = Template.bind({})
Secondary.args = {
    theme: AppLinkTheme.SECONDARY,
    children: 'Text',
}
// А вот темную тему указываем индивидуально
export const SecondaryDark = Template.bind({})
SecondaryDark.args = {
    theme: AppLinkTheme.SECONDARY,
    children: 'Text',
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
    theme: AppLinkTheme.RED,
    children: 'Text',
}
// А вот темную тему указываем индивидуально
export const RedDark = Template.bind({})
RedDark.args = {
    theme: AppLinkTheme.RED,
    children: 'Text',
}
Red.decorators = [ThemeDecorator(Theme.DARK)]
