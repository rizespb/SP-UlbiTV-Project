import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { AtricleImageBlockComponent } from './AtricleImageBlockComponent'

export default {
    title: 'shared/AtricleImageBlockComponent',
    component: AtricleImageBlockComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AtricleImageBlockComponent>

const Template: ComponentStory<typeof AtricleImageBlockComponent> = (args) => <AtricleImageBlockComponent {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]
