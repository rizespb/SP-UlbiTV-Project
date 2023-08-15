import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ArticleDetailsComment } from './ArticleDetailsComment'

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsComment',
    component: ArticleDetailsComment,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsComment>

const Template: ComponentStory<typeof ArticleDetailsComment> = (args) => <ArticleDetailsComment {...args} />

export const Normal = Template.bind({})
Normal.args = {
    id: '1',
}
Normal.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        articleDetails: {},
    }),
]
