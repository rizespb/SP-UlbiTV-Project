import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
// import { IArticle } from 'entities/Article'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
// import withMock from 'storybook-addon-mock'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
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
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />

// const article: IArticle = {
//     id: '1',
//     img: '',
//     createdAt: '',
//     views: 123,
//     user: { id: '1', username: '123' },
//     blocks: [],
//     type: [],
//     title: '123',
//     subtitle: 'asfsa',
// }

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({})]
// Моки запросов api
Normal.parameters = {
    // @TODO-Storybook Не получилось настроить моки запросов с помощью попробовать после обновления storybook до актуальной версии
    // mockData: [
    //     {
    //         url: `${__API__}/articles?_limit=3`,
    //         method: 'GET',
    //         status: 200,
    //         response: [
    //             { ...article, id: '1' },
    //             { ...article, id: '2' },
    //             { ...article, id: '3' },
    //         ],
    //     },
    // ],
}
