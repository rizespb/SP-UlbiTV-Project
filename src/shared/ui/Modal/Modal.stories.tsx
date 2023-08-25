import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Modal } from './Modal'

export default {
    title: 'shared/Modal',
    component: Modal,
} as ComponentMeta<typeof Modal>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Primary = Template.bind({})
Primary.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis cum totam modi dolor, tempore quam officiis expedita libero ipsam fuga repellendus odio enim nostrum asperiores odit adipisci suscipit eum? Molestias?',
}
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]

export const Dark = Template.bind({})
Dark.args = {
    isOpen: true,
    children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis cum totam modi dolor, tempore quam officiis expedita libero ipsam fuga repellendus odio enim nostrum asperiores odit adipisci suscipit eum? Molestias?',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
