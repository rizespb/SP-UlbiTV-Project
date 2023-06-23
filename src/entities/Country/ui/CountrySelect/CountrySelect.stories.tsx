import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { CountrySelect } from './CountrySelect'

export default {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof CountrySelect>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
