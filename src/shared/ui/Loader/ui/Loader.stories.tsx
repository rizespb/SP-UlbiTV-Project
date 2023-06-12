import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

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

// Светлую тему подключили глобально в config\storybook\preview.ts
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
export const Ring = Template.bind({})
Ring.args = {
    type: 'ring',
}
// А вот темную тему указываем индивидуально
export const RingDark = Template.bind({})
RingDark.args = {
    type: 'ring',
}
RingDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Ellipsis = Template.bind({})
Ellipsis.args = {
    type: 'ellipsis',
}
// А вот темную тему указываем индивидуально
export const EllipsisDark = Template.bind({})
EllipsisDark.args = {
    type: 'ellipsis',
}
EllipsisDark.decorators = [ThemeDecorator(Theme.DARK)]
