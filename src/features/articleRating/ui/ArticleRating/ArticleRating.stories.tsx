import { ComponentStory, ComponentMeta } from '@storybook/react'
// import withMock from 'storybook-addon-mock'
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
    // @TODO-Storybook Не получилось настроить моки запросов с помощью storybook-addon-mock
    // попробовать после обновления storybook до актуальной версии
    // Декоратор, которые мокает запросы api (storybook-addon-mock)
    // Ниже надо указать mockData в parameters
    // decorators: [
    //     withMock,
    // ],
} as ComponentMeta<typeof ArticleRating>

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />

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

// Моки запросов api
// @TODO-Storybook Не получилось настроить моки запросов с помощью попробовать после обновления storybook до актуальной версии
// Normal.parameters = {
//     mockData: [
//         {
//             url: `${__API__}/article-ratings?userId=1&articleId=1`,
//             method: 'GET',
//             status: 200,
//             response: [
//                 {
//                     rate: 4,
//                 },
//             ],
//         },
//     ],
// }

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
// Моки запросов api
// @TODO-Storybook Не получилось настроить моки запросов с помощью попробовать после обновления storybook до актуальной версии
// WithoutRate.parameters = {
//     mockData: [
//         {
//             url: `${__API__}/article-ratings?userId=1&articleId=1`,
//             method: 'GET',
//             status: 200,
//             response: [],
//         },
//     ],
// }
