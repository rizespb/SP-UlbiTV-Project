import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator'

import { CommentCard } from './CommentCard'

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
)

const normalArgs = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' },
    },
}

export const Normal = Template.bind({})
Normal.args = normalArgs

// Story-кейс для компонента redesigned
export const NormalRedesigned = Template.bind({})
NormalRedesigned.args = normalArgs
// NormalRedesigned.decorators = [
//     FeaturesFlagsDecorator({ isAppRedesigned: true }),
// ]
NormalRedesigned.decorators = [NewDesignDecorator]

export const Loading = Template.bind({})
Loading.args = {
    ...normalArgs,
    isLoading: true,
}
