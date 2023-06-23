import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Select } from './Select'

export default {
    title: 'shared/Select',
    component: Select,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Select>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
    label: 'Укажите значение',
    options: [
        {
            value: '123',
            content: 'Первый пункт',
        },
        {
            value: '12345',
            content: 'Второй пункт',
        },
    ],
}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
