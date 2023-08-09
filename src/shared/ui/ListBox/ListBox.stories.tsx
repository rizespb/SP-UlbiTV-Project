import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ListBox } from './ListBox'

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />

export const Normal = Template.bind({})
Normal.args = {
    items: [
        { value: '1', content: 'Item 1' },
        { value: '2', content: 'Item 2' },
        { value: '3', content: 'Item 3' },
        { value: '4', content: 'Item 4', disabled: true },
        { value: '5', content: 'Item 5' },
        { value: '6', content: 'Item 6' },
        { value: '7', content: 'Item 7' },
    ],
    // Какое значение выбирать, если пока ничего не выбрано
    defaultValue: 'Выберите значение',
    onChange: (value: string) => {
        // eslint-disable-next-line no-console
        console.log(value)
    },
    direction: 'bottom',
    label: 'Это label',
}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]
