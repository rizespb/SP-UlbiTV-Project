import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Text, ETextSize, ETextTheme } from './Text'

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Error = Template.bind({})
Error.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    theme: ETextTheme.ERROR,
}
Error.decorators = [ThemeDecorator(Theme.LIGHT)]

export const onlyTitle = Template.bind({})
onlyTitle.args = {
    title: 'Title lorem ipsun',
}
onlyTitle.decorators = [ThemeDecorator(Theme.LIGHT)]

export const onlyText = Template.bind({})
onlyText.args = {
    text: 'Description Description Description Description',
}
onlyText.decorators = [ThemeDecorator(Theme.LIGHT)]

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTitleDark = Template.bind({})
onlyTitleDark.args = {
    title: 'Title lorem ipsun',
}
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTextDark = Template.bind({})
onlyTextDark.args = {
    text: 'Description Description Description Description',
}
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeL = Template.bind({})
SizeL.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: ETextSize.L,
}
SizeL.decorators = [ThemeDecorator(Theme.LIGHT)]

export const SizeM = Template.bind({})
SizeM.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: ETextSize.M,
}
SizeM.decorators = [ThemeDecorator(Theme.LIGHT)]

export const SizeS = Template.bind({})
SizeS.args = {
    title: 'Title lorem ipsun',
    text: 'Description Description Description Description',
    size: ETextSize.S,
}
SizeS.decorators = [ThemeDecorator(Theme.LIGHT)]
