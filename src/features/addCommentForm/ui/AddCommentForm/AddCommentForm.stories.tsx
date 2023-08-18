import { ComponentStory, ComponentMeta } from '@storybook/react'

import { action } from '@storybook/addon-actions'
import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import AddCommentForm from './AddCommentForm'

export default {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />

export const Normal = Template.bind({})
Normal.args = {
    onSendComment: action('onSendComment'),
}
Normal.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({})]
