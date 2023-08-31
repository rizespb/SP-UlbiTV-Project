import { ComponentStory, ComponentMeta } from '@storybook/react'
import ArticleRating from './ArticleRating'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRating>

const Template: ComponentStory<typeof ArticleRating> = (args) => (
    <ArticleRating {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    articleId: '1',
}
Normal.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        user: {
            authData: { id: '1' },
        },
    }),
]
Normal.parameters = {
    // Моки запросов api
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
}

export const WithoutRate = Template.bind({})
WithoutRate.args = {
    articleId: '1',
}
WithoutRate.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        user: {
            authData: { id: '1' },
        },
    }),
]

WithoutRate.parameters = {
    // Моки запросов api
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
}
