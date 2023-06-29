import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { AtricleCodeBlockComponent } from './AtricleCodeBlockComponent'

export default {
    title: 'shared/AtricleCodeBlockComponent',
    component: AtricleCodeBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AtricleCodeBlockComponent>

const Template: ComponentStory<typeof AtricleCodeBlockComponent> = (args) => <AtricleCodeBlockComponent {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]
