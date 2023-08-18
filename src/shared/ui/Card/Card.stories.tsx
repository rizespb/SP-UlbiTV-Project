import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Text } from '../Text/Text'
import { Card } from './Card'

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Normal = Template.bind({})
Normal.args = {
    children: <Text title="Test" text="text text" />,
}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]
