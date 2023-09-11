import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { AppLink, EAppLinkTheme } from './AppLink'

export default {
    title: 'shared/AppLink',
    component: AppLink,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

export const Primary = Template.bind({})
Primary.args = {
    theme: EAppLinkTheme.PRIMARY,
    children: 'Text',
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
    theme: EAppLinkTheme.PRIMARY,
    children: 'Text',
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Secondary = Template.bind({})
Secondary.args = {
    theme: EAppLinkTheme.SECONDARY,
    children: 'Text',
}

export const SecondaryDark = Template.bind({})
SecondaryDark.args = {
    theme: EAppLinkTheme.SECONDARY,
    children: 'Text',
}
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
    theme: EAppLinkTheme.RED,
    children: 'Text',
}

export const RedDark = Template.bind({})
RedDark.args = {
    theme: EAppLinkTheme.RED,
    children: 'Text',
}
Red.decorators = [ThemeDecorator(Theme.DARK)]
