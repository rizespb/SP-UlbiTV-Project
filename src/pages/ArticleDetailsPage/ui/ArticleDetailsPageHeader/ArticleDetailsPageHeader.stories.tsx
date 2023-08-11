import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { EArticleType, IArticle } from 'entities/Article'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader'

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPageHeader>

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />

const article: IArticle = {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    user: {
        id: '1',
        username: 'Ivan',
    },
    type: [EArticleType.IT],
    blocks: [],
}

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        articleDetails: {
            data: article,
        },
        user: {
            authData: {
                id: article.user.id,
            },
        },
    }),
]
