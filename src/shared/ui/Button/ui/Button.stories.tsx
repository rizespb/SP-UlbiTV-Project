import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Button, ThemeButton } from './Button'

export default {
    title: 'shared/Button',
    component: Button,
} as ComponentMeta<typeof Button>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

// Светлую тему подключили глобально в config\storybook\preview.ts
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
export const Primary = Template.bind({})
Primary.args = {
    children: 'Text',
}

export const Clear = Template.bind({})
Clear.args = {
    children: 'Text',
    theme: ThemeButton.CLEAR,
}

export const Outline = Template.bind({})
Outline.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
}

// А вот темную тему указываем индивидуально
export const OutlineDark = Template.bind({})
OutlineDark.args = {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]
