import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { CurrencySelect } from './CurrencySelect'

export default {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof CurrencySelect>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]
