import { ComponentStory, ComponentMeta } from '@storybook/react'

import { IArticle } from '@/entities/Article'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
    <ArticleRecommendationsList {...args} />
)

const article: IArticle = {
    id: '1',
    img: '',
    createdAt: '',
    views: 123,
    user: { id: '1', username: '123' },
    blocks: [],
    type: [],
    title: '123',
    subtitle: 'asfsa',
}

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]

Normal.parameters = {
    // Моки запросов api
    mockData: [
        {
            url: `${__API__}/articles?_limit=3&_expand=user`,
            method: 'GET',
            status: 200,
            response: [
                { ...article, id: '1' },
                { ...article, id: '2' },
                { ...article, id: '3' },
            ],
        },
    ],
}
