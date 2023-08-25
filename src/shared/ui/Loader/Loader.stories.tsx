import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Loader } from './Loader'

export default {
    title: 'shared/Loader',
    component: Loader,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Loader>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />

export const Ring = Template.bind({})
Ring.args = {
    type: 'ring',
}
Ring.decorators = [ThemeDecorator(Theme.LIGHT)]

export const RingDark = Template.bind({})
RingDark.args = {
    type: 'ring',
}
RingDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Ellipsis = Template.bind({})
Ellipsis.args = {
    type: 'ellipsis',
}
Ellipsis.decorators = [ThemeDecorator(Theme.LIGHT)]

export const EllipsisDark = Template.bind({})
EllipsisDark.args = {
    type: 'ellipsis',
}
EllipsisDark.decorators = [ThemeDecorator(Theme.DARK)]
