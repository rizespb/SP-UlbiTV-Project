import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Button, EButtonSize, EButtonTheme } from './Button'

export default {
    title: 'shared/Button',
    component: Button,
} as ComponentMeta<typeof Button>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: 'Text',
}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Clear = Template.bind({})
Clear.args = {
    children: 'Text',
    theme: EButtonTheme.CLEAR,
}
Clear.decorators = [ThemeDecorator(Theme.LIGHT)]

export const ClearInverted = Template.bind({})
ClearInverted.args = {
    children: 'Text',
    theme: EButtonTheme.CLEAR_INVERTED,
}
ClearInverted.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Outline = Template.bind({})
Outline.args = {
    children: 'Text',
    theme: EButtonTheme.OUTLINE,
}
Outline.decorators = [ThemeDecorator(Theme.LIGHT)]

export const OutlineDark = Template.bind({})
OutlineDark.args = {
    children: 'Text',
    theme: EButtonTheme.OUTLINE,
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const BackgroundTheme = Template.bind({})
BackgroundTheme.args = {
    children: 'Text',
    theme: EButtonTheme.BACKGROUND,
}
BackgroundTheme.decorators = [ThemeDecorator(Theme.LIGHT)]

export const BackgroundInvertedTheme = Template.bind({})
BackgroundInvertedTheme.args = {
    children: 'Text',
    theme: EButtonTheme.BACKGROUND_INVERTED,
}
BackgroundInvertedTheme.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Square = Template.bind({})
Square.args = {
    children: '>',
    theme: EButtonTheme.BACKGROUND_INVERTED,
    square: true,
}
Square.decorators = [ThemeDecorator(Theme.LIGHT)]

export const SquareSizeL = Template.bind({})
SquareSizeL.args = {
    children: '>',
    theme: EButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: EButtonSize.L,
}
SquareSizeL.decorators = [ThemeDecorator(Theme.LIGHT)]

export const SquareSizeXL = Template.bind({})
SquareSizeXL.args = {
    children: '>',
    theme: EButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: EButtonSize.XL,
}
SquareSizeXL.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Disabled = Template.bind({})
Disabled.args = {
    children: '>',
    theme: EButtonTheme.OUTLINE,
    disabled: true,
}
Disabled.decorators = [ThemeDecorator(Theme.LIGHT)]
