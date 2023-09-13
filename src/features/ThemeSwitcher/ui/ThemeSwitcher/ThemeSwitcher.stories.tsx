import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { ThemeSwitcher } from './ThemeSwitcher'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
    title: 'widgets/ThemeSwitcher',
    component: ThemeSwitcher,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ThemeSwitcher>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ThemeSwitcher> = (args) => (
    <ThemeSwitcher {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
// StoreDecorator нужен, потому что в самом коммпоненте используется dispatch
Normal.decorators = [StoreDecorator({})]

export const Dark = Template.bind({})
Dark.args = {}
// StoreDecorator нужен, потому что в самом коммпоненте используется dispatch
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)]
