import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { ThemeSwitcher } from './ThemeSwitcher'

export default {
    title: 'shared/ThemeSwitcher',
    component: ThemeSwitcher,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ThemeSwitcher>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ThemeSwitcher> = (args) => <ThemeSwitcher {...args} />

// Светлую тему подключили глобально в config\storybook\preview.ts
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
export const Normal = Template.bind({})
Normal.args = {
    type: 'ring',
}

// А вот темную тему указываем индивидуально
export const Dark = Template.bind({})
Dark.args = {
    type: 'ring',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
