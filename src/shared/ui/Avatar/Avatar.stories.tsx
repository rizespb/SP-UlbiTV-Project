import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { Avatar } from './Avatar'
import AvatarImg from '../../assets/test/storybook.png'

export default {
    title: 'shared/Avatar',
    component: Avatar,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Avatar>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const Primary = Template.bind({})
Primary.args = {
    size: 150,
    src: AvatarImg,
}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Small = Template.bind({})
Small.args = {
    size: 50,
    src: AvatarImg,
}
Small.decorators = [ThemeDecorator(Theme.LIGHT)]
