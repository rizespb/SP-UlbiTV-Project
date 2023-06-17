import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Input } from './Input'

export default {
    title: 'shared/Input',
    component: Input,
} as ComponentMeta<typeof Input>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
    placeholder: 'Type text',
    value: '1234567',
}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
