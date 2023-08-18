import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Flex } from './Flex'

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />

export const Row = Template.bind({})
Row.args = {
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
}
Row.decorators = [ThemeDecorator(Theme.LIGHT)]

export const RowGap4 = Template.bind({})
RowGap4.args = {
    gap: '4',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
}
RowGap4.decorators = [ThemeDecorator(Theme.LIGHT)]

export const RowGap8 = Template.bind({})
RowGap8.args = {
    gap: '8',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
}
RowGap8.decorators = [ThemeDecorator(Theme.LIGHT)]

export const RowGap16 = Template.bind({})
RowGap16.args = {
    gap: '16',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
}
RowGap16.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Column = Template.bind({})
Column.args = {
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
}
Column.decorators = [ThemeDecorator(Theme.LIGHT)]

export const ColumnGap16 = Template.bind({})
ColumnGap16.args = {
    gap: '16',
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
}
ColumnGap16.decorators = [ThemeDecorator(Theme.LIGHT)]

export const ColumnAlignEnd = Template.bind({})
ColumnAlignEnd.args = {
    direction: 'column',
    align: 'end',
    children: (
        <>
            <div>first</div>
            <div>first</div>
            <div>first</div>
            <div>first</div>
        </>
    ),
}
ColumnAlignEnd.decorators = [ThemeDecorator(Theme.LIGHT)]
