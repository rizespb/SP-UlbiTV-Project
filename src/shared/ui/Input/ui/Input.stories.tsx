import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Input } from './Input'

export default {
    title: 'shared/Input',
    component: Input,
} as ComponentMeta<typeof Input>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

// Светлую тему подключили глобально в config\storybook\preview.ts
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
export const Primary = Template.bind({})
Primary.args = {
    placeholder: 'Type text',
    value: '1234567',
}
