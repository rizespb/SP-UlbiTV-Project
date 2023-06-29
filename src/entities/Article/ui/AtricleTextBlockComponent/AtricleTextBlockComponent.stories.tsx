import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { AtricleTextBlockComponent } from './AtricleTextBlockComponent'

export default {
    title: 'shared/AtricleTextBlockComponent',
    component: AtricleTextBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AtricleTextBlockComponent>

const Template: ComponentStory<typeof AtricleTextBlockComponent> = (args) => <AtricleTextBlockComponent {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]
